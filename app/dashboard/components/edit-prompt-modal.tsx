'use client';

import { useState } from 'react';
import { Modal } from './modal';
import { EditPromptForm } from './edit-prompt-form';

/**
 * EditPromptModal Component
 *
 * What it does:
 * - Manages edit modal state
 * - Shows "Edit" button
 * - Opens modal with EditPromptForm pre-filled with prompt data
 * - Closes modal after successful update
 */

interface EditPromptModalProps {
  prompt: {
    id: string;
    title: string;
    content: string;
    category: string;
  };
}

export function EditPromptModal({ prompt }: EditPromptModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSuccess = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Edit Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-3 py-1 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 rounded"
      >
        Edit
      </button>

      {/* Modal */}
      <Modal isOpen={isOpen} title={`Edit: ${prompt.title}`} onClose={() => setIsOpen(false)}>
        <EditPromptForm prompt={prompt} onSuccess={handleSuccess} />
      </Modal>
    </>
  );
}
