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
      personnel: {
        Row: {
          created_at: string;
          email: string;
          id: string;
          role: string | null;
          name: string;
        };
        Insert: {
          created_at?: string;
          email: string;
          id?: string;
          role?: string | null;
          name: string;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: string;
          role?: string | null;
          name?: string;
        };
      };
      project: {
        Row: {
          created_at: string | null;
          desc: string | null;
          id: number;
          name: string;
        };
        Insert: {
          created_at?: string | null;
          desc?: string | null;
          id?: number;
          name: string;
        };
        Update: {
          created_at?: string | null;
          desc?: string | null;
          id?: number;
          name?: string;
        };
      };
      project_details: {
        Row: {
          id: number;
          personnel_id: string | null;
          project_id: number;
          ticket_id: string | null;
        };
        Insert: {
          id?: number;
          personnel_id?: string | null;
          project_id: number;
          ticket_id?: string | null;
        };
        Update: {
          id?: number;
          personnel_id?: string | null;
          project_id?: number;
          ticket_id?: string | null;
        };
      };
      roles: {
        Row: {
          id: number;
          name: string;
        };
        Insert: {
          id?: number;
          name: string;
        };
        Update: {
          id?: number;
          name?: string;
        };
      };
      ticket: {
        Row: {
          assigned_developer: string | null;
          created_at: string;
          id: string;
          project_id: number;
          submitter: string;
          ticket_desc: string | null;
          ticket_priority: number;
          ticket_status: number;
          ticket_title: string;
          ticket_type: number;
          updated: string;
        };
        Insert: {
          assigned_developer?: string | null;
          created_at?: string;
          id?: string;
          project_id: number;
          submitter: string;
          ticket_desc?: string | null;
          ticket_priority: number;
          ticket_status: number;
          ticket_title: string;
          ticket_type: number;
          updated?: string;
        };
        Update: {
          assigned_developer?: string | null;
          created_at?: string;
          id?: string;
          project_id?: number;
          submitter?: string;
          ticket_desc?: string | null;
          ticket_priority?: number;
          ticket_status?: number;
          ticket_title?: string;
          ticket_type?: number;
          updated?: string;
        };
      };
      ticket_attachments: {
        Row: {
          created_at: string;
          file: string;
          id: string;
          notes: string | null;
          uploader: string;
        };
        Insert: {
          created_at?: string;
          file: string;
          id?: string;
          notes?: string | null;
          uploader: string;
        };
        Update: {
          created_at?: string;
          file?: string;
          id?: string;
          notes?: string | null;
          uploader?: string;
        };
      };
      ticket_comments: {
        Row: {
          commenter: string;
          created_at: string;
          id: string;
          message: string;
        };
        Insert: {
          commenter: string;
          created_at?: string;
          id?: string;
          message: string;
        };
        Update: {
          commenter?: string;
          created_at?: string;
          id?: string;
          message?: string;
        };
      };
      ticket_hist_att_com: {
        Row: {
          attachment_id: string | null;
          comment_id: string | null;
          history_id: string | null;
          id: number;
          ticket_id: string | null;
        };
        Insert: {
          attachment_id?: string | null;
          comment_id?: string | null;
          history_id?: string | null;
          id?: number;
          ticket_id?: string | null;
        };
        Update: {
          attachment_id?: string | null;
          comment_id?: string | null;
          history_id?: string | null;
          id?: number;
          ticket_id?: string | null;
        };
      };
      ticket_history: {
        Row: {
          date_changed: string;
          id: string;
          new_val: Json;
          old_val: Json | null;
        };
        Insert: {
          date_changed?: string;
          id?: string;
          new_val: Json;
          old_val?: Json | null;
        };
        Update: {
          date_changed?: string;
          id?: string;
          new_val?: Json;
          old_val?: Json | null;
        };
      };
      ticket_priority: {
        Row: {
          id: number;
          name: string;
        };
        Insert: {
          id?: number;
          name: string;
        };
        Update: {
          id?: number;
          name?: string;
        };
      };
      ticket_status: {
        Row: {
          desc: string;
          id: number;
        };
        Insert: {
          desc: string;
          id?: number;
        };
        Update: {
          desc?: string;
          id?: number;
        };
      };
      ticket_type: {
        Row: {
          desc: string;
          id: number;
        };
        Insert: {
          desc: string;
          id?: number;
        };
        Update: {
          desc?: string;
          id?: number;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
