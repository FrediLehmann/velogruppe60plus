export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      touren: {
        Row: {
          ascent: string | null;
          created_at: string | null;
          descent: string | null;
          description: string | null;
          distance: string | null;
          duration: string | null;
          endPoint: string | null;
          id: number;
          image: string | null;
          image_data: Json | null;
          mapUrl: string | null;
          name: string | null;
          next_tour: boolean;
          pause: string | null;
          published: boolean | null;
          route: string | null;
          startPoint: string | null;
        };
        Insert: {
          ascent?: string | null;
          created_at?: string | null;
          descent?: string | null;
          description?: string | null;
          distance?: string | null;
          duration?: string | null;
          endPoint?: string | null;
          id?: number;
          image?: string | null;
          image_data?: Json | null;
          mapUrl?: string | null;
          name?: string | null;
          next_tour?: boolean;
          pause?: string | null;
          published?: boolean | null;
          route?: string | null;
          startPoint?: string | null;
        };
        Update: {
          ascent?: string | null;
          created_at?: string | null;
          descent?: string | null;
          description?: string | null;
          distance?: string | null;
          duration?: string | null;
          endPoint?: string | null;
          id?: number;
          image?: string | null;
          image_data?: Json | null;
          mapUrl?: string | null;
          name?: string | null;
          next_tour?: boolean;
          pause?: string | null;
          published?: boolean | null;
          route?: string | null;
          startPoint?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      install_available_extensions_and_test: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
