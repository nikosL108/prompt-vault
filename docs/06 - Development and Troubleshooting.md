# PromptVault — Development and Troubleshooting

## 1. Development Overview

PromptVault is a full-stack web application I developed to organize, store, and reuse AI prompts and personas.

I used Visual Studio Code as my development environment, with Claude Code assisting in writing, debugging, and modifying the application.

The project uses Next.js, TypeScript, Supabase, GitHub, and Vercel.

The development process involved building the application, configuring backend services, testing functionality, troubleshooting errors, and deploying the finished project.

## 2. Development Tools

|Tool|Purpose|
|---|---|
|Visual Studio Code|Editing and managing project files|
|Claude Code|AI-assisted programming and debugging|
|Next.js|Building the web application|
|TypeScript|Application programming language|
|Supabase|Database and authentication|
|Git|Tracking code changes|
|GitHub|Storing the source code|
|Vercel|Hosting and deployment|
|Obsidian|Project documentation|

## 3. Development Process

### Phase 1 — Project Setup

I started by setting up the development environment and working with a Next.js and Supabase starter project.

The project included a Next.js application structure, TypeScript files, Supabase integration, and authentication-related components.

I used Visual Studio Code to inspect the files and Claude Code to assist with development.

### Phase 2 — Building the Application

The next step was developing the PromptVault application.

The main functionality included:

- Creating and saving AI prompts.
    
- Editing and deleting saved prompts.
    
- Creating and managing AI personas.
    
- Searching and filtering saved prompts.
    
- Copying prompts for reuse.
    
- Managing user accounts through Supabase Authentication.
    

The application also included a dashboard where authenticated users could manage their saved information.

### Phase 3 — Configuring Supabase

Supabase was used to provide the backend.

This involved working with:

- User authentication.
    
- Database storage.
    
- Database access permissions.
    
- Authentication email settings.
    
- Authentication rate limits.
    

Row Level Security policies were reviewed to help ensure users could access only their authorized records.

### Phase 4 — GitHub and Vercel Deployment

After developing the application, I used GitHub to store the source code.

Vercel was connected to the GitHub repository so that code pushed to the main branch could be deployed online.

I used the Vercel dashboard to verify deployment status and confirm which Git commit was running in production.

### Phase 5 — Testing and Debugging

After deployment, I tested the application to check whether its features worked correctly.

Testing revealed several problems involving authentication, redirects, email delivery, and logout.

I used screenshots, Supabase dashboard settings, Vercel deployment information, and Claude Code to investigate and resolve these issues.

## 4. Problems Encountered and Solutions

### Issue 1 — Signup Confirmation Email Not Arriving

**Problem:**

After creating an account, the website displayed a message instructing the user to confirm their email address.

However, the expected email did not arrive during testing.

**Investigation:**

I opened the Supabase dashboard and inspected:

- Authentication → Emails.
    
- Authentication → Users.
    
- User confirmation information.
    

I checked whether Supabase had created the user account and whether the account was confirmed.

**What I Learned:**

Creating an account and delivering a confirmation email are separate operations.

A successful signup screen does not necessarily prove that the confirmation email was delivered.

### Issue 2 — Password Reset Link Returned a Deployment Error

**Problem:**

I requested a password reset and received an email, but the link opened a Vercel error page.

**Error:**

`404 DEPLOYMENT_NOT_FOUND`

**Investigation:**

I examined the password recovery process and the relationship between Supabase redirect URLs and Vercel deployment URLs.

**Resolution:**

The password recovery flow was corrected during troubleshooting, allowing me to continue resetting the password.

**What I Learned:**

Authentication links depend on correct URL configuration.

A broken or outdated deployment URL can prevent an otherwise valid authentication request from completing.

### Issue 3 — Password Reset Redirected to a Starter Page

**Problem:**

After resetting my password, I was redirected to a default Next.js/Supabase starter page rather than the PromptVault dashboard.

**Investigation:**

This indicated that some starter-template behavior was still present in the application.

**Resolution:**

The navigation behavior was corrected during development.

**What I Learned:**

An application can successfully authenticate a user while still directing them to the wrong page.

Both authentication and navigation need to be tested.

### Issue 4 — Logout Returned a 404 Error

**Problem:**

The Sign Out button redirected to a page that did not exist.

**Error:**

`404 — This page could not be found`

**Root Cause:**

The dashboard contained a hardcoded link to:

`/auth/logout`

However, this route was not implemented.

**Solution:**

Claude Code inspected the dashboard and identified the incorrect link in:

`app/dashboard/page.tsx`

The broken link was replaced with the existing `LogoutButton` component.

The component was also updated to support a `className` property for styling.

**Git Commit:** `9a6cd8a`

**Verification:**

1. The fix was committed.
    
