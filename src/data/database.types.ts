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
          name: string
          source: string | null
          anilist: number | null
          image_url: string | null
          publisher: string
          type: string
          timestamp: string
        }
        Insert: {
          id?: string
          name: string
          source?: string | null
          anilist?: number | null
          image_url?: string | null
          publisher: string
          type: string
          timestamp?: string
        }
        Update: {
          id?: string
          name?: string
          source?: string | null
          anilist?: number | null
          image_url?: string | null
          publisher?: string
          type?: string
          timestamp?: string
        }
      }
      publication: {
        Row: {
          id: string
          name: string
          date: string
          publisher: string
          price: number
          image_url: string | null
          edition: string | null
          wide: boolean
          type: string | null
        }
        Insert: {
          id?: string
          name: string
          date: string
          publisher: string
          price?: number
          image_url?: string | null
          edition?: string | null
          wide?: boolean
          type?: string | null
        }
        Update: {
          id?: string
          name?: string
          date?: string
          publisher?: string
          price?: number
          image_url?: string | null
          edition?: string | null
          wide?: boolean
          type?: string | null
        }
      }
      publisher: {
        Row: {
          id: string
          name: string
          color: string
        }
        Insert: {
          id: string
          name: string
          color: string
        }
        Update: {
          id?: string
          name?: string
          color?: string
        }
      }
      type: {
        Row: {
          id: string
          name: string
          color: string
        }
        Insert: {
          id: string
          name: string
          color: string
        }
        Update: {
          id?: string
          name?: string
          color?: string
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
