export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      characteristics: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      flat_characteristics: {
        Row: {
          alt_text: string | null
          characteristic_id: string
          created_at: string
          flat_id: string
          id: string
        }
        Insert: {
          alt_text?: string | null
          characteristic_id: string
          created_at?: string
          flat_id: string
          id?: string
        }
        Update: {
          alt_text?: string | null
          characteristic_id?: string
          created_at?: string
          flat_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "flat_characteristics_characteristic_id_fkey"
            columns: ["characteristic_id"]
            isOneToOne: false
            referencedRelation: "characteristics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "flat_characteristics_flat_id_fkey"
            columns: ["flat_id"]
            isOneToOne: false
            referencedRelation: "flats"
            referencedColumns: ["id"]
          },
        ]
      }
      flat_gallery_images: {
        Row: {
          alt_text: string | null
          created_at: string
          display_order: number | null
          flat_id: string
          id: string
          image_url: string
        }
        Insert: {
          alt_text?: string | null
          created_at?: string
          display_order?: number | null
          flat_id: string
          id?: string
          image_url: string
        }
        Update: {
          alt_text?: string | null
          created_at?: string
          display_order?: number | null
          flat_id?: string
          id?: string
          image_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "flat_gallery_images_flat_id_fkey"
            columns: ["flat_id"]
            isOneToOne: false
            referencedRelation: "flats"
            referencedColumns: ["id"]
          },
        ]
      }
      flats: {
        Row: {
          about_description: string
          building_type: string | null
          created_at: string
          id: string
          location: string
          name: string
          neighborhood: string | null
          total_rooms: number
          updated_at: string
        }
        Insert: {
          about_description: string
          building_type?: string | null
          created_at?: string
          id?: string
          location: string
          name: string
          neighborhood?: string | null
          total_rooms?: number
          updated_at?: string
        }
        Update: {
          about_description?: string
          building_type?: string | null
          created_at?: string
          id?: string
          location?: string
          name?: string
          neighborhood?: string | null
          total_rooms?: number
          updated_at?: string
        }
        Relationships: []
      }
      room_characteristics: {
        Row: {
          alt_text: string | null
          characteristic_id: string
          created_at: string
          id: string
          room_id: string
        }
        Insert: {
          alt_text?: string | null
          characteristic_id: string
          created_at?: string
          id?: string
          room_id: string
        }
        Update: {
          alt_text?: string | null
          characteristic_id?: string
          created_at?: string
          id?: string
          room_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "room_characteristics_characteristic_id_fkey"
            columns: ["characteristic_id"]
            isOneToOne: false
            referencedRelation: "characteristics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "room_characteristics_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      room_images: {
        Row: {
          alt_text: string | null
          created_at: string
          display_order: number | null
          id: string
          image_url: string
          room_id: string
        }
        Insert: {
          alt_text?: string | null
          created_at?: string
          display_order?: number | null
          id?: string
          image_url: string
          room_id: string
        }
        Update: {
          alt_text?: string | null
          created_at?: string
          display_order?: number | null
          id?: string
          image_url?: string
          room_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "room_images_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      rooms: {
        Row: {
          availability_status:
            | Database["public"]["Enums"]["availability_status_enum"]
            | null
          created_at: string
          deposit: number | null
          description: string | null
          flat_id: string
          id: string
          lease_term: string | null
          max_occupancy: number | null
          price: number
          room_size: number | null
          title: string
          updated_at: string
        }
        Insert: {
          availability_status?:
            | Database["public"]["Enums"]["availability_status_enum"]
            | null
          created_at?: string
          deposit?: number | null
          description?: string | null
          flat_id: string
          id?: string
          lease_term?: string | null
          max_occupancy?: number | null
          price: number
          room_size?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          availability_status?:
            | Database["public"]["Enums"]["availability_status_enum"]
            | null
          created_at?: string
          deposit?: number | null
          description?: string | null
          flat_id?: string
          id?: string
          lease_term?: string | null
          max_occupancy?: number | null
          price?: number
          room_size?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "rooms_flat_id_fkey"
            columns: ["flat_id"]
            isOneToOne: false
            referencedRelation: "flats"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      availability_status_enum:
        | "available"
        | "becoming_available"
        | "unavailable"
        | "reserved"
        | "under_maintenance"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      availability_status_enum: [
        "available",
        "becoming_available",
        "unavailable",
        "reserved",
        "under_maintenance",
      ],
    },
  },
} as const
