import { supabase, handleDatabaseError } from "./index";
import type { Database } from "../../types/supabase";

type Content = Database["public"]["Tables"]["content"]["Row"];
type ContentInsert = Database["public"]["Tables"]["content"]["Insert"];
type ContentUpdate = Database["public"]["Tables"]["content"]["Update"];

/**
 * Get content by page slug
 */
export async function getContentBySlug(
  pageSlug: string
): Promise<Content | null> {
  try {
    const { data, error } = await supabase
      .from("content")
      .select("*")
      .eq("page_slug", pageSlug)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return null; // No rows returned
      }
      throw error;
    }

    return data;
  } catch (error) {
    handleDatabaseError(error, "getContentBySlug", { pageSlug });
    return null;
  }
}

/**
 * Get all content
 */
export async function getAllContent(): Promise<Content[]> {
  try {
    const { data, error } = await supabase
      .from("content")
      .select("*")
      .order("page_slug");

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error) {
    handleDatabaseError(error, "getAllContent");
    return [];
  }
}

/**
 * Create new content
 */
export async function createContent(
  content: ContentInsert
): Promise<Content | null> {
  try {
    const { data, error } = await supabase
      .from("content")
      .insert([content])
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    handleDatabaseError(error, "createContent", { content });
    return null;
  }
}

/**
 * Update existing content
 */
export async function updateContent(
  id: string,
  updates: ContentUpdate
): Promise<Content | null> {
  try {
    const { data, error } = await supabase
      .from("content")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    handleDatabaseError(error, "updateContent", { id, updates });
    return null;
  }
}

/**
 * Delete content
 */
export async function deleteContent(id: string): Promise<boolean> {
  try {
    const { error } = await supabase.from("content").delete().eq("id", id);

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    handleDatabaseError(error, "deleteContent", { id });
    return false;
  }
}
