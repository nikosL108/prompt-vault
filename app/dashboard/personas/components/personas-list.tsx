'use client';

import { useState, useMemo } from 'react';
import { SearchBar } from '../../components/search-bar';
import { CopyButton } from '../../components/copy-button';
import { EditPersonaModal } from './edit-persona-modal';
import { DeletePersonaButton } from './delete-persona-button';

interface Persona {
  id: string;
  name: string;
  description: string;
  system_prompt: string;
  created_at: string;
}

interface PersonasListProps {
  personas: Persona[];
}

export function PersonasList({ personas }: PersonasListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPersonas = useMemo(() => {
    return personas.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [personas, searchQuery]);

  return (
    <div>
      <SearchBar
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        onSearchChange={setSearchQuery}
        onCategoryChange={setSelectedCategory}
        totalResults={filteredPersonas.length}
      />

      <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800 p-6">
        {filteredPersonas.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              {personas.length === 0 ? 'No personas yet' : 'No personas found'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400 font-semibold mb-6">
              {filteredPersonas.length} persona{filteredPersonas.length !== 1 ? 's' : ''}
            </p>

            {filteredPersonas.map((persona) => (
              <div
                key={persona.id}
                className="border border-gray-200 dark:border-slate-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-slate-800 transition"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {persona.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                      {persona.description}
                    </p>
                    <p className="text-gray-500 dark:text-gray-500 text-xs mt-2">
                      {new Date(persona.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <CopyButton content={persona.system_prompt} title={persona.name} />
                    <EditPersonaModal persona={persona} />
                    <DeletePersonaButton personaId={persona.id} personaName={persona.name} />
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
