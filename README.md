# PromptVault

Your personal AI Prompt & Persona Library. Create, organize, manage, and reuse your favorite AI prompts and personas across all your projects.

## Features

- 📝 **Save & Organize Prompts** - Create and categorize your AI prompts with titles, content, and custom categories
- 🤖 **AI Personas** - Build and manage reusable AI persona templates with system prompts and descriptions
- 🔍 **Search & Filter** - Quickly find prompts by title or category with real-time search
- 📋 **Copy to Clipboard** - One-click copying of prompt content for immediate use
- 🔐 **Secure & Private** - Row Level Security ensures your data is private and only accessible to you
- 🌓 **Dark Mode** - Seamless light/dark theme support
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices

## Tech Stack

- **Frontend**: Next.js 16 (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Authentication**: Supabase Auth (Email/Password)
- **Database**: Supabase PostgreSQL with Row Level Security
- **Deployment**: Vercel (with automatic GitHub integration)
- **Security**: Server-side rendering, secure Server Actions, RLS policies, environment-based secrets

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- A Supabase account (free tier works great)
- A GitHub account (for Vercel deployment)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/nikosL108/prompt-vault.git
   cd prompt-vault
   ```

2. **Set up Supabase**
   - Create a new Supabase project at [database.new](https://database.new)
   - Note your Project URL and Publishable Key from the API settings

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
   ```

4. **Set up the database**
   - In Supabase, go to SQL Editor
   - Create the `prompts` table:
     ```sql
     create table prompts (
       id uuid default gen_random_uuid() primary key,
       user_id uuid not null references auth.users(id) on delete cascade,
       title text not null,
       content text not null,
       category text default 'General',
       created_at timestamp default now(),
       updated_at timestamp default now()
     );

     create trigger update_prompts_updated_at
     before update on prompts
     for each row
     execute function moddatetime(updated_at);

     alter table prompts enable row level security;
     create policy "Users can only see their own prompts" on prompts
       for select using (auth.uid() = user_id);
     create policy "Users can only create their own prompts" on prompts
       for insert with check (auth.uid() = user_id);
     create policy "Users can only update their own prompts" on prompts
       for update using (auth.uid() = user_id);
     create policy "Users can only delete their own prompts" on prompts
       for delete using (auth.uid() = user_id);
     ```
   
   - Create the `personas` table (same pattern with system_prompt and description instead of category/content)

5. **Install dependencies and run**
   ```bash
   npm install
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to see your app.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub (already set up)
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
4. Deploy! Vercel will automatically redeploy on every push to main

Your live site: [https://prompt-vault-eosin.vercel.app](https://prompt-vault-eosin.vercel.app)

## Project Structure

```
prompt-vault/
├── app/
│   ├── page.tsx                 # Landing page
│   ├── layout.tsx              # Root layout
│   ├── dashboard/
│   │   ├── page.tsx           # Prompts dashboard
│   │   ├── actions.ts         # Server actions for prompts
│   │   ├── components/        # Prompt-specific components
│   │   └── personas/          # Personas section
│   └── auth/                  # Authentication routes
├── components/
│   ├── login-form.tsx
│   ├── sign-up-form.tsx
│   ├── logout-button.tsx
│   ├── auth-button.tsx
│   └── ui/                    # shadcn/ui components
├── lib/
│   ├── supabase/
│   │   ├── client.ts         # Browser Supabase client
│   │   └── server.ts         # Server Supabase client
│   └── utils.ts
└── README.md
```

## Key Features Explained

### Row Level Security (RLS)

All data is secured at the database level. Users can only:
- See their own prompts and personas
- Create new items under their user ID
- Update and delete only their own items

This is enforced by Supabase RLS policies, not just the application layer.

### Server Actions

Database mutations are handled securely via Next.js Server Actions:
- Authentication checks happen server-side
- Supabase RLS policies provide additional protection
- No sensitive data is exposed to the client

### Dynamic Rendering

Dashboard pages use `export const dynamic = 'force-dynamic'` because they:
- Access authenticated user sessions via cookies
- Fetch user-specific data from the database
- Cannot be statically prerendered

## Testing

### Manual Testing Checklist

- [ ] Sign up with a new email account
- [ ] Receive and click confirmation email (check spam folder)
- [ ] Log in with the new account
- [ ] Create a prompt and verify it appears in the dashboard
- [ ] Create a persona and verify it appears in personas page
- [ ] Search for prompts by title
- [ ] Filter prompts by category
- [ ] Copy prompt to clipboard
- [ ] Edit a prompt and verify changes save
- [ ] Delete a prompt and verify it's removed
- [ ] Sign out and verify you're redirected to homepage
- [ ] Try accessing /dashboard directly after logout (should redirect to login)
- [ ] Test password reset: forgotten password → receive email → reset password → login with new password

## Troubleshooting

### "404: This page could not be found"
- Check that you're accessing the correct URL: https://prompt-vault-eosin.vercel.app
- Try clearing your browser cache (Ctrl+Shift+Delete)

### Authentication not working
- Verify environment variables are set correctly in Vercel
- Check Supabase project is active and email auth is enabled
- Look at Supabase logs for auth errors

### Database errors
- Verify RLS policies are enabled on prompts and personas tables
- Check that your user ID foreign keys are correct
- Ensure triggers for updated_at are created

## Contributing

This is a personal project. For bugs or suggestions, open an issue on GitHub.

## License

MIT - feel free to use this as a template for your own projects!

---

**Live Site**: [https://prompt-vault-eosin.vercel.app](https://prompt-vault-eosin.vercel.app)  
**Repository**: [https://github.com/nikosL108/prompt-vault](https://github.com/nikosL108/prompt-vault)
