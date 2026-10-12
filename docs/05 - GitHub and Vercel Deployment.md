# PromptVault — GitHub and Vercel Deployment

## 1. Overview

PromptVault was developed locally using Visual Studio Code and Claude Code, with GitHub used for version control and Vercel used for hosting.

The application uses Supabase as its backend for authentication and database storage.

The goal was to make PromptVault accessible through a public website while keeping user data and authentication managed through Supabase.

## 2. Project Links

**Live Website:** [https://prompt-vault-eosin.vercel.app](https://prompt-vault-eosin.vercel.app/)

**GitHub Repository:** [https://github.com/nikosL108/prompt-vault](https://github.com/nikosL108/prompt-vault)

**GitHub Branch:** `main`

**Hosting Platform:** Vercel

**Backend:** Supabase

## 3. GitHub — Version Control

GitHub was used to store and manage the project's source code.

Git is a version control system that tracks changes to files, while GitHub provides online hosting for Git repositories.

### Why GitHub Was Used

- Store the project's source code.
    
- Track changes throughout development.
    
- Maintain a history of code updates.
    
- Connect the project to Vercel.
    
- Allow changes to be deployed from the main branch.
    

### Basic Git Workflow

The project followed this general process:

1. Make changes to the application in Visual Studio Code.
    
2. Test the changes locally.
    
3. Stage the updated files.
    
4. Commit the changes with a descriptive message.
    
5. Push the commits to GitHub.
    
6. Allow Vercel to build and deploy the updated application.
    

Common Git commands:

```
git status
git add .
git commit -m "Describe the changes"
git push origin main
```

These commands check the repository status, stage changes, create a commit, and push the changes to GitHub.

## 4. Vercel — Application Hosting

Vercel is the hosting platform used to deploy PromptVault.

Vercel connects to the project's GitHub repository and builds the Next.js application.

### Deployment Process

1. The PromptVault source code is stored in GitHub.
    
2. Vercel is connected to the GitHub repository.
    
3. New changes are pushed to the `main` branch.
    
4. Vercel detects the changes and starts a deployment.
    
5. Vercel builds the Next.js application.
    
6. If the deployment succeeds, the updated version becomes available online.
    

### Deployment Status

During final testing, Vercel showed the production deployment status as:

**Ready**

This indicated that the deployment had completed successfully.

However, a successful deployment does not automatically guarantee that every application feature works correctly. Manual testing was still necessary.

## 5. Example — Deploying the Logout Fix

One of the problems encountered during development involved the Sign Out button.

The dashboard linked to a route that did not exist:

`/auth/logout`

This caused a 404 error when users attempted to sign out.

### Fix

Claude Code helped replace the broken navigation link with the application's existing `LogoutButton` component.

The updated code was committed and pushed to GitHub.

**Commit:** `9a6cd8a`

**Commit Description:** Fix logout button by replacing the nonexistent logout route with a working component.

### Deployment Verification

We opened the Vercel dashboard and checked the production deployment.

The deployment showed:

- **Branch:** `main`
    
- **Commit:** `9a6cd8a`
    
- **Status:** Ready
    

We then tested the Sign Out button on the deployed website and confirmed that the issue was resolved.

This demonstrated the complete development cycle:

Identify Bug → Fix Code → Commit → Push → Deploy → Test

## 6. Supabase Integration

Although Vercel hosts the application, Supabase handles the backend services.

**Vercel is responsible for:**

- Hosting the Next.js application.
    
- Running the application's deployed server-side functionality.
    
- Building new versions when code changes are pushed.
    

**Supabase is responsible for:**

- Managing user authentication.
    
- Storing saved prompts and personas.
    
- Enforcing database access policies.
    
- Handling authentication-related email requests.
    

The application connects to Supabase using project configuration and environment variables.

Sensitive credentials should not be committed to a public GitHub repository.

## 7. Environment Variables

Environment variables allow the application to access configuration values without hardcoding them throughout the source code.

During local development, the project included a `.env.local` file.

The project also included an `.env.example` file to show the expected configuration structure.

The deployed application requires the appropriate Supabase configuration in its hosting environment.

Important security considerations:

- Never publish Supabase service-role or secret keys.
    
- Never commit `.env.local` to GitHub.
    
- Use only the appropriate public or publishable Supabase key in browser-side code.
    
- Keep sensitive credentials in secure environment settings.
    
- Do not paste private credentials into documentation.
    

## 8. Deployment Troubleshooting

### Problem: Vercel Deployment Not Found

During password recovery testing, a reset link opened a Vercel page displaying:

`404 DEPLOYMENT_NOT_FOUND`

This indicated that the requested deployment URL was not available.

We investigated the application's authentication redirects and deployment URLs.

**Lesson:** Authentication links must use valid URLs that point to an available deployment.

### Problem: Application Returns a 404

During logout testing, the application displayed:

`404 — This page could not be found`

The problem was caused by a link to a nonexistent application route.

**Lesson:** A successful deployment does not guarantee that every route exists or works.

### Problem: Confirming Whether a Fix Was Deployed

After fixing the logout issue, we needed to confirm that Vercel had deployed the latest GitHub commit.

We compared the commit displayed in Vercel with the commit pushed to GitHub.

**Lesson:** Always verify that the production deployment contains the latest code before testing a fix.

## 9. Final Deployment Testing

The application was tested for:

- Website accessibility.
    
- User registration and login.
    
- Password recovery.
    
- Successful logout.
    
- Protected dashboard access.
    
- Creating, editing, and deleting prompts.
    
- Managing AI personas.
    
- Searching and copying saved prompts.
    

These tests helped confirm that the application was usable after deployment.

## 10. What I Learned

Through deploying PromptVault, I learned:

1. The difference between local development and production deployment.
    
2. How Git tracks changes to a software project.
    
3. How GitHub stores source code and commit history.
    
4. How Vercel builds and deploys a Next.js application.
    
5. How environment variables help manage application configuration.
    
6. Why production deployments must be tested after code changes.
    
7. How to troubleshoot broken routes and deployment URLs.
    
8. How to verify that a particular Git commit is running in production.
    

## Related Notes

- [[00 - Project Home]]
- [[02 - Project Architecture]]
- [[04 - Authentication]]
- [[06 - Development and Troubleshooting]]
- [[07 - Testing and Verification]]