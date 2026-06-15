/**
 * Typed schema for supabase-js, mirroring supabase/migrations.
 * Generated columns (plate_normalized) are read-only: present on Row, absent
 * from Insert/Update. Money is integer IDR. Regenerate with:
 *   supabase gen types typescript --local > src/types/database.types.ts
 */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      organizations: {
        Row: { id: string; name: string; slug: string; created_at: string; updated_at: string };
        Insert: { id?: string; name: string; slug: string; created_at?: string; updated_at?: string };
        Update: { id?: string; name?: string; slug?: string; created_at?: string; updated_at?: string };
        Relationships: [];
      };
      locations: {
        Row: {
          id: string;
          org_id: string;
          name: string;
          address: string | null;
          city: string | null;
          timezone: string;
          latitude: number | null;
          longitude: number | null;
          capacity_car: number;
          capacity_moto: number;
          tariff_config: Json;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          org_id: string;
          name: string;
          address?: string | null;
          city?: string | null;
          timezone?: string;
          latitude?: number | null;
          longitude?: number | null;
          capacity_car?: number;
          capacity_moto?: number;
          tariff_config?: Json;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["locations"]["Insert"]>;
        Relationships: [];
      };
      lanes: {
        Row: {
          id: string;
          location_id: string;
          name: string;
          lane_type: Database["public"]["Enums"]["lane_type"];
          api_key: string;
          status: Database["public"]["Enums"]["lane_status"];
          camera_url: string | null;
          last_heartbeat: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          location_id: string;
          name: string;
          lane_type: Database["public"]["Enums"]["lane_type"];
          api_key?: string;
          status?: Database["public"]["Enums"]["lane_status"];
          camera_url?: string | null;
          last_heartbeat?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["lanes"]["Insert"]>;
        Relationships: [];
      };
      vehicles: {
        Row: {
          id: string;
          plate: string;
          plate_normalized: string;
          vehicle_type: Database["public"]["Enums"]["vehicle_type"] | null;
          phone: string | null;
          push_subscription: Json | null;
          first_seen: string;
          last_seen: string;
          visit_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          plate: string;
          vehicle_type?: Database["public"]["Enums"]["vehicle_type"] | null;
          phone?: string | null;
          push_subscription?: Json | null;
          first_seen?: string;
          last_seen?: string;
          visit_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["vehicles"]["Insert"]>;
        Relationships: [];
      };
      members: {
        Row: {
          id: string;
          location_id: string;
          plate: string;
          plate_normalized: string;
          vehicle_type: Database["public"]["Enums"]["vehicle_type"] | null;
          name: string | null;
          phone: string | null;
          valid_from: string | null;
          valid_until: string | null;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          location_id: string;
          plate: string;
          vehicle_type?: Database["public"]["Enums"]["vehicle_type"] | null;
          name?: string | null;
          phone?: string | null;
          valid_from?: string | null;
          valid_until?: string | null;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["members"]["Insert"]>;
        Relationships: [];
      };
      parking_sessions: {
        Row: {
          id: string;
          location_id: string;
          entry_lane_id: string | null;
          exit_lane_id: string | null;
          vehicle_id: string | null;
          plate: string;
          plate_normalized: string;
          plate_confidence: number | null;
          vehicle_type: Database["public"]["Enums"]["vehicle_type"] | null;
          entry_time: string;
          exit_time: string | null;
          duration_min: number | null;
          fee_calculated: number;
          fee_paid: number;
          payment_method: Database["public"]["Enums"]["payment_method"] | null;
          payment_status: Database["public"]["Enums"]["payment_status"];
          session_status: Database["public"]["Enums"]["session_status"];
          is_member: boolean;
          edge_session_id: string | null;
          synced_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          location_id: string;
          entry_lane_id?: string | null;
          exit_lane_id?: string | null;
          vehicle_id?: string | null;
          plate: string;
          plate_confidence?: number | null;
          vehicle_type?: Database["public"]["Enums"]["vehicle_type"] | null;
          entry_time?: string;
          exit_time?: string | null;
          duration_min?: number | null;
          fee_calculated?: number;
          fee_paid?: number;
          payment_method?: Database["public"]["Enums"]["payment_method"] | null;
          payment_status?: Database["public"]["Enums"]["payment_status"];
          session_status?: Database["public"]["Enums"]["session_status"];
          is_member?: boolean;
          edge_session_id?: string | null;
          synced_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["parking_sessions"]["Insert"]>;
        Relationships: [];
      };
      payments: {
        Row: {
          id: string;
          session_id: string | null;
          method: Database["public"]["Enums"]["payment_method"];
          amount: number;
          order_id: string;
          provider_txn_id: string | null;
          qr_string: string | null;
          qr_url: string | null;
          status: Database["public"]["Enums"]["payment_status"];
          webhook_payload: Json | null;
          paid_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          session_id?: string | null;
          method: Database["public"]["Enums"]["payment_method"];
          amount: number;
          order_id: string;
          provider_txn_id?: string | null;
          qr_string?: string | null;
          qr_url?: string | null;
          status?: Database["public"]["Enums"]["payment_status"];
          webhook_payload?: Json | null;
          paid_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["payments"]["Insert"]>;
        Relationships: [];
      };
      plate_rules: {
        Row: {
          id: string;
          location_id: string;
          plate: string;
          plate_normalized: string;
          rule_type: Database["public"]["Enums"]["plate_rule_type"];
          reason: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          location_id: string;
          plate: string;
          rule_type: Database["public"]["Enums"]["plate_rule_type"];
          reason?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["plate_rules"]["Insert"]>;
        Relationships: [];
      };
      users: {
        Row: {
          id: string;
          org_id: string | null;
          email: string | null;
          name: string | null;
          role: Database["public"]["Enums"]["user_role"];
          location_id: string | null;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          org_id?: string | null;
          email?: string | null;
          name?: string | null;
          role?: Database["public"]["Enums"]["user_role"];
          location_id?: string | null;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["users"]["Insert"]>;
        Relationships: [];
      };
      leads: {
        Row: {
          id: string;
          name: string | null;
          email: string | null;
          phone: string | null;
          facility_name: string | null;
          source: Database["public"]["Enums"]["lead_source"];
          status: Database["public"]["Enums"]["lead_status"];
          city: string | null;
          address: string | null;
          latitude: number | null;
          longitude: number | null;
          entry_lanes: number | null;
          exit_lanes: number | null;
          current_system: Database["public"]["Enums"]["current_system_type"] | null;
          daily_volume: number | null;
          preferred_date: string | null;
          notes: string | null;
          onboarded_at: string | null;
          converted_at: string | null;
          project_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name?: string | null;
          email?: string | null;
          phone?: string | null;
          facility_name?: string | null;
          source?: Database["public"]["Enums"]["lead_source"];
          status?: Database["public"]["Enums"]["lead_status"];
          city?: string | null;
          address?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          entry_lanes?: number | null;
          exit_lanes?: number | null;
          current_system?: Database["public"]["Enums"]["current_system_type"] | null;
          daily_volume?: number | null;
          preferred_date?: string | null;
          notes?: string | null;
          onboarded_at?: string | null;
          converted_at?: string | null;
          project_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["leads"]["Insert"]>;
        Relationships: [];
      };
      projects: {
        Row: {
          id: string;
          lead_id: string | null;
          location_id: string | null;
          facility_name: string | null;
          contact_name: string | null;
          contact_email: string | null;
          contact_phone: string | null;
          city: string | null;
          address: string | null;
          latitude: number | null;
          longitude: number | null;
          entry_lanes: number | null;
          exit_lanes: number | null;
          status: Database["public"]["Enums"]["project_status"];
          start_date: string | null;
          target_live: string | null;
          actual_live: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          lead_id?: string | null;
          location_id?: string | null;
          facility_name?: string | null;
          contact_name?: string | null;
          contact_email?: string | null;
          contact_phone?: string | null;
          city?: string | null;
          address?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          entry_lanes?: number | null;
          exit_lanes?: number | null;
          status?: Database["public"]["Enums"]["project_status"];
          start_date?: string | null;
          target_live?: string | null;
          actual_live?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["projects"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: {
      link_vehicle: {
        Args: {
          p_plate: string;
          p_phone?: string | null;
          p_push?: Json | null;
          p_vehicle_type?: Database["public"]["Enums"]["vehicle_type"] | null;
        };
        Returns: string;
      };
    };
    Enums: {
      lane_type: "entry" | "exit";
      lane_status: "online" | "offline" | "maintenance" | "disabled";
      vehicle_type: "car" | "motorcycle";
      payment_method: "cash" | "qris" | "ewallet" | "card" | "member" | "free";
      payment_status:
        | "pending"
        | "paid"
        | "failed"
        | "expired"
        | "refunded"
        | "cancelled";
      session_status: "active" | "completed" | "cancelled" | "abandoned";
      plate_rule_type: "whitelist" | "blacklist" | "vip";
      user_role: "admin" | "operator" | "viewer";
      lead_source:
        | "website"
        | "referral"
        | "cold_call"
        | "event"
        | "partner"
        | "social_media"
        | "other";
      lead_status: "new" | "contacted" | "qualified" | "converted" | "lost";
      current_system_type:
        | "manual"
        | "barrier_gate"
        | "ticket_dispenser"
        | "rfid"
        | "competitor"
        | "none"
        | "other";
      project_status:
        | "planning"
        | "procurement"
        | "installation"
        | "testing"
        | "live"
        | "maintenance"
        | "cancelled";
    };
    CompositeTypes: { [_ in never]: never };
  };
}
