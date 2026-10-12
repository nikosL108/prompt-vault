# PromptVault — Testing and Verification

## 1. Testing Overview

After building PromptVault, I tested the application locally and on its deployed Vercel website.

The purpose of testing was to verify that the application's features worked correctly, that user information could be saved and retrieved, and that authentication behaved as expected.

Testing was primarily performed manually by interacting with the application and observing the results.

**Production Website:** [https://prompt-vault-eosin.vercel.app](https://prompt-vault-eosin.vercel.app/)

## 2. Testing Environments

### Local Development

During development, the application was run locally using the Next.js development server.

The main development address was:

`http://localhost:3000`

When port 3000 was already in use, Next.js attempted to use port 3001.

This helped me understand that two development servers can conflict when using the same project.

### Production

The application was deployed through Vercel.

Production testing was necessary because some problems, particularly authentication redirects and logout navigation, appeared when using the deployed application.

## 3. Functional Testing

The following features were included in the final testing checklist.

|Feature|Expected Result|Reported Status|
|---|---|---|
|Website loading|PromptVault homepage appears|Passed|
|User login|Existing user can sign in|Passed|
|User logout|Session ends and user returns to homepage|Passed after fix|
|Password reset|User can change their password|Successful during testing|
|Create prompt|New prompt is saved|Reported working|
|View prompts|Saved prompts appear|Reported working|
|Edit prompt|Changes are saved|Reported working|
|Delete prompt|Prompt is removed|Reported working|
|Search prompts|Matching prompts are displayed|Reported working|
|AI personas|Personas can be managed|Reported working|
|Data persistence|Saved information remains after refresh|Reported working|

These results reflect the manual testing reported during development. They are not a substitute for automated tests or a formal security audit.

## 4. Authentication Testing

### Login

**Test:** Sign in with an existing account.

**Expected:** The application authenticates the user and opens the dashboard.

**Result:** Passed after authentication and redirect troubleshooting.

### Logout

**Test:** Click Sign Out while authenticated.

**Expected:** The user's session ends and the application returns to the homepage.

**Initial Result:** Failed with a 404 error.

**Final Result:** Passed after replacing the broken logout link and deploying the fix.

### Password Recovery

**Test:** Request a password reset and follow the recovery link.

**Expected:** The user can update their password and return to the application.

**Initial Result:** A recovery link returned a Vercel deployment error.

**Later Result:** Password recovery succeeded, although an incorrect starter-template redirect was also encountered and subsequently corrected.

### Email Rate Limiting

**Test:** Request multiple authentication emails.

**Observed Result:** Supabase returned `email rate limit exceeded`.

**Finding:** The project's email limit was configured at two emails per hour.

**Follow-up:** Custom SMTP may be appropriate if the application is intended for wider public use.

## 5. Deployment Verification

After fixing the logout issue, I verified the updated deployment.

**GitHub Commit:** `9a6cd8a`

**Branch:** `main`

**Vercel Status:** Ready

**Verification Process:**

1. Push the updated code to GitHub.
    
2. Open the Vercel deployment dashboard.
    
3. Check the deployment status.
    
4. Compare the deployed commit with the GitHub commit.
    
5. Open the live website.
    
6. Retest the affected feature.
    

The logout issue was resolved after the updated version was deployed.

## 6. Database and Security Testing

PromptVault uses Supabase PostgreSQL and Row Level Security (RLS).

The application's database functionality was tested through prompt and persona management.

Security-related checks included reviewing the authentication setup and RLS configuration.

### Important Distinction

Successful login and data storage do not automatically prove that user data is secure.

A stronger security test would use two separate accounts to verify that one user cannot read, modify, or delete another user's records.

This should be recorded as a separate verified test if performed.

## 7. Remaining Verification

Before presenting the project as production-ready for broader public use, the following should be checked or documented:

- Confirm the final README matches the deployed application.
    
- Confirm unused starter-template code was removed.
    
- Retest email recovery after rate limits reset.
    
- Verify data isolation using two separate accounts.
    
- Check usability on mobile devices.
    
- Review browser console and production logs for errors.
    

These checks are distinct from the core functionality already tested.

## 8. Lessons Learned From Testing

### Local Testing Is Not Enough

An application can work locally but encounter problems after deployment because of differences in URLs, configuration, and hosting environments.

### Successful Builds Do Not Guarantee Correct Behavior

Vercel may report that a deployment is Ready even when a button or route is broken.

### Retesting Is Essential

After making a change, the affected functionality should be tested again on the deployed website.

### Error Messages Are Useful Evidence

Errors such as `404 DEPLOYMENT_NOT_FOUND` and `email rate limit exceeded` helped narrow down the possible causes of problems.

### Manual and Automated Testing Are Different

Manual testing helped verify the application's visible behavior.

Automated tests could provide more consistent regression testing in future versions.

## 9. Final Testing Summary

PromptVault's main application features were reported working after development and troubleshooting.

Authentication, deployment, and logout were tested directly during the debugging process.

The project demonstrated the importance of verifying individual features, confirming deployment versions, and documenting both successful and unsuccessful tests.

## Related Notes

- [[00 - Project Home]]
- [[03 - Supabase Database]]
- [[04 - Authentication]]
- [[05 - GitHub and Vercel Deployment]]
- [[06 - Development and Troubleshooting]]
- [[08 - Lessons]]