# PromptVault — Project Architecture

## Overview
PromptVault is a full-stack web application built with Next.js and TypeScript. It uses Supabase for authentication and database storage, GitHub for source code management, and Vercel for deployment.

## How the Application Works
1. A user visits the PromptVault website hosted on Vercel.
2. Next.js displays the application interface.
3. Supabase Authentication handles account registration, login, logout, and password recovery.
4. Authenticated users can access the dashboard to manage prompts and AI personas.
5. The application communicates with Supabase to save and retrieve user data.

## Technology Responsibilities
- **Next.js:** Application framework, pages, and routing.
- **TypeScript:** Programming language.
- **Supabase Auth:** User authentication and account management.
- **Supabase PostgreSQL:** Database storage.
- **GitHub:** Version control and source code repository.
- **Vercel:** Hosting and production deployment.

## Development and Deployment Flow
1. Develop and update the application in Visual Studio Code with Claude Code assistance.
2. Test changes during development.
3. Commit and push changes to GitHub.
4. Vercel deploys the updated application from the connected GitHub repository.
5. Verify that the production deployment works correctly.

## Related Notes

- [[00 - Project Home]]
- [[01 - Project Overview]]
- [[03 - Supabase Database]]
- [[04 - Authentication]]
- [[05 - GitHub and Vercel Deployment]]