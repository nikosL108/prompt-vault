'use client';

import { useState } from 'react';
import { updatePersona } from '../actions';
import { Modal } from '../../components/modal';

interface Persona {
  id: string;
  name: string;
  description: string;
  system_prompt: string;
}

interface EditPersonaModalProps {
  persona: Persona;
}

export function EditPersonaModal({ persona }: EditPersonaModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(persona.name);
  const [description, setDescription] = useState(persona.description);
  const [systemPrompt, setSystemPrompt] = useState(persona.system_prompt);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    const { error: serverError } = await updatePersona(
      persona.id,
      name,
      description,
      systemPrompt
    );

    if (serverError) {
      setError(serverError);
      setLoading(false);
      return;
    }

    setMessage('Persona updated!');
    setLoading(false);
    setTimeout(() => setIsOpen(false), 1000);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-3 py-1 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 rounded"
      >
        Edit
      </button>

      <Modal isOpen={isOpen} title={`Edit: ${persona.name}`} onClose={() => setIsOpen(false)}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={100}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              System Prompt
            </label>
            <textarea
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              rows={6}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-3">
              <p className="text-red-800 dark:text-red-100 text-sm">{error}</p>
            </div>
          )}

          {message && (
            <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg p-3">
              <p className="text-green-800 dark:text-green-100 text-sm">{message}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </Modal>
    </>
  );
}
