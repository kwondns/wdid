import { FutureType } from '@/types';

export type Database = {
  timeline: {
    Tables: {
      future: {
        Row: {
          box_id: string;
          checked: boolean;
          content: string;
          created_at: string;
          id: string;
          updated_at: string;
        };
        Insert: {
          box_id: string;
          checked?: boolean;
          content?: string;
          created_at?: string;
          id?: string;
          updated_at?: string;
        };
        Update: {
          box_id?: string;
          checked?: boolean;
          content?: string;
          created_at?: string;
          id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'future_box_id_fkey';
            columns: ['box_id'];
            isOneToOne: false;
            referencedRelation: 'future_box';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'future_box_id_fkey';
            columns: ['box_id'];
            isOneToOne: false;
            referencedRelation: 'future_high_view';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'future_box_id_fkey';
            columns: ['box_id'];
            isOneToOne: false;
            referencedRelation: 'future_low_view';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'future_box_id_fkey';
            columns: ['box_id'];
            isOneToOne: false;
            referencedRelation: 'future_middle_view';
            referencedColumns: ['id'];
          },
        ];
      };
      future_box: {
        Row: {
          created_at: string;
          id: string;
          priority: number;
          title: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          priority?: number;
          title?: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          priority?: number;
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      past: {
        Row: {
          content: string;
          created_at: string;
          endTime: string;
          id: string;
          startTime: string;
          title: string;
          updated_at: string;
        };
        Insert: {
          content?: string;
          created_at?: string;
          endTime?: string;
          id?: string;
          startTime?: string;
          title?: string;
          updated_at?: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          endTime?: string;
          id?: string;
          startTime?: string;
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      past_count: {
        Row: {
          count: number;
          date: string;
          id: string;
        };
        Insert: {
          count?: number;
          date: string;
          id?: string;
        };
        Update: {
          count?: number;
          date?: string;
          id?: string;
        };
        Relationships: [];
      };
      present: {
        Row: {
          content: string;
          endTime: string;
          id: number;
          startTime: string;
          title: string;
        };
        Insert: {
          content?: string;
          endTime?: string;
          id?: number;
          startTime?: string;
          title?: string;
        };
        Update: {
          content?: string;
          endTime?: string;
          id?: number;
          startTime?: string;
          title?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      future_high_view: {
        Row: {
          created_at: string;
          futures: FutureType.FutureType[] | null;
          id: string;
          priority: 1;
          title: string;
          updated_at: string;
        };
        Relationships: [];
      };
      future_low_view: {
        Row: {
          created_at: string;
          futures: FutureType.FutureType[] | null;
          id: string;
          priority: 3;
          title: string;
          updated_at: string;
        };
        Relationships: [];
      };
      future_middle_view: {
        Row: {
          created_at: string;
          futures: FutureType.FutureType[] | null;
          id: string;
          priority: 2;
          title: string;
          updated_at: string;
        };
        Relationships: [];
      };
      past_count_view: {
        Row: {
          count: number;
          date: string;
          id: string;
          titles: string[] | null;
          titles_count: number;
        };
        Relationships: [];
      };
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
};
