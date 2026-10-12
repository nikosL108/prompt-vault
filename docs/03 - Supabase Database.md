# PromptVault — Supabase Database

## 1. Overview

PromptVault uses **Supabase** as its backend service. Supabase provides a PostgreSQL database for storing application information and an authentication system for managing user accounts.

The database allows users to save, retrieve, update, and delete their AI prompts and personas.

## 2. Database Technology

- **Supabase:** Backend platform used for database management and authentication.
    
- **PostgreSQL:** Relational database system used by Supabase.
    
- **SQL:** Language used to create, query, and manage database tables.
    
- **Row Level Security (RLS):** Security feature that controls which database records users can access.
    

## 3. Information Stored

PromptVault stores information related to:

**AI Prompts**

- Saved prompt content
    
- Prompt information used for organization and retrieval
    
- Information connecting prompts to their owners
    

**AI Personas**

- Saved AI persona configurations
    
- Persona information used for future reuse
    
- Information connecting personas to their owners
    

**User Accounts**

- User account identifiers
    
- Email addresses
    
- Authentication information managed by Supabase Auth
    

Supabase Auth manages credentials separately from the application's prompt and persona data.

## 4. Database Operations

The application supports four main database operations, commonly called CRUD.

|Operation|Purpose|
|---|---|
|Create|Save a new prompt or persona|
|Read|Retrieve previously saved information|
|Update|Edit an existing prompt or persona|
|Delete|Remove a saved prompt or persona|

These operations allow users to manage their information through the PromptVault dashboard.

## 5. Database Security

PromptVault uses Supabase Row Level Security (RLS) policies to protect user information.

RLS controls database access based on the authenticated user.

The intended security behavior is:

- Users must be authenticated to access their private data.
    
- Users can access their own saved prompts and personas.
    
- Users should not be able to access another user's private records.
    
- Database access is controlled by Supabase security policies.
    

RLS was reviewed during the project's final testing process.

## 6. How the Application Connects to Supabase

1. A user signs into PromptVault.
    
2. Supabase Authentication verifies the user.
    
3. The application uses its Supabase integration to request database operations.
    
4. Supabase evaluates the applicable database permissions and RLS policies.
    
5. Authorized data is returned to the application.
    
6. The dashboard displays the requested information.
    

## 7. Supabase Dashboard

The Supabase dashboard was used to manage and inspect the backend.

Important sections include:

- **Table Editor:** View database tables and stored records.
    
- **SQL Editor:** Run SQL queries.
    
- **Authentication → Users:** View registered user accounts.
    
- **Authentication → Emails:** Review authentication email settings.
    
- **Authentication → Rate Limits:** Review restrictions on authentication requests.
    

## 8. Testing and Verification

During development, we tested the application's ability to:

- Create and save prompts.
    
- Retrieve previously saved prompts.
    
- Edit and delete prompts.
    
- Create and manage AI personas.
    
- Authenticate users through Supabase.
    
- Apply database security policies.
    

The application was tested before its production deployment was considered complete.

## 9. What I Learned

This project helped me understand:

- How a web application communicates with a cloud database.
    
- How PostgreSQL can store information for a web application.
    
- Why database security matters when multiple users have accounts.
    
- How Supabase combines authentication and database services.
    
- How CRUD operations support the main features of an application.
    

## Related Notes

- [[00 - Project Home]]
- [[02 - Project Architecture]]
- [[04 - Authentication]]
- [[07 - Testing and Verification]]