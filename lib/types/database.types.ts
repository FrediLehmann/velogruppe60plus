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
      touren: {
        Row: {
          id: number
          created_at: string | null
          name: string | null
          description: string | null
          mapUrl: string | null
          startPoint: string | null
          endPoint: string | null
          pause: string | null
          distance: string | null
          ascent: string | null
          descent: string | null
          duration: string | null
        }
        Insert: {
          id?: number
          created_at?: string | null
          name?: string | null
          description?: string | null
          mapUrl?: string | null
          startPoint?: string | null
          endPoint?: string | null
          pause?: string | null
          distance?: string | null
          ascent?: string | null
          descent?: string | null
          duration?: string | null
        }
        Update: {
          id?: number
          created_at?: string | null
          name?: string | null
          description?: string | null
          mapUrl?: string | null
          startPoint?: string | null
          endPoint?: string | null
          pause?: string | null
          distance?: string | null
          ascent?: string | null
          descent?: string | null
          duration?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      install_available_extensions_and_test: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
