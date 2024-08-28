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
      daily_goals: {
        Row: {
          created_at: string
          day_of_week: string
          goal: string | null
          id: number
          is_achieved: boolean
          user_id: string
          week: number
          year: number
        }
        Insert: {
          created_at?: string
          day_of_week: string
          goal?: string | null
          id?: number
          is_achieved?: boolean
          user_id?: string
          week: number
          year: number
        }
        Update: {
          created_at?: string
          day_of_week?: string
          goal?: string | null
          id?: number
          is_achieved?: boolean
          user_id?: string
          week?: number
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "daily_goals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      monthly_goals: {
        Row: {
          created_at: string
          goal: string | null
          id: number
          is_achieved: boolean | null
          month: number | null
          user_id: string | null
          year: number | null
        }
        Insert: {
          created_at?: string
          goal?: string | null
          id?: number
          is_achieved?: boolean | null
          month?: number | null
          user_id?: string | null
          year?: number | null
        }
        Update: {
          created_at?: string
          goal?: string | null
          id?: number
          is_achieved?: boolean | null
          month?: number | null
          user_id?: string | null
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "monthly_goals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      quarterly_goals: {
        Row: {
          created_at: string
          goal: string
          id: number
          is_achieved: boolean
          quarter: number
          user_id: string
          year: number
        }
        Insert: {
          created_at?: string
          goal: string
          id?: number
          is_achieved?: boolean
          quarter: number
          user_id?: string
          year: number
        }
        Update: {
          created_at?: string
          goal?: string
          id?: number
          is_achieved?: boolean
          quarter?: number
          user_id?: string
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "quarterly_goals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          created_at: string
          goals_set: boolean | null
          id: string
          username: string | null
        }
        Insert: {
          created_at?: string
          goals_set?: boolean | null
          id?: string
          username?: string | null
        }
        Update: {
          created_at?: string
          goals_set?: boolean | null
          id?: string
          username?: string | null
        }
        Relationships: []
      }
      weekly_goals: {
        Row: {
          created_at: string
          goal: string | null
          id: number
          is_achieved: boolean | null
          user_id: string | null
          week: number | null
          year: number | null
        }
        Insert: {
          created_at?: string
          goal?: string | null
          id?: number
          is_achieved?: boolean | null
          user_id?: string | null
          week?: number | null
          year?: number | null
        }
        Update: {
          created_at?: string
          goal?: string | null
          id?: number
          is_achieved?: boolean | null
          user_id?: string | null
          week?: number | null
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "weekly_goals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      yearly_goals: {
        Row: {
          created_at: string
          goal: string
          id: number
          is_achieved: boolean
          user_id: string
          year: number
        }
        Insert: {
          created_at?: string
          goal: string
          id?: number
          is_achieved?: boolean
          user_id?: string
          year: number
        }
        Update: {
          created_at?: string
          goal?: string
          id?: number
          is_achieved?: boolean
          user_id?: string
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "yearly_goals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
