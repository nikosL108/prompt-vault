'use client';

import { useState } from 'react';
import { updatePrompt } from '../actions';

/**
 * EditPromptForm Component
 *
 * What it does:
 * - Form for editing an existing prompt
 * - Pre-fills with current prompt data
 * - Similar to PromptForm but calls updatePrompt instead of createPrompt
 * - Shows loading/error/success states
 */

interface EditPromptFormProps {
  prompt: {
    id: string;
    title: string;
    content: string;
    category: string;
  };
  onSuccess?: () => void;
}

export function EditPromptForm({ prompt, onSuccess }: EditPromptFormProps) {
  const [title, setTitle] = useState(prompt.title);
  const [content, setContent] = useState(prompt.content);
  const [category, setCategory] = useState(prompt.category);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    const { prompt: updatedPrompt, error: serverError } = await updatePrompt(
      prompt.id,
      title,
      content,
      category
    );

    if (serverError) {
      setError(serverError);
      setLoading(false);
      return;
    }

    if (updatedPrompt) {
      setMessage('Prompt updated successfully!');
      setLoading(false);
      onSuccess?.();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title Input */}
      <div>
        <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Title
        </label>
        <input
          id="edit-title"
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
        <label htmlFor="edit-content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Prompt Content
        </label>
        <textarea
          id="edit-content"
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
        <label htmlFor="edit-category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Category
        </label>
        <select
          id="edit-category"
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
        {loading ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  );
}
