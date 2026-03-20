# Scam Detector

AI-powered scam message detector built with Next.js + Claude AI.

## Run locally

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env.local` file in the root:
   ```
   ANTHROPIC_API_KEY=sk-ant-your-key-here
   ```
   Get your key at https://console.anthropic.com

3. Start the dev server:
   ```
   npm run dev
   ```

4. Open http://localhost:3000

## Deploy free on Vercel

1. Push this project to GitHub
2. Go to https://vercel.com and sign in with GitHub
3. Click "Add New Project" → select your repo → click Deploy
4. Go to Project Settings → Environment Variables
5. Add: `ANTHROPIC_API_KEY` = your key from console.anthropic.com
6. Redeploy — done!
