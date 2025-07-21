const { Octokit } = require("@octokit/rest");
const axios = require("axios");

const token = process.env.GITHUB_TOKEN;
const geminiKey = process.env.GEMINI_API_KEY;

const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");
const prNumber = process.env.GITHUB_REF?.split("/").pop();
const octokit = new Octokit({ auth: token });

async function getPR() {
  const { data } = await octokit.pulls.get({ owner, repo, pull_number: prNumber });
  return data;
}

async function getDiff(pr) {
  const { data } = await octokit.pulls.get({
    owner,
    repo,
    pull_number: pr.number,
    mediaType: { format: "diff" },
  });
  return data;
}

async function generateReview(diff) {
  const prompt = `
You are an AI reviewer. Analyze this diff and provide:
1. Change Overview
2. Blockers & Suggestions
3. Merge Status

Diff:
${diff}`;

  const res = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiKey}`,
    { contents: [{ parts: [{ text: prompt }] }] },
    { headers: { "Content-Type": "application/json" } }
  );
  return res.data.candidates?.[0]?.content?.parts?.[0]?.text || "❌ No response.";
}

async function postComment(pr, content) {
  await octokit.issues.createComment({
    owner,
    repo,
    issue_number: pr.number,
    body: `🤖 **AI PR Review**\n\n${content}`,
  });
}

(async () => {
  const pr = await getPR();
  const diff = await getDiff(pr);
  const summary = await generateReview(diff);
  await postComment(pr, summary);
})();
