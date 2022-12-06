export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      licensed: {
        Row: {
          id: string
          name: string | null
          source: string | null
          anilist: number | null
          image_url: string | null
          publisher: string | null
          type: string | null
        }
        Insert: {
          id?: string
          name?: string | null
          source?: string | null
          anilist?: number | null
          image_url?: string | null
          publisher?: string | null
          type?: string | null
        }
        Update: {
          id?: string
          name?: string | null
          source?: string | null
          anilist?: number | null
          image_url?: string | null
          publisher?: string | null
          type?: string | null
        }
      }
      publication: {
        Row: {
          id: string
          name: string
          date: string
          publisher: string
          price: number
          description: string | null
          image_url: string | null
          edition: string | null
        }
        Insert: {
          id?: string
          name: string
          date: string
          publisher: string
          price?: number
          description?: string | null
          image_url?: string | null
          edition?: string | null
        }
        Update: {
          id?: string
          name?: string
          date?: string
          publisher?: string
          price?: number
          description?: string | null
          image_url?: string | null
          edition?: string | null
        }
      }
      publisher: {
        Row: {
          id: string
          name: string | null
          color: string | null
        }
        Insert: {
          id: string
          name?: string | null
          color?: string | null
        }
        Update: {
          id?: string
          name?: string | null
          color?: string | null
        }
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
  }
}
