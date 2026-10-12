'use client';

/**
 * SearchBar Component
 *
 * What it does:
 * - Text input for searching prompts by title
 * - Category dropdown for filtering
 * - Real-time filtering (updates as user types)
 * - Passes search/filter state up to parent via props
 *
 * Why client component:
 * - Handles form state and real-time updates
 * - Parent component does the actual filtering
 */

interface SearchBarProps {
  searchQuery: string;
  selectedCategory: string;
  onSearchChange: (query: string) => void;
  onCategoryChange: (category: string) => void;
  totalResults?: number;
}

const CATEGORIES = ['All', 'Marketing', 'Creative', 'Technical', 'Business', 'Other'];

export function SearchBar({
  searchQuery,
  selectedCategory,
  onSearchChange,
  onCategoryChange,
  totalResults,
}: SearchBarProps) {
  return (
    <div className="mb-6 space-y-4">
      {/* Search Input */}
      <div>
        <input
          type="text"
          placeholder="Search prompts by title..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Filter Row */}
      <div className="flex gap-4 items-center flex-wrap">
        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat === 'All' ? 'All Categories' : cat}
            </option>
          ))}
        </select>

        {/* Results Count */}
        {totalResults !== undefined && (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {totalResults} result{totalResults !== 1 ? 's' : ''}
          </p>
        )}
      </div>
    </div>
  );
}
