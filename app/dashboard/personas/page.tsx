import { getUserPersonas } from './actions';
import { PersonasFormModal } from './components/personas-form-modal';
import { PersonasList } from './components/personas-list';
import Link from 'next/link';

/**
 * Personas Page
 *
 * Similar to the Prompts dashboard but for AI personas
 * Shows all user's personas with search/filter/edit/delete
 */

export default async function PersonasPage() {
  // Fetch user's personas
  const { personas, error: personasError } = await getUserPersonas();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              AI Personas
            </h1>
            <Link
              href="/dashboard"
              className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
            >
              ← Back to Prompts
            </Link>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Create and manage AI persona templates for your prompts
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Error State */}
        {personasError && (
          <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-4 mb-6">
            <p className="text-red-800 dark:text-red-100">
              Error loading personas: {personasError}
            </p>
          </div>
        )}

        {/* Create Button */}
        <div className="mb-8">
          <PersonasFormModal />
        </div>

        {/* Personas List with Search and Filter */}
        <PersonasList personas={personas} />
      </main>
    </div>
  );
}
