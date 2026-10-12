'use client';

import { useState } from 'react';

/**
 * CopyButton Component
 *
 * What it does:
 * - Copies prompt content to user's clipboard
 * - Shows "Copied!" feedback for 2 seconds
 * - Uses Clipboard API (navigator.clipboard.writeText)
 *
 * Why client component:
 * - Handles clipboard access (browser API)
 * - Shows real-time feedback
 */

interface CopyButtonProps {
  content: string;
  title: string;
}

export function CopyButton({ content, title }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      // Copy to clipboard
      await navigator.clipboard.writeText(content);

      // Show feedback
      setCopied(true);

      // Reset after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      title={`Copy "${title}" to clipboard`}
      className={`px-3 py-1 text-sm rounded transition ${
        copied
          ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200'
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700'
      }`}
    >
      {copied ? '✓ Copied!' : 'Copy'}
    </button>
  );
}
