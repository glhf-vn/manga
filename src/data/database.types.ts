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
          id: number
          image_url: string | null
          name: string
          source: string | null
          timestamp: string
        }
        Insert: {
          id: number
          image_url?: string | null
          name: string
          source?: string | null
          timestamp?: string
        }
        Update: {
          id?: number
          image_url?: string | null
          name?: string
          source?: string | null
          timestamp?: string
        }
      }
      publication: {
        Row: {
          date: string
          edition: string | null
          id: string
          image_url: string[] | null
          name: string
          price: number
          publisher: string
          serie_id: number | null
        }
        Insert: {
          date: string
          edition?: string | null
          id?: string
          image_url?: string[] | null
          name: string
          price?: number
          publisher: string
          serie_id?: number | null
        }
        Update: {
          date?: string
          edition?: string | null
          id?: string
          image_url?: string[] | null
          name?: string
          price?: number
          publisher?: string
          serie_id?: number | null
        }
      }
      publisher: {
        Row: {
          color: string
          id: string
          name: string
        }
        Insert: {
          color: string
          id: string
          name: string
        }
        Update: {
          color?: string
          id?: string
          name?: string
        }
      }
      series: {
        Row: {
          anilist: number | null
          id: number
          name: string
          publisher: string
          status: Database["public"]["Enums"]["status"]
          type: string
        }
        Insert: {
          anilist?: number | null
          id?: number
          name: string
          publisher: string
          status?: Database["public"]["Enums"]["status"]
          type: string
        }
        Update: {
          anilist?: number | null
          id?: number
          name?: string
          publisher?: string
          status?: Database["public"]["Enums"]["status"]
          type?: string
        }
      }
      type: {
        Row: {
          color: string
          id: string
          name: string
        }
        Insert: {
          color: string
          id: string
          name: string
        }
        Update: {
          color?: string
          id?: string
          name?: string
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
      status: "Licensed" | "Published" | "Finished"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