2. The updated code was pushed to GitHub.
    
3. Vercel deployed the new commit.
    
4. I confirmed that the deployment status was Ready.
    
5. I tested logout again and verified that it worked.
    

**What I Learned:**

A link to a logout URL does not necessarily end an authenticated session.

The application must execute the correct logout functionality and redirect users to a valid page.

### Issue 5 — Supabase Email Rate Limit

**Problem:**

Repeated password recovery testing produced the following error:

`email rate limit exceeded`

**Investigation:**

I opened:

Supabase → Authentication → Rate Limits

The email sending limit was set to two emails per hour.

**What I Learned:**

Authentication systems use rate limits to prevent excessive requests and abuse.

Repeated testing can trigger these limits even when the application is functioning correctly.

For a production application with more users, the email delivery configuration may need to be reviewed.

### Issue 6 — Starter-Template Code and Documentation

**Problem:**

During the final code review, Claude Code identified leftover files from the original Next.js/Supabase starter template.

These included:

- `app/protected/`
    
- `deploy-button.tsx`
    
- `env-var-warning.tsx`
    
- `hero.tsx`
    
- `next-logo.tsx`
    
- `supabase-logo.tsx`
    
- `components/tutorial/`
    

The README also contained outdated starter-template documentation.

**Planned Cleanup:**

Claude Code proposed removing unused starter-template components and updating the README to describe PromptVault.

**Verification Note:**

The cleanup was approved during the final review, but the available record does not independently confirm every file deletion or README update.

These changes should be verified against the latest GitHub repository before being marked complete.

**What I Learned:**

Finishing an application involves more than making its features work.

Removing unused code and maintaining accurate documentation are also important parts of software development.

## 5. Debugging Approach

During this project, I followed a general troubleshooting process:

1. **Identify the problem:** Observe the incorrect behavior or error message.
    
2. **Reproduce the issue:** Repeat the action to understand when the problem occurs.
    
3. **Investigate:** Examine application files, dashboard settings, and deployment information.
    
4. **Find the cause:** Determine whether the problem comes from application code, authentication configuration, or deployment settings.
    
5. **Apply a fix:** Update the appropriate code or configuration.
    
6. **Deploy the change:** Commit and push the updated code when necessary.
    
7. **Retest:** Verify that the original problem has been resolved.
    

Claude Code assisted with technical investigation and implementation, while I tested the application and reviewed the results.

## 6. Testing Performed

The application was tested for the following functionality:

- User registration.
    
- User login.
    
- Password reset.
    
- User logout.
    
- Protected dashboard access.
    
- Creating and saving prompts.
    
- Editing and deleting prompts.
    
- Creating and managing personas.
    
- Searching and filtering prompts.
    
- Copying saved prompts.
    
- Accessing the deployed website.
    

Testing was performed during development and after deployment changes.

## 7. Role of Claude Code

Claude Code was used as an AI programming assistant throughout development.

It assisted with:

- Writing application code.
    
- Investigating errors.
    
- Explaining potential causes of problems.
    
- Updating application components.
    
- Reviewing the project structure.
    
- Preparing and pushing code changes.
    
- Supporting final cleanup and verification.
    

My role involved defining the project requirements, reviewing the application, identifying issues during testing, providing feedback, and verifying whether the changes worked.

Using Claude Code also required checking its results rather than assuming every suggested fix was correct.

## 8. Lessons Learned

### Software Development

I gained practical experience working with a full-stack web application and understanding how its frontend, backend, and deployment services connect.

### Debugging

I learned that error messages provide clues about where a problem occurs.

For example, a 404 error may indicate a missing application route or an unavailable deployment URL.

### Authentication

I learned that authentication involves multiple processes, including user registration, sessions, email delivery, password recovery, and redirects.

### Version Control

I learned how GitHub helps track code changes and how individual commits can be verified in Vercel.

### Deployment

I learned that a successful production build does not guarantee that every feature works.

The deployed application still needs to be tested.

### AI-Assisted Development

I learned how AI coding tools can accelerate development and debugging, but their output still requires human review and testing.

### Documentation

I learned the importance of recording development decisions, errors, solutions, and lessons learned so the project can be understood and maintained later.

## 9. Final Reflection

PromptVault gave me hands-on experience with developing and deploying a full-stack application.

Before this project, I had limited experience connecting a web application to cloud-based authentication, database storage, and automated deployment.

Through the development process, I became more familiar with how these technologies work together.

The most valuable part of the project was not just building the application, but learning how to troubleshoot problems, verify fixes, and understand the overall development workflow.

## Related Notes

- [[00 - Project Home]]
- [[01 - Project Overview]]
- [[04 - Authentication]]
- [[05 - GitHub and Vercel Deployment]]
- [[07 - Testing and Verification]]
- [[08 - Lessons]]