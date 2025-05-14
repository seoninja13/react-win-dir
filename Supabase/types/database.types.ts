/**
 * Supabase Database Types
 * 
 * This file contains TypeScript types for the Supabase database.
 * These types are used to provide type safety for database operations.
 * 
 * Note: In a production environment, these types would be generated using the Supabase CLI:
 * supabase gen types typescript --linked > Supabase/types/database.types.ts
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          name: string
          slug: string
          category: string
          subcategory: string | null
          description: string | null
          features: Json | null
          specifications: Json | null
          images: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          category: string
          subcategory?: string | null
          description?: string | null
          features?: Json | null
          specifications?: Json | null
          images?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          category?: string
          subcategory?: string | null
          description?: string | null
          features?: Json | null
          specifications?: Json | null
          images?: Json | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      content: {
        Row: {
          id: string
          page_slug: string
          title: string
          meta_description: string | null
          content: Json | null
          sections: Json | null
          images: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          page_slug: string
          title: string
          meta_description?: string | null
          content?: Json | null
          sections?: Json | null
          images?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          page_slug?: string
          title?: string
          meta_description?: string | null
          content?: Json | null
          sections?: Json | null
          images?: Json | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      leads: {
        Row: {
          id: string
          first_name: string
          last_name: string
          email: string
          phone: string | null
          address: string | null
          city: string | null
          state: string | null
          zip: string | null
          message: string | null
          services: string[] | null
          source: string | null
          status: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          first_name: string
          last_name: string
          email: string
          phone?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          zip?: string | null
          message?: string | null
          services?: string[] | null
          source?: string | null
          status?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          email?: string
          phone?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          zip?: string | null
          message?: string | null
          services?: string[] | null
          source?: string | null
          status?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          id: string
          customer_name: string
          location: string | null
          testimonial: string
          rating: number | null
          services: string[] | null
          approved: boolean | null
          created_at: string
        }
        Insert: {
          id?: string
          customer_name: string
          location?: string | null
          testimonial: string
          rating?: number | null
          services?: string[] | null
          approved?: boolean | null
          created_at?: string
        }
        Update: {
          id?: string
          customer_name?: string
          location?: string | null
          testimonial?: string
          rating?: number | null
          services?: string[] | null
          approved?: boolean | null
          created_at?: string
        }
        Relationships: []
      }
      gallery: {
        Row: {
          id: string
          project_type: string
          location: string | null
          description: string | null
          images: Json
          created_at: string
        }
        Insert: {
          id?: string
          project_type: string
          location?: string | null
          description?: string | null
          images: Json
          created_at?: string
        }
        Update: {
          id?: string
          project_type?: string
          location?: string | null
          description?: string | null
          images?: Json
          created_at?: string
        }
        Relationships: []
      }
      service_areas: {
        Row: {
          id: string
          city: string
          county: string | null
          state: string
          zip: string | null
          available: boolean | null
          created_at: string
        }
        Insert: {
          id?: string
          city: string
          county?: string | null
          state: string
          zip?: string | null
          available?: boolean | null
          created_at?: string
        }
        Update: {
          id?: string
          city?: string
          county?: string | null
          state?: string
          zip?: string | null
          available?: boolean | null
          created_at?: string
        }
        Relationships: []
      }
      logs: {
        Row: {
          id: string
          level: string
          message: string
          details: Json | null
          source: string | null
          user_id: string | null
          session_id: string | null
          request_id: string | null
          url: string | null
          method: string | null
          status_code: number | null
          user_agent: string | null
          ip_address: string | null
          duration: number | null
          created_at: string
          tags: string[] | null
        }
        Insert: {
          id?: string
          level: string
          message: string
          details?: Json | null
          source?: string | null
          user_id?: string | null
          session_id?: string | null
          request_id?: string | null
          url?: string | null
          method?: string | null
          status_code?: number | null
          user_agent?: string | null
          ip_address?: string | null
          duration?: number | null
          created_at?: string
          tags?: string[] | null
        }
        Update: {
          id?: string
          level?: string
          message?: string
          details?: Json | null
          source?: string | null
          user_id?: string | null
          session_id?: string | null
          request_id?: string | null
          url?: string | null
          method?: string | null
          status_code?: number | null
          user_agent?: string | null
          ip_address?: string | null
          duration?: number | null
          created_at?: string
          tags?: string[] | null
        }
        Relationships: []
      }
      recent_errors: {
        Row: {
          id: string
          message: string
          details: Json | null
          source: string | null
          url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          message: string
          details?: Json | null
          source?: string | null
          url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          message?: string
          details?: Json | null
          source?: string | null
          url?: string | null
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
