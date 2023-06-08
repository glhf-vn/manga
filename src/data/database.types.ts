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
        Relationships: [
          {
            foreignKeyName: "licensed_id_fkey"
            columns: ["id"]
            referencedRelation: "series"
            referencedColumns: ["id"]
          }
        ]
      }
      publication: {
        Row: {
          date: string | null
          digital: boolean
          edition: string | null
          id: string
          image_url: string[] | null
          name: string
          price: number
          publisher: string
          serie_id: number | null
        }
        Insert: {
          date?: string | null
          digital?: boolean
          edition?: string | null
          id?: string
          image_url?: string[] | null
          name: string
          price?: number
          publisher: string
          serie_id?: number | null
        }
        Update: {
          date?: string | null
          digital?: boolean
          edition?: string | null
          id?: string
          image_url?: string[] | null
          name?: string
          price?: number
          publisher?: string
          serie_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "publication_publisher_fkey"
            columns: ["publisher"]
            referencedRelation: "publisher"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "publication_serie_id_fkey"
            columns: ["serie_id"]
            referencedRelation: "series"
            referencedColumns: ["id"]
          }
        ]
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
        Relationships: []
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
        Relationships: [
          {
            foreignKeyName: "series_publisher_fkey"
            columns: ["publisher"]
            referencedRelation: "publisher"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "series_type_fkey"
            columns: ["type"]
            referencedRelation: "type"
            referencedColumns: ["id"]
          }
        ]
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
      status: "Licensed" | "Published" | "Finished"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
