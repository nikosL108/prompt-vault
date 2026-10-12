'use client';

/**
 * Modal Component
 *
 * What it does:
 * - Simple modal overlay for displaying forms or content
 * - Shows/hides based on isOpen prop
 * - Closes when clicking X button or outside modal
 * - Renders children inside the modal
 *
 * Why separate component:
 * - Reusable for different modal types
 * - Keeps dashboard code clean
 * - Easy to style and manage
 */

interface ModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ isOpen, title, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay - click to close */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white dark:bg-slate-900 rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        >
          {/* Header */}
          <div className="sticky top-0 flex justify-between items-center p-6 border-b border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl leading-none"
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div className="p-6">{children}</div>
        </div>
      </div>
    </>
  );
}
