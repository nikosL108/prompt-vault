# PromptVault — Lessons Learned and Future Improvements

## 1. Project Reflection

Developing PromptVault gave me practical experience building, testing, and deploying a full-stack web application.

The project involved more than just writing code. I had to work with several technologies, connect different services, troubleshoot errors, and verify that the application worked after deployment.

I used Claude Code to assist with programming and debugging, while working in Visual Studio Code to manage the project and test its functionality.

One of my biggest takeaways was understanding how the different parts of a web application work together.

## 2. Technical Skills Developed

### Full-Stack Web Development

I gained experience working with Next.js and TypeScript to build a web application.

I learned more about how pages, components, routing, and application functionality fit together.

### Database Integration

Using Supabase helped me understand how an application communicates with a cloud-hosted database.

I gained experience working with persistent data storage and the operations needed to create, retrieve, update, and delete information.

### Authentication and Security

I learned how Supabase Authentication manages user accounts and sessions.

I also became more familiar with Row Level Security (RLS) and why database permissions are important when an application stores information for multiple users.

### Git and GitHub

I learned how to use Git to track changes and GitHub to store my project's source code.

I also learned how to check whether a specific commit had been deployed successfully.

### Cloud Deployment

Deploying PromptVault through Vercel helped me understand the difference between running an application locally and making it available online.

I learned that environment variables, deployment URLs, and production configurations all affect how an application behaves.

## 3. Debugging Lessons

One of the most valuable parts of this project was troubleshooting problems.

### Error Messages Provide Useful Information

When I encountered errors such as `404 DEPLOYMENT_NOT_FOUND`, I learned to investigate whether the problem involved the hosting platform, an incorrect URL, or the application's routing.

### Successful Builds Do Not Guarantee Correct Functionality

Even when Vercel reported that a deployment was Ready, some features still needed to be fixed.

The logout issue demonstrated why testing the actual application is necessary after deployment.

### Fixes Must Be Verified

During development, some problems required multiple attempts before they were resolved.

I learned not to assume a fix worked simply because the code had been changed.

Instead, I needed to test the application again and confirm the expected behavior.

### Configuration Can Cause Problems

Not every issue comes from application code.

Authentication redirects, environment variables, and email rate limits showed me that external service settings can affect application functionality.

## 4. Working With Claude Code

Claude Code was an important development tool throughout the project.

It assisted with writing code, troubleshooting errors, reviewing files, and making changes to the application.

However, I learned that AI-generated code and recommendations still need to be reviewed and tested.

For example, some fixes initially appeared complete but did not work correctly on the live website.

This reinforced the importance of understanding the problem, checking the results, and providing specific feedback.

I also learned that AI coding assistants are more useful when given clear instructions, error messages, and details about the expected behavior.

## 5. What I Would Do Differently

If I started a similar project again, I would make several improvements to my development process.

### Document the Project Earlier

I would begin recording the project's architecture, database structure, and development decisions from the start.

This would make it easier to understand previous changes and troubleshoot problems later.

### Test Features More Frequently

I would test individual features as they were developed rather than waiting until the application was nearly complete.

This could help identify problems earlier.

### Keep Track of Changes

I would make smaller, descriptive Git commits throughout development.

This would make it easier to understand which changes introduced or resolved specific problems.

### Review Deployment Configuration Earlier

I would verify environment variables, authentication redirect URLs, and production settings before beginning full deployment testing.

### Improve My Understanding of the Code

Although Claude Code helped accelerate development, I want to become more comfortable reading and explaining the code myself.

For future projects, I would spend more time examining individual components and understanding how they interact.

## 6. Future Improvements

PromptVault's main functionality has been implemented, but there are opportunities for future improvements.

These are possible enhancements rather than features confirmed to exist in the current application.

### Automated Testing

Add automated tests for important features such as authentication, prompt management, and database operations.

This could help identify regressions after future code changes.

### Improved Email Delivery

Configure a custom SMTP provider if PromptVault is intended for a larger number of users.

This could provide more appropriate email delivery limits and greater control over authentication emails.

### Additional Security Verification

Perform more thorough testing of Row Level Security using separate user accounts.

Review database permissions and authentication-related configuration.

### User Experience Improvements

Collect feedback from users and identify ways to make prompt organization and navigation easier.

### Monitoring and Error Reporting

Add tools for monitoring application errors and performance.

This could make troubleshooting production issues easier.

### Expanded Documentation

Maintain accurate documentation as new features and changes are introduced.

Include updated architecture information, database details, and testing results.

## 7. How This Project Relates to My Career Goals

As a Computer Science student at UNLV with an interest in software development and cybersecurity, this project gave me experience with technologies used in real-world applications.

Working with authentication, database security, cloud services, and version control helped me better understand how software systems are built and maintained.

The project also showed me areas where I want to continue improving, especially backend development, application security, and understanding code more independently.

## 8. Final Takeaway

My biggest takeaway from PromptVault is that software development is not just about getting an application to run.

It also involves understanding how the system works, identifying problems, testing solutions, managing changes, and documenting the results.

Building PromptVault gave me a better understanding of the full development process, from initial setup to production deployment.

It also reinforced the importance of continuing to learn and becoming more independent when working with unfamiliar technologies.

## Related Notes

- [[00 - Project Home]]
- [[01 - Project Overview]]
- [[06 - Development and Troubleshooting]]
- [[07 - Testing and Verification]]