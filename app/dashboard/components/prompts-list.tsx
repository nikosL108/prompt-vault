'use client';

import { useState, useMemo } from 'react';
import { SearchBar } from './search-bar';
import { EditPromptModal } from './edit-prompt-modal';
import { DeleteButton } from './delete-button';
import { CopyButton } from './copy-button';

/**
 * PromptsList Component
 *
 * What it does:
 * - Manages search and filter state
 * - Filters prompts based on search query and category
 * - Renders list of filtered prompts
 * - Shows empty state if no results
 *
 * Why client component:
 * - Handles real-time search/filter state
 * - No server round-trip needed for filtering
 * - Immediate feedback to user
 */

interface Prompt {
  id: string;
  title: string;
  content: string;
  category: string;
  created_at: string;
}

interface PromptsListProps {
  prompts: Prompt[];
}

export function PromptsList({ prompts }: PromptsListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter prompts based on search and category
  const filteredPrompts = useMemo(() => {
    return prompts.filter((prompt) => {
      // Search filter: match title (case-insensitive)
      const matchesSearch = prompt.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      // Category filter
      const matchesCategory =
        selectedCategory === 'All' || prompt.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [prompts, searchQuery, selectedCategory]);

  return (
    <div>
      {/* Search and Filter */}
      <SearchBar
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        onSearchChange={setSearchQuery}
        onCategoryChange={setSelectedCategory}
        totalResults={filteredPrompts.length}
      />

      {/* Prompts or Empty State */}
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800 p-6">
        {filteredPrompts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
              No prompts found
            </p>
            <p className="text-gray-400 dark:text-gray-500">
              {prompts.length === 0
                ? 'Create your first prompt to get started'
                : 'Try adjusting your search or filters'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400 font-semibold mb-6">
              {filteredPrompts.length} prompt
              {filteredPrompts.length !== 1 ? 's' : ''}
            </p>

            {/* Prompt Cards */}
            {filteredPrompts.map((prompt) => (
              <div
                key={prompt.id}
                className="border border-gray-200 dark:border-slate-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-slate-800 transition"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {prompt.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                      {prompt.content.substring(0, 100)}
                      {prompt.content.length > 100 ? '...' : ''}
                    </p>
                    <div className="flex gap-2 mt-3">
                      <span className="inline-block px-2 py-1 bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 text-xs rounded">
                        {prompt.category}
                      </span>
                      <span className="inline-block px-2 py-1 text-gray-500 dark:text-gray-400 text-xs">
                        {new Date(prompt.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <CopyButton content={prompt.content} title={prompt.title} />
                    <EditPromptModal prompt={prompt} />
                    <DeleteButton promptId={prompt.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
