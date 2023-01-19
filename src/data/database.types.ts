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
          anilist: number | null
          id: number
          image_url: string | null
          name: string
          publisher: string
          source: string | null
          timestamp: string
          type: string
        }
        Insert: {
          anilist?: number | null
          id: number
          image_url?: string | null
          name: string
          publisher: string
          source?: string | null
          timestamp?: string
          type: string
        }
        Update: {
          anilist?: number | null
          id?: number
          image_url?: string | null
          name?: string
          publisher?: string
          source?: string | null
          timestamp?: string
          type?: string
        }
      }
      publication: {
        Row: {
          date: string
          edition: string | null
          id: string
          image_url: string | null
          name: string
          price: number
          publisher: string
          serie_id: number | null
          wide: boolean
        }
        Insert: {
          date: string
          edition?: string | null
          id?: string
          image_url?: string | null
          name: string
          price?: number
          publisher: string
          serie_id?: number | null
          wide?: boolean
        }
        Update: {
          date?: string
          edition?: string | null
          id?: string
          image_url?: string | null
          name?: string
          price?: number
          publisher?: string
          serie_id?: number | null
          wide?: boolean
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
  }
}
