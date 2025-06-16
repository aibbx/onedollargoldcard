export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      donations: {
        Row: {
          amount: number
          block_number: number | null
          created_at: string
          id: string
          is_valid_donation: boolean | null
          lottery_numbers_assigned: number | null
          transaction_id: string
          wallet_address: string
          wallet_type: string
        }
        Insert: {
          amount: number
          block_number?: number | null
          created_at?: string
          id?: string
          is_valid_donation?: boolean | null
          lottery_numbers_assigned?: number | null
          transaction_id: string
          wallet_address: string
          wallet_type: string
        }
        Update: {
          amount?: number
          block_number?: number | null
          created_at?: string
          id?: string
          is_valid_donation?: boolean | null
          lottery_numbers_assigned?: number | null
          transaction_id?: string
          wallet_address?: string
          wallet_type?: string
        }
        Relationships: []
      }
      lottery_numbers: {
        Row: {
          assigned_at: string
          donation_id: string | null
          id: number
          lottery_number: number
          round_number: number
          wallet_address: string
        }
        Insert: {
          assigned_at?: string
          donation_id?: string | null
          id?: number
          lottery_number: number
          round_number: number
          wallet_address: string
        }
        Update: {
          assigned_at?: string
          donation_id?: string | null
          id?: number
          lottery_number?: number
          round_number?: number
          wallet_address?: string
        }
        Relationships: [
          {
            foreignKeyName: "lottery_numbers_donation_id_fkey"
            columns: ["donation_id"]
            isOneToOne: false
            referencedRelation: "donations"
            referencedColumns: ["id"]
          },
        ]
      }
      lottery_rounds: {
        Row: {
          backup_reason: string | null
          completed_at: string | null
          created_at: string
          final_pool_amount: number | null
          id: number
          is_backup_mechanism: boolean | null
          is_completed: boolean | null
          round_number: number
          target_amount: number | null
          total_lottery_numbers: number | null
          total_participants: number | null
          transaction_hash: string | null
          winner_address: string | null
          winner_prize: number | null
          winning_lottery_number: number | null
        }
        Insert: {
          backup_reason?: string | null
          completed_at?: string | null
          created_at?: string
          final_pool_amount?: number | null
          id?: number
          is_backup_mechanism?: boolean | null
          is_completed?: boolean | null
          round_number: number
          target_amount?: number | null
          total_lottery_numbers?: number | null
          total_participants?: number | null
          transaction_hash?: string | null
          winner_address?: string | null
          winner_prize?: number | null
          winning_lottery_number?: number | null
        }
        Update: {
          backup_reason?: string | null
          completed_at?: string | null
          created_at?: string
          final_pool_amount?: number | null
          id?: number
          is_backup_mechanism?: boolean | null
          is_completed?: boolean | null
          round_number?: number
          target_amount?: number | null
          total_lottery_numbers?: number | null
          total_participants?: number | null
          transaction_hash?: string | null
          winner_address?: string | null
          winner_prize?: number | null
          winning_lottery_number?: number | null
        }
        Relationships: []
      }
      pool_status: {
        Row: {
          current_round: number | null
          fee_address: string | null
          fee_amount: number | null
          id: number
          is_active: boolean | null
          last_updated: string
          last_valid_donation_address: string | null
          last_valid_donation_at: string | null
          participant_count: number | null
          pool_address: string | null
          pool_amount: number | null
          target_amount: number | null
          total_amount: number | null
          total_lottery_numbers: number | null
        }
        Insert: {
          current_round?: number | null
          fee_address?: string | null
          fee_amount?: number | null
          id?: number
          is_active?: boolean | null
          last_updated?: string
          last_valid_donation_address?: string | null
          last_valid_donation_at?: string | null
          participant_count?: number | null
          pool_address?: string | null
          pool_amount?: number | null
          target_amount?: number | null
          total_amount?: number | null
          total_lottery_numbers?: number | null
        }
        Update: {
          current_round?: number | null
          fee_address?: string | null
          fee_amount?: number | null
          id?: number
          is_active?: boolean | null
          last_updated?: string
          last_valid_donation_address?: string | null
          last_valid_donation_at?: string | null
          participant_count?: number | null
          pool_address?: string | null
          pool_amount?: number | null
          target_amount?: number | null
          total_amount?: number | null
          total_lottery_numbers?: number | null
        }
        Relationships: []
      }
      user_stats: {
        Row: {
          donation_count: number | null
          last_donation_at: string | null
          total_donated: number | null
          total_lottery_numbers: number | null
          updated_at: string
          valid_donated: number | null
          valid_donation_count: number | null
          wallet_address: string
          winning_chance: number | null
        }
        Insert: {
          donation_count?: number | null
          last_donation_at?: string | null
          total_donated?: number | null
          total_lottery_numbers?: number | null
          updated_at?: string
          valid_donated?: number | null
          valid_donation_count?: number | null
          wallet_address: string
          winning_chance?: number | null
        }
        Update: {
          donation_count?: number | null
          last_donation_at?: string | null
          total_donated?: number | null
          total_lottery_numbers?: number | null
          updated_at?: string
          valid_donated?: number | null
          valid_donation_count?: number | null
          wallet_address?: string
          winning_chance?: number | null
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
