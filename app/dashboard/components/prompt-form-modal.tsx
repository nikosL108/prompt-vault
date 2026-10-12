'use client';

import { useState } from 'react';
import { Modal } from './modal';
import { PromptForm } from './prompt-form';

/**
 * PromptFormModal Component
 *
 * What it does:
 * - Manages modal open/close state
 * - Renders Modal with PromptForm inside
 * - Handles closing modal after form submission
 * - Provides button to open modal
 *
 * This wraps Modal + PromptForm together for easy use
 */

export function PromptFormModal() {
  const [isOpen, setIsOpen] = useState(false);

  const handleSuccess = () => {
    // Close modal after successful form submission
    setIsOpen(false);
    // Note: In the next step, we'll refresh the prompt list here
  };

  return (
    <>
      {/* Open Modal Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
      >
        Create New Prompt
      </button>

      {/* Modal */}
      <Modal isOpen={isOpen} title="Create New Prompt" onClose={() => setIsOpen(false)}>
        <PromptForm onSuccess={handleSuccess} />
      </Modal>
    </>
  );
}
