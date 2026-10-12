'use client';

import { useState } from 'react';
import { deletePrompt } from '../actions';

/**
 * DeleteButton Component
 *
 * What it does:
 * - Shows a delete button
 * - On click, shows a confirmation dialog
 * - If confirmed, deletes the prompt
 * - Shows loading/error states
 */

interface DeleteButtonProps {
  promptId: string;
}

export function DeleteButton({ promptId }: DeleteButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = async () => {
    setLoading(true);
    setError('');

    const { error: deleteError } = await deletePrompt(promptId);

    if (deleteError) {
      setError(deleteError);
      setLoading(false);
      return;
    }

    // Success - component will be removed by revalidation
  };

  if (showConfirm) {
    return (
      <div className="flex gap-2">
        <button
          onClick={handleDelete}
          disabled={loading}
          className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white rounded"
        >
          {loading ? 'Deleting...' : 'Confirm'}
        </button>
        <button
          onClick={() => {
            setShowConfirm(false);
            setError('');
          }}
          disabled={loading}
          className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 rounded"
        >
          Cancel
        </button>
        {error && <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>}
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="px-3 py-1 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 rounded"
    >
      Delete
    </button>
  );
}
