# 🤖 AI PR Review Bot

Automatically review GitHub pull requests using AI (Gemini or OpenAI).  
This GitHub Action will comment on PRs with:
- ✅ Change Overview
- 🚧 Blockers & Suggestions
- 🔀 Merge Status
- 📩 Optional email to PR author

## 🔧 Features

- GitHub Action trigger on PR opened/edited
- Uses Gemini (Google AI Studio) or GPT
- Comments AI-generated review
- Sends email via SendGrid (optional)

## 🛠️ Setup

### 1. Clone or Fork

```bash
git clone https://github.com/jpeseWang/ai-pr-review-bot.git
cd ai-pr-review-bot
```



# 📘 User Guide – AI PR Review Bot

**AI PR Review Bot** is a GitHub Action that automatically comments on every pull request using AI-generated insights. It reviews code diffs using **Gemini (Google AI Studio)** or **OpenAI**, and optionally sends email notifications to the PR author.

---

## 🚀 What It Does

Once installed, this bot will automatically:
- 🔍 Analyze pull request code changes
- 🧠 Generate AI-based insights:
  - Change Overview
  - Blockers & Suggestions
  - Merge Status
- 💬 Post a comment on the PR with the results
- 📩 Optionally email the PR author

---

## 🛠️ Setup Guide

### 🔧 Step 1: Add Workflow & Script to Your Repo

1. Create these folders and files in your repo:
```yaml
.github/
├── workflows/
│ └── pr-review.yml # GitHub Actions workflow
└── bots/
└── pr-review.js # Review bot script
```

2. Copy the code for each file from the repository’s `/workflows` and `/bots` folders.

---

### 🔐 Step 2: Add Required Secrets

Go to your repository → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**, then add:

| Secret Name         | Description                                | Required |
|---------------------|--------------------------------------------|----------|
| `GEMINI_API_KEY`    | Your Google AI Studio API key              | ✅ Yes   |
| `SENDGRID_API_KEY`  | API key for SendGrid to send emails        | ❌ Optional |

**Note**: If you're using OpenAI instead of Gemini, replace `GEMINI_API_KEY` with `OPENAI_API_KEY`.

---

### ⚙️ Step 3: Configure Your Workflow File

Open `.github/workflows/pr-review.yml` and verify:

- Trigger types (e.g. `pull_request`)
- Node.js version (e.g. `18`)
- Environment variables match the secrets you created

Example trigger:
```yaml
on:
pull_request:
 types: [opened, edited, reopened]
 ```
Customize as needed (e.g. only run on specific branches).


🧪 Step 4: Test the Bot
Create a new branch and make a code change.

Push the branch and open a Pull Request.

Watch the Actions tab for the job run.

View the PR → the bot should comment within a few seconds.

💬 Example Output
```yaml
🤖 **AI PR Review Bot**

### 1. Change Overview
- Refactored the user authentication module.
- Removed redundant validation logic.

### 2. Blockers & Suggestions
- Missing error handling for `null` inputs.
- Suggest writing unit tests for `login.js`.

### 3. Merge Status
🟡 Needs changes before merging.
```
🧩 Customization
💡 Change AI model: Use Gemini, GPT-4, or Claude by editing pr-review.js

✉️ Enable email notifications: Use SendGrid or other mail providers in pr-review.js

🏷️ Add labels: Integrate with GitHub API to auto-label PRs

✅ Auto-approve or merge: Extend the logic based on confidence level

📄 Related Files
Path	Purpose
.github/workflows/pr-review.yml	Defines when and how the bot runs
.github/bots/pr-review.js	Main script to handle AI review
docs/user-guide.md	This user guide
README.md	Overview and setup instructions

❓ FAQ
Q: Does this support both public and private repos?
Yes, as long as GitHub Actions and the API keys are configured.

Q: Can I use OpenAI instead of Gemini?
Yes! Simply replace the Gemini request in pr-review.js with OpenAI’s chat/completions endpoint.

Q: Can I make it post only once per PR?
Yes, you can store the comment ID and update instead of re-posting, or check if a previous bot comment exists before posting.

📬 Support
For issues or feature requests, please open a GitHub Issue or Discussion in this repo.

Happy reviewing! 🎉
