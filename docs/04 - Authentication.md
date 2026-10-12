# PromptVault — Authentication

## 1. Overview

PromptVault uses **Supabase Authentication** to manage user accounts and control access to the application.

Authentication allows users to create accounts, sign in, sign out, and reset their passwords.

This was an important part of development because users need to access their saved prompts and AI personas securely.

## 2. Authentication Features

The application includes the following features:

- **User Registration:** New users can create an account using an email address and password.
    
- **Email Confirmation:** Supabase can require users to verify their email addresses.
    
- **User Login:** Existing users can sign in using their credentials.
    
- **User Logout:** Users can end their authenticated sessions.
    
- **Password Recovery:** Users can request a password reset email.
    
- **Protected Dashboard:** The application restricts access to the private dashboard.
    

## 3. How Authentication Works

1. A user enters their email address and password.
    
2. The application sends the authentication request to Supabase.
    
3. Supabase checks the credentials.
    
4. If authentication succeeds, Supabase establishes a user session.
    
5. The application allows the user to access the dashboard.
    
6. When the user signs out, the application ends the session and redirects them to the homepage.
    

Supabase handles authentication, while Next.js handles the application's pages and navigation.

## 4. Problems Encountered and Solutions

### Problem 1 — Email Confirmation Not Arriving

**Issue:**

During testing, the signup page displayed a message telling users to check their email for confirmation, but the confirmation email did not arrive.

**Investigation:**

I inspected the Supabase dashboard, including:

- Authentication → Emails
    
- Authentication → Users
    
- Individual user confirmation information
    

I also checked whether user accounts were being created successfully.

**Finding:**

Supabase was creating user records, but the signup message alone did not prove that an email had been delivered.

**Lesson Learned:**

A successful signup response does not necessarily mean an email was successfully delivered. Authentication emails need to be tested separately.

### Problem 2 — Password Reset Link Returned a 404 Error

**Issue:**

After requesting a password reset, the email arrived, but opening the reset link initially displayed a Vercel error:

`404 DEPLOYMENT_NOT_FOUND`

**Investigation:**

I examined the password recovery flow and the relationship between Supabase authentication redirects and the deployed website.

**Resolution:**

The recovery flow was corrected during development, allowing the password reset process to continue.

**Lesson Learned:**

Authentication links must redirect to valid application URLs. Incorrect or outdated deployment URLs can prevent users from completing account recovery.

### Problem 3 — Password Reset Redirected to a Starter Page

**Issue:**

After successfully resetting a password, the application redirected to a default Next.js/Supabase starter-template page instead of the intended PromptVault dashboard.

**Resolution:**

The application's post-authentication navigation was corrected so the user could reach the intended application experience.

**Lesson Learned:**

Successful authentication and correct navigation are separate requirements. Both need to be tested.

### Problem 4 — Logout Returned a 404 Error

**Issue:**

Users could sign in, but clicking the Sign Out button redirected them to a page that did not exist.

**Root Cause:**

The dashboard contained a hardcoded link to:

`/auth/logout`

However, this route did not exist in the application.

**Solution:**

Claude Code helped identify the issue in:

`app/dashboard/page.tsx`

The broken link was replaced with the existing `LogoutButton` component.

The component was also updated to accept a `className` property for styling.

The fix was committed and pushed to GitHub.

**Git Commit:** `9a6cd8a`

**Verification:**

1. The updated code was pushed to GitHub.
    
2. Vercel deployed the new commit.
    
3. The production deployment showed a Ready status.
    
4. I tested the Sign Out button again.
    
5. Logout worked correctly.
    

**Lesson Learned:**

A navigation link does not automatically perform an authentication action. Logout needs to end the user's session, not simply navigate to a URL.

### Problem 5 — Email Rate Limit Exceeded

**Issue:**

Repeated password reset testing caused Supabase to display:

`email rate limit exceeded`

**Root Cause:**

The Supabase project's email sending limit was set to two emails per hour.

**Investigation:**

I located the setting under:

Supabase → Authentication → Rate Limits

**Lesson Learned:**

Authentication services use rate limits to prevent abuse. During development, repeated testing can reach these limits even when the application is functioning correctly.

For a production application, email delivery limits and SMTP configuration should be reviewed based on expected usage.

## 5. Authentication Testing

The following functionality was tested during development:

- Creating user accounts.
    
- Signing into an existing account.
    
- Accessing the dashboard after login.
    
- Requesting a password reset.
    
- Updating a password.
    
- Signing out successfully.
    
- Signing in again after logout.
    
- Checking protected dashboard behavior.
    

These tests helped verify the authentication workflow before the project was considered complete.

## 6. Security Considerations

Authentication is only one part of application security.

PromptVault also uses Supabase Row Level Security policies to control database access.

Important security principles include:

- Protecting private application routes.
    
- Using authenticated sessions to identify users.
    
- Restricting database access through RLS.
    
- Avoiding exposure of secret credentials.
    
- Handling authentication errors appropriately.
    
- Using valid authentication redirect URLs.
    

## 7. What I Learned

Working on authentication helped me understand:

1. How Supabase manages user accounts and sessions.
    
2. Why email confirmation and password recovery require correct configuration.
    
3. How redirect URLs affect authentication workflows.
    
4. Why testing successful login alone is not enough.
    
5. How to troubleshoot authentication errors using the Supabase dashboard.
    
6. How GitHub and Vercel fit into the process of fixing and deploying bugs.
    

## Related Notes

- [[00 - Project Home]]
    
- [[02 - Project Architecture]]
    
- [[03 - Supabase Database]]
    
- [[06 - Development and Troubleshooting]]
    
- [[07 - Testing and Verification]]