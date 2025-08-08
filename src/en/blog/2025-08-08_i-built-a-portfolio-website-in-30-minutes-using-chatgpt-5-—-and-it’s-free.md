---
title: I Built a Portfolio Website in 30 Minutes Using ChatGPT-5 — and It’s FREE!
author: Deak David
description: Step-by-step guide to building a beautiful portfolio with ChatGPT-5
  and deploying it to Netlify using GitHub — fast, free, and beginner-friendly.
image: /assets/uploads/chatgpt-5.jpg
tags:
  - post
date: 2025-08-08T14:13:00.000+03:00
layout: indiblog.njk
---
# 1. Introduction — From Idea to Live Site in Minutes
   Hook readers with how ridiculously easy it is now with ChatGPT-5.

Mention the only tools needed: ChatGPT-5, GitHub, Netlify — all free.

State that you’ll skip the deep 11ty setup (link to official docs).

Tease that you’ll show the one small tweak to make deployment work instantly.  
# 2. What You’ll Need Before Starting
A GitHub account

A Netlify account

ChatGPT-5 access

Basic knowledge of creating folders and files

Link to official 11ty quick start for those starting from scratch

# 3. Ask ChatGPT-5 to Build the Portfolio
3.1. Your First Prompt to ChatGPT-5
Show example prompt:
“Make me a responsive 11ty portfolio with a homepage, about page, and projects section.”

Screenshot of ChatGPT-5 generating code.

3.2. Copy the Files into Your Project
Create project folder → paste generated files.

Screenshot of folder structure.

# 4. The One Change in package.json
4.1. Why Update the Build Script?
Explain Netlify needs a build script to know how to compile your site.
4.2. How to Change It.  
```
"scripts": {
  "start": "eleventy --serve",
  "build": "eleventy"
}
```  
Note: start is for local development, build is for Netlify deployment.
# 5. Upload to GitHub in Minutes
5.1. Create a New Repository
Screenshot: “New Repository” page.

5.2. Push Your Files
Either drag & drop in GitHub or push via Git.

Screenshot: files live on GitHub.
# 6. Deploy to Netlify
6.1. Import from GitHub
Screenshot: Netlify “New Site from Git” button.

6.2. Confirm Build Command & Publish Directory
Build command: npm run build

Publish directory: _site (default for 11ty)

Screenshot: settings screen filled out.

6.3. Click Deploy and Wait a Few Seconds
Screenshot: “Your site is live!”
# 7. Check Out Your New Portfolio
Show desktop + mobile screenshots.

Mention you can now share the link with anyone.
# 8. Conclusion — That’s All It Took
Recap: You didn’t write code from scratch, didn’t pay anything, and got a live site in under an hour.

Tease Part 2: Connecting Decap CMS for easy content updates.

Invite readers to share their finished portfolios.


