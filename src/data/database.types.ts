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
          serie_id: number | null
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
          serie_id?: number | null
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
          serie_id?: number | null
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
          serie_id: number | null
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
          serie_id?: number | null
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
          serie_id?: number | null
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
      series: {
        Row: {
          id: number
          name: string
          publisher: string
          type: string
          anilist: number | null
        }
        Insert: {
          id?: number
          name: string
          publisher: string
          type: string
          anilist?: number | null
        }
        Update: {
          id?: number
          name?: string
          publisher?: string
          type?: string
          anilist?: number | null
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
      continents:
        | "Africa"
        | "Antarctica"
        | "Asia"
        | "Europe"
        | "Oceania"
        | "North America"
        | "South America"
    }
  }
}
