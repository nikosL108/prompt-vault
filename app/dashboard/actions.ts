'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

/**
 * Fetch all prompts for the current authenticated user
 *
 * How it works:
 * 1. Create a Supabase server client (uses authenticated session)
 * 2. Get the current user from auth
 * 3. Query prompts table (RLS automatically filters to current user only)
 * 4. Return prompts sorted by most recent first
 *
 * Security:
 * - RLS policies ensure only the user's own prompts are returned
 * - No API keys exposed to client
 * - Runs only on the server
 */
export async function getUserPrompts() {
  try {
    const supabase = await createClient();

    // Verify user is authenticated
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      redirect('/auth/login');
    }

    // Query prompts table
    // RLS policies automatically filter to only this user's prompts
    const { data: prompts, error } = await supabase
      .from('prompts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching prompts:', error);
      return { prompts: [], error: error.message };
    }

    return { prompts: prompts || [], error: null };
  } catch (err) {
    console.error('Unexpected error fetching prompts:', err);
    return {
      prompts: [],
      error: err instanceof Error ? err.message : 'Unknown error',
    };
  }
}

/**
 * Get the current authenticated user's profile info
 *
 * Used to display user greeting and verify authentication
 */
export async function getCurrentUser() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return { user: null, error: 'Not authenticated' };
    }

    return { user, error: null };
  } catch (err) {
    console.error('Error getting current user:', err);
    return {
      user: null,
      error: err instanceof Error ? err.message : 'Unknown error',
    };
  }
}

/**
 * Create a new prompt for the current user
 *
 * How it works:
 * 1. Verify user is authenticated
 * 2. Insert new prompt with user_id, title, content, category
 * 3. Return the created prompt or error
 *
 * Security:
 * - Only authenticated users can create prompts
 * - user_id set server-side (can't be spoofed)
 * - RLS policies enforce ownership
 */
export async function createPrompt(
  title: string,
  content: string,
  category: string
) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return { prompt: null, error: 'Not authenticated' };
    }

    // Validate inputs
    if (!title.trim() || !content.trim() || !category.trim()) {
      return { prompt: null, error: 'All fields are required' };
    }

    if (title.length > 200) {
      return { prompt: null, error: 'Title must be less than 200 characters' };
    }

    // Insert new prompt
    const { data, error } = await supabase
      .from('prompts')
      .insert([
        {
          user_id: user.id,
          title: title.trim(),
          content: content.trim(),
          category: category.trim(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating prompt:', error);
      return { prompt: null, error: error.message };
    }

    // Revalidate the dashboard to refresh the prompt list
    revalidatePath('/dashboard');

    return { prompt: data, error: null };
  } catch (err) {
    console.error('Unexpected error creating prompt:', err);
    return {
      prompt: null,
      error: err instanceof Error ? err.message : 'Unknown error',
    };
  }
}

/**
 * Update an existing prompt
 *
 * Security:
 * - RLS policies ensure user can only update their own prompts
 * - user_id is not changed (immutable)
 */
export async function updatePrompt(
  promptId: string,
  title: string,
  content: string,
  category: string
) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return { prompt: null, error: 'Not authenticated' };
    }

    // Validate inputs
    if (!title.trim() || !content.trim() || !category.trim()) {
      return { prompt: null, error: 'All fields are required' };
    }

    if (title.length > 200) {
      return { prompt: null, error: 'Title must be less than 200 characters' };
    }

    // Update prompt
    const { data, error } = await supabase
      .from('prompts')
      .update({
        title: title.trim(),
        content: content.trim(),
        category: category.trim(),
      })
      .eq('id', promptId)
      .select()
      .single();

    if (error) {
      console.error('Error updating prompt:', error);
      return { prompt: null, error: error.message };
    }

    // Revalidate to refresh list
    revalidatePath('/dashboard');

    return { prompt: data, error: null };
  } catch (err) {
    console.error('Unexpected error updating prompt:', err);
    return {
      prompt: null,
      error: err instanceof Error ? err.message : 'Unknown error',
    };
  }
}

/**
 * Delete a prompt
 *
 * Security:
 * - RLS policies ensure user can only delete their own prompts
 */
export async function deletePrompt(promptId: string) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return { error: 'Not authenticated' };
    }

    // Delete prompt
    const { error } = await supabase
      .from('prompts')
      .delete()
      .eq('id', promptId);

    if (error) {
      console.error('Error deleting prompt:', error);
      return { error: error.message };
    }

    // Revalidate to refresh list
    revalidatePath('/dashboard');

    return { error: null };
  } catch (err) {
    console.error('Unexpected error deleting prompt:', err);
    return {
      error: err instanceof Error ? err.message : 'Unknown error',
    };
  }
}
