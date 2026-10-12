'use client';

import { useState } from 'react';
import { createPrompt } from '../actions';

/**
 * PromptForm Component
 *
 * What it does:
 * - Form for users to create a new prompt
 * - Client-side state management (title, content, category)
 * - Shows loading state while submitting
 * - Displays success/error messages
 * - Calls server action (createPrompt) when submitted
 *
 * Why client component:
 * - Handles form state and interactions
 * - Shows real-time feedback to user
 * - Server action runs securely on backend
 */

interface PromptFormProps {
  onSuccess?: () => void; // Called when prompt is created successfully
}

export function PromptForm({ onSuccess }: PromptFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  /**
   * Handle form submission
   * 1. Prevent default form behavior
   * 2. Show loading state
   * 3. Call server action (createPrompt)
   * 4. Handle response (success or error)
   * 5. Reset form or show error
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    // Call server action
    const { prompt, error: serverError } = await createPrompt(
      title,
      content,
      category
    );

    if (serverError) {
      setError(serverError);
      setLoading(false);
      return;
    }

    if (prompt) {
      setMessage('Prompt created successfully!');
      // Reset form
      setTitle('');
      setContent('');
      setCategory('');
      setLoading(false);

      // Call callback (to refresh prompt list, close modal, etc.)
      onSuccess?.();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title Input */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Name your prompt"
          maxLength={200}
          required
          className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {title.length}/200
        </p>
      </div>

      {/* Content Input */}
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Prompt Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your prompt here..."
          rows={6}
          required
          className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Category Input */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a category...</option>
          <option value="Marketing">Marketing</option>
          <option value="Creative">Creative</option>
          <option value="Technical">Technical</option>
          <option value="Business">Business</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-3">
          <p className="text-red-800 dark:text-red-100 text-sm">{error}</p>
        </div>
      )}

      {/* Success Message */}
      {message && (
        <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg p-3">
          <p className="text-green-800 dark:text-green-100 text-sm">{message}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition"
      >
        {loading ? 'Creating...' : 'Create Prompt'}
      </button>
    </form>
  );
}
