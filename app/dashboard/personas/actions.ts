'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

/**
 * Fetch all personas for the current authenticated user
 *
 * How it works:
 * 1. Create a Supabase server client (uses authenticated session)
 * 2. Get the current user from auth
 * 3. Query personas table (RLS automatically filters to current user only)
 * 4. Return personas sorted by most recent first
 *
 * Security:
 * - RLS policies ensure only the user's own personas are returned
 * - No API keys exposed to client
 * - Runs only on the server
 */
export async function getUserPersonas() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      redirect('/auth/login');
    }

    const { data: personas, error } = await supabase
      .from('personas')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching personas:', error);
      return { personas: [], error: error.message };
    }

    return { personas: personas || [], error: null };
  } catch (err) {
    console.error('Unexpected error fetching personas:', err);
    return {
      personas: [],
      error: err instanceof Error ? err.message : 'Unknown error',
    };
  }
}

/**
 * Create a new persona for the current user
 *
 * Security:
 * - Only authenticated users can create personas
 * - user_id is set server-side (can't be spoofed)
 * - RLS policies will enforce ownership
 */
export async function createPersona(
  name: string,
  description: string,
  systemPrompt: string
) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return { persona: null, error: 'Not authenticated' };
    }

    // Validate inputs
    if (!name.trim() || !description.trim() || !systemPrompt.trim()) {
      return { persona: null, error: 'All fields are required' };
    }

    if (name.length > 100) {
      return { persona: null, error: 'Name must be less than 100 characters' };
    }

    // Insert new persona
    const { data, error } = await supabase
      .from('personas')
      .insert([
        {
          user_id: user.id,
          name: name.trim(),
          description: description.trim(),
          system_prompt: systemPrompt.trim(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating persona:', error);
      return { persona: null, error: error.message };
    }

    revalidatePath('/dashboard/personas');

    return { persona: data, error: null };
  } catch (err) {
    console.error('Unexpected error creating persona:', err);
    return {
      persona: null,
      error: err instanceof Error ? err.message : 'Unknown error',
    };
  }
}

/**
 * Update an existing persona
 *
 * Security:
 * - RLS policies ensure user can only update their own personas
 */
export async function updatePersona(
  personaId: string,
  name: string,
  description: string,
  systemPrompt: string
) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return { persona: null, error: 'Not authenticated' };
    }

    // Validate inputs
    if (!name.trim() || !description.trim() || !systemPrompt.trim()) {
      return { persona: null, error: 'All fields are required' };
    }

    if (name.length > 100) {
      return { persona: null, error: 'Name must be less than 100 characters' };
    }

    // Update persona
    const { data, error } = await supabase
      .from('personas')
      .update({
        name: name.trim(),
        description: description.trim(),
        system_prompt: systemPrompt.trim(),
      })
      .eq('id', personaId)
      .select()
      .single();

    if (error) {
      console.error('Error updating persona:', error);
      return { persona: null, error: error.message };
    }

    revalidatePath('/dashboard/personas');

    return { persona: data, error: null };
  } catch (err) {
    console.error('Unexpected error updating persona:', err);
    return {
      persona: null,
      error: err instanceof Error ? err.message : 'Unknown error',
    };
  }
}

/**
 * Delete a persona
 *
 * Security:
 * - RLS policies ensure user can only delete their own personas
 */
export async function deletePersona(personaId: string) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return { error: 'Not authenticated' };
    }

    // Delete persona
    const { error } = await supabase
      .from('personas')
      .delete()
      .eq('id', personaId);

    if (error) {
      console.error('Error deleting persona:', error);
      return { error: error.message };
    }

    revalidatePath('/dashboard/personas');

    return { error: null };
  } catch (err) {
    console.error('Unexpected error deleting persona:', err);
    return {
      error: err instanceof Error ? err.message : 'Unknown error',
    };
  }
}
