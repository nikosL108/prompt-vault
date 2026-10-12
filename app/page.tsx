import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { AuthButton } from '@/components/auth-button';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { Suspense } from 'react';

/**
 * PromptVault Home Page
 *
 * Smart landing page that:
 * - Redirects authenticated users to /dashboard
 * - Shows welcome page for guests
 */

export default async function Home() {
  // Check if user is authenticated
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // If user is logged in, redirect to dashboard
  if (user) {
    redirect('/dashboard');
  }

  // Guest landing page
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">PromptVault</h1>
          <div className="flex gap-4 items-center">
            <ThemeSwitcher />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Your AI Prompt Library
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Create, organize, and manage reusable AI prompts and personas for all your needs
          </p>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 my-12">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
              <div className="text-3xl mb-3">📝</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Save Prompts</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Create and save your favorite prompts with categories
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
              <div className="text-3xl mb-3">🤖</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">AI Personas</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Build and customize AI persona templates
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
              <div className="text-3xl mb-3">🔍</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Search & Filter</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Quickly find what you need with powerful search
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/auth/sign-up"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
            >
              Sign Up
            </Link>
            <Link
              href="/auth/login"
              className="px-8 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-900 dark:text-white font-semibold rounded-lg transition"
            >
              Sign In
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>PromptVault © 2024 • Build, save, and organize your AI prompts</p>
        </div>
      </footer>
    </div>
  );
}
