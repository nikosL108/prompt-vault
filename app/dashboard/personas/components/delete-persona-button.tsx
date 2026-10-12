'use client';

import { useState } from 'react';
import { deletePersona } from '../actions';

interface DeletePersonaButtonProps {
  personaId: string;
  personaName: string;
}

export function DeletePersonaButton({ personaId, personaName }: DeletePersonaButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = async () => {
    setLoading(true);
    setError('');

    const { error: deleteError } = await deletePersona(personaId);

    if (deleteError) {
      setError(deleteError);
      setLoading(false);
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
            setError('');
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
