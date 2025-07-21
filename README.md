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
git clone https://github.com/YOUR_USERNAME/ai-pr-review-bot.git
cd ai-pr-review-bot
