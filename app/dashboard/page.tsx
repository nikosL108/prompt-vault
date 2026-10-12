import { getUserPrompts, getCurrentUser } from './actions';
import { PromptFormModal } from './components/prompt-form-modal';
import { PromptsList } from './components/prompts-list';
import Link from 'next/link';
import { LogoutButton } from '@/components/logout-button';

// This page uses cookies() for authentication, so it must be dynamic
export const dynamic = 'force-dynamic';

/**
 * Dashboard Page
 *
 * What this page does:
 * 1. Fetches current user info (server-side, secure)
 * 2. Fetches user's prompts from Supabase (RLS enforced)
 * 3. Displays a dashboard layout with:
 *    - Header with user greeting
 *    - Empty state if no prompts
 *    - Placeholder for prompt list (we'll add this next)
 *
 * Why server-side rendering:
 * - Data is fetched securely before sending to browser
 * - RLS policies are enforced by Supabase
 * - No sensitive database queries exposed to client
 */

export default async function DashboardPage() {
  // Fetch current user
  const { user, error: userError } = await getCurrentUser();

  // Fetch user's prompts
  const { prompts, error: promptsError } = await getUserPrompts();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                PromptVault
              </h1>
              {user && (
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Welcome, <span className="font-semibold">{user.email}</span>
                </p>
              )}
            </div>
            <div className="flex gap-4 items-center">
              <Link
                href="/dashboard/personas"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                AI Personas
              </Link>
            </div>
            <LogoutButton className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-md" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Error States */}
        {userError && (
          <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-4 mb-6">
            <p className="text-red-800 dark:text-red-100">
              Error loading user: {userError}
            </p>
          </div>
        )}

        {promptsError && (
          <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-4 mb-6">
            <p className="text-red-800 dark:text-red-100">
              Error loading prompts: {promptsError}
            </p>
          </div>
        )}

        {/* Dashboard Content */}
        <div className="mb-8">
          <PromptFormModal />
        </div>

        {/* Prompts List with Search and Filter */}
        <PromptsList prompts={prompts} />
      </main>
    </div>
  );
}
