'use client';

import { useState } from 'react';
import { deletePersona } from '../actions';

interface DeletePersonaButtonProps {
  personaId: string;
}

export function DeletePersonaButton({ personaId }: DeletePersonaButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    const { error: deleteError } = await deletePersona(personaId);

    if (deleteError) {
      setLoading(false);
      return;
    }
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
          }}
          disabled={loading}
          className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 rounded"
        >
          Cancel
        </button>
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
