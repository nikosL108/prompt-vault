'use client';

import { useState } from 'react';
import { Modal } from '../../components/modal';
import { PersonaForm } from './persona-form';

export function PersonasFormModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
      >
        Create New Persona
      </button>
      <Modal isOpen={isOpen} title="Create New Persona" onClose={() => setIsOpen(false)}>
        <PersonaForm onSuccess={() => setIsOpen(false)} />
      </Modal>
    </>
  );
}
