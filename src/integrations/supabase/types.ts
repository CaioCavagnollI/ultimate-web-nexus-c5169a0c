export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      ai_memory: {
        Row: {
          category: string
          confidence: number | null
          created_at: string
          id: string
          key: string
          source: string | null
          updated_at: string
          user_id: string
          value: Json
        }
        Insert: {
          category: string
          confidence?: number | null
          created_at?: string
          id?: string
          key: string
          source?: string | null
          updated_at?: string
          user_id: string
          value: Json
        }
        Update: {
          category?: string
          confidence?: number | null
          created_at?: string
          id?: string
          key?: string
          source?: string | null
          updated_at?: string
          user_id?: string
          value?: Json
        }
        Relationships: []
      }
      ai_prescription_suggestions: {
        Row: {
          accepted: boolean | null
          anamnesis_id: string | null
          client_id: string | null
          created_at: string
          id: string
          input_snapshot: Json
          prescription_id: string | null
          rationale: string | null
          suggestion: Json
          user_id: string
        }
        Insert: {
          accepted?: boolean | null
          anamnesis_id?: string | null
          client_id?: string | null
          created_at?: string
          id?: string
          input_snapshot?: Json
          prescription_id?: string | null
          rationale?: string | null
          suggestion?: Json
          user_id: string
        }
        Update: {
          accepted?: boolean | null
          anamnesis_id?: string | null
          client_id?: string | null
          created_at?: string
          id?: string
          input_snapshot?: Json
          prescription_id?: string | null
          rationale?: string | null
          suggestion?: Json
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_prescription_suggestions_anamnesis_id_fkey"
            columns: ["anamnesis_id"]
            isOneToOne: false
            referencedRelation: "anamneses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_prescription_suggestions_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_prescription_suggestions_prescription_id_fkey"
            columns: ["prescription_id"]
            isOneToOne: false
            referencedRelation: "prescriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_usage_logs: {
        Row: {
          conversation_id: string | null
          created_at: string
          id: string
          metadata: Json | null
          mode: string
          request_count: number | null
          tokens_input: number | null
          tokens_output: number | null
          user_id: string
        }
        Insert: {
          conversation_id?: string | null
          created_at?: string
          id?: string
          metadata?: Json | null
          mode: string
          request_count?: number | null
          tokens_input?: number | null
          tokens_output?: number | null
          user_id: string
        }
        Update: {
          conversation_id?: string | null
          created_at?: string
          id?: string
          metadata?: Json | null
          mode?: string
          request_count?: number | null
          tokens_input?: number | null
          tokens_output?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_usage_logs_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      anamneses: {
        Row: {
          client_id: string | null
          created_at: string
          data: Json
          id: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          client_id?: string | null
          created_at?: string
          data?: Json
          id?: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          client_id?: string | null
          created_at?: string
          data?: Json
          id?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "anamneses_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      article_analyses: {
        Row: {
          abstract: string | null
          created_at: string
          doi: string | null
          evidence_level: string | null
          id: string
          limitations: string | null
          metadata: Json | null
          practical_application: string | null
          research_source_id: string | null
          risk_of_bias: string | null
          summary_practical: string | null
          summary_technical: string | null
          title: string | null
          user_id: string
        }
        Insert: {
          abstract?: string | null
          created_at?: string
          doi?: string | null
          evidence_level?: string | null
          id?: string
          limitations?: string | null
          metadata?: Json | null
          practical_application?: string | null
          research_source_id?: string | null
          risk_of_bias?: string | null
          summary_practical?: string | null
          summary_technical?: string | null
          title?: string | null
          user_id: string
        }
        Update: {
          abstract?: string | null
          created_at?: string
          doi?: string | null
          evidence_level?: string | null
          id?: string
          limitations?: string | null
          metadata?: Json | null
          practical_application?: string | null
          research_source_id?: string | null
          risk_of_bias?: string | null
          summary_practical?: string | null
          summary_technical?: string | null
          title?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "article_analyses_research_source_id_fkey"
            columns: ["research_source_id"]
            isOneToOne: false
            referencedRelation: "research_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      billing_events: {
        Row: {
          created_at: string
          event_type: string
          id: string
          payload: Json
          processed: boolean | null
          stripe_event_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          event_type: string
          id?: string
          payload: Json
          processed?: boolean | null
          stripe_event_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          event_type?: string
          id?: string
          payload?: Json
          processed?: boolean | null
          stripe_event_id?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      clients: {
        Row: {
          birth_date: string | null
          created_at: string
          email: string | null
          id: string
          name: string
          notes: string | null
          phone: string | null
          sex: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          birth_date?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name: string
          notes?: string | null
          phone?: string | null
          sex?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          birth_date?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          notes?: string | null
          phone?: string | null
          sex?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      conversations: {
        Row: {
          created_at: string
          id: string
          metadata: Json | null
          mode: string
          related_client_id: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          metadata?: Json | null
          mode?: string
          related_client_id?: string | null
          title?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          metadata?: Json | null
          mode?: string
          related_client_id?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversations_related_client_id_fkey"
            columns: ["related_client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      creator_commissions: {
        Row: {
          commission_amount: number
          commission_rate: number
          created_at: string
          creator_user_id: string
          gross_amount: number
          id: string
          product_id: string | null
          purchase_id: string | null
          status: string | null
        }
        Insert: {
          commission_amount: number
          commission_rate?: number
          created_at?: string
          creator_user_id: string
          gross_amount: number
          id?: string
          product_id?: string | null
          purchase_id?: string | null
          status?: string | null
        }
        Update: {
          commission_amount?: number
          commission_rate?: number
          created_at?: string
          creator_user_id?: string
          gross_amount?: number
          id?: string
          product_id?: string | null
          purchase_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "creator_commissions_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "store_products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "creator_commissions_purchase_id_fkey"
            columns: ["purchase_id"]
            isOneToOne: false
            referencedRelation: "store_purchases"
            referencedColumns: ["id"]
          },
        ]
      }
      library_items: {
        Row: {
          bundle_id: string | null
          created_at: string
          id: string
          product_id: string | null
          source: string
          user_id: string
        }
        Insert: {
          bundle_id?: string | null
          created_at?: string
          id?: string
          product_id?: string | null
          source?: string
          user_id: string
        }
        Update: {
          bundle_id?: string | null
          created_at?: string
          id?: string
          product_id?: string | null
          source?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "library_items_bundle_id_fkey"
            columns: ["bundle_id"]
            isOneToOne: false
            referencedRelation: "store_bundles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "library_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "store_products"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          metadata: Json | null
          role: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          metadata?: Json | null
          role?: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          metadata?: Json | null
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          currency: string | null
          id: string
          metadata: Json | null
          status: string | null
          stripe_invoice_id: string | null
          stripe_payment_intent_id: string | null
          subscription_id: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string | null
          id?: string
          metadata?: Json | null
          status?: string | null
          stripe_invoice_id?: string | null
          stripe_payment_intent_id?: string | null
          subscription_id?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string | null
          id?: string
          metadata?: Json | null
          status?: string | null
          stripe_invoice_id?: string | null
          stripe_payment_intent_id?: string | null
          subscription_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      plans: {
        Row: {
          active: boolean | null
          code: string | null
          created_at: string
          features: Json | null
          id: string
          interval: string
          name: string
          price: number
          stripe_price_id: string | null
        }
        Insert: {
          active?: boolean | null
          code?: string | null
          created_at?: string
          features?: Json | null
          id?: string
          interval?: string
          name: string
          price?: number
          stripe_price_id?: string | null
        }
        Update: {
          active?: boolean | null
          code?: string | null
          created_at?: string
          features?: Json | null
          id?: string
          interval?: string
          name?: string
          price?: number
          stripe_price_id?: string | null
        }
        Relationships: []
      }
      prescription_exercises: {
        Row: {
          day_label: string | null
          id: string
          load: string | null
          name: string
          notes: string | null
          prescription_id: string
          reps: string
          rest_seconds: number | null
          rir: string | null
          rpe: string | null
          sets: number
          sort_order: number
        }
        Insert: {
          day_label?: string | null
          id?: string
          load?: string | null
          name: string
          notes?: string | null
          prescription_id: string
          reps?: string
          rest_seconds?: number | null
          rir?: string | null
          rpe?: string | null
          sets?: number
          sort_order?: number
        }
        Update: {
          day_label?: string | null
          id?: string
          load?: string | null
          name?: string
          notes?: string | null
          prescription_id?: string
          reps?: string
          rest_seconds?: number | null
          rir?: string | null
          rpe?: string | null
          sets?: number
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "prescription_exercises_prescription_id_fkey"
            columns: ["prescription_id"]
            isOneToOne: false
            referencedRelation: "prescriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      prescriptions: {
        Row: {
          anamnesis_id: string | null
          client_id: string | null
          created_at: string
          duration_weeks: number | null
          frequency_per_week: number | null
          id: string
          notes: string | null
          split: string | null
          status: string
          title: string
          updated_at: string
          user_id: string
          version: number
        }
        Insert: {
          anamnesis_id?: string | null
          client_id?: string | null
          created_at?: string
          duration_weeks?: number | null
          frequency_per_week?: number | null
          id?: string
          notes?: string | null
          split?: string | null
          status?: string
          title?: string
          updated_at?: string
          user_id: string
          version?: number
        }
        Update: {
          anamnesis_id?: string | null
          client_id?: string | null
          created_at?: string
          duration_weeks?: number | null
          frequency_per_week?: number | null
          id?: string
          notes?: string | null
          split?: string | null
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "prescriptions_anamnesis_id_fkey"
            columns: ["anamnesis_id"]
            isOneToOne: false
            referencedRelation: "anamneses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prescriptions_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          id: string
          plan: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          plan?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          plan?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      research_chunks: {
        Row: {
          chunk_index: number
          content: string
          created_at: string
          document_id: string
          embedding: Json | null
          id: string
          metadata: Json | null
          user_id: string | null
        }
        Insert: {
          chunk_index: number
          content: string
          created_at?: string
          document_id: string
          embedding?: Json | null
          id?: string
          metadata?: Json | null
          user_id?: string | null
        }
        Update: {
          chunk_index?: number
          content?: string
          created_at?: string
          document_id?: string
          embedding?: Json | null
          id?: string
          metadata?: Json | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "research_chunks_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "research_documents"
            referencedColumns: ["id"]
          },
        ]
      }
      research_citations: {
        Row: {
          chunk_id: string | null
          citation_text: string | null
          created_at: string
          document_id: string | null
          doi: string | null
          id: string
          metadata: Json | null
          research_query_id: string
          source_id: string | null
          source_title: string | null
          source_url: string | null
        }
        Insert: {
          chunk_id?: string | null
          citation_text?: string | null
          created_at?: string
          document_id?: string | null
          doi?: string | null
          id?: string
          metadata?: Json | null
          research_query_id: string
          source_id?: string | null
          source_title?: string | null
          source_url?: string | null
        }
        Update: {
          chunk_id?: string | null
          citation_text?: string | null
          created_at?: string
          document_id?: string | null
          doi?: string | null
          id?: string
          metadata?: Json | null
          research_query_id?: string
          source_id?: string | null
          source_title?: string | null
          source_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "research_citations_chunk_id_fkey"
            columns: ["chunk_id"]
            isOneToOne: false
            referencedRelation: "research_chunks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "research_citations_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "research_documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "research_citations_research_query_id_fkey"
            columns: ["research_query_id"]
            isOneToOne: false
            referencedRelation: "research_queries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "research_citations_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "research_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      research_documents: {
        Row: {
          created_at: string
          document_type: string | null
          full_text: string | null
          id: string
          metadata: Json | null
          source_id: string
          summary: string | null
          title: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          document_type?: string | null
          full_text?: string | null
          id?: string
          metadata?: Json | null
          source_id: string
          summary?: string | null
          title: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          document_type?: string | null
          full_text?: string | null
          id?: string
          metadata?: Json | null
          source_id?: string
          summary?: string | null
          title?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "research_documents_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "research_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      research_queries: {
        Row: {
          answer: string | null
          conversation_id: string | null
          created_at: string
          id: string
          metadata: Json | null
          mode: string | null
          query: string
          user_id: string
        }
        Insert: {
          answer?: string | null
          conversation_id?: string | null
          created_at?: string
          id?: string
          metadata?: Json | null
          mode?: string | null
          query: string
          user_id: string
        }
        Update: {
          answer?: string | null
          conversation_id?: string | null
          created_at?: string
          id?: string
          metadata?: Json | null
          mode?: string | null
          query?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "research_queries_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      research_sources: {
        Row: {
          abstract: string | null
          authors: string | null
          created_at: string
          doi: string | null
          file_url: string | null
          id: string
          journal: string | null
          metadata: Json | null
          publication_year: number | null
          raw_text: string | null
          source_type: string
          source_url: string | null
          title: string | null
          user_id: string | null
        }
        Insert: {
          abstract?: string | null
          authors?: string | null
          created_at?: string
          doi?: string | null
          file_url?: string | null
          id?: string
          journal?: string | null
          metadata?: Json | null
          publication_year?: number | null
          raw_text?: string | null
          source_type: string
          source_url?: string | null
          title?: string | null
          user_id?: string | null
        }
        Update: {
          abstract?: string | null
          authors?: string | null
          created_at?: string
          doi?: string | null
          file_url?: string | null
          id?: string
          journal?: string | null
          metadata?: Json | null
          publication_year?: number | null
          raw_text?: string | null
          source_type?: string
          source_url?: string | null
          title?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      scanner_results: {
        Row: {
          classification: string | null
          confidence: number | null
          created_at: string
          equipment_name: string | null
          exercises: string[] | null
          id: string
          image_url: string | null
          metadata: Json | null
          muscles: string[] | null
          related_client_id: string | null
          source: string | null
          user_id: string
        }
        Insert: {
          classification?: string | null
          confidence?: number | null
          created_at?: string
          equipment_name?: string | null
          exercises?: string[] | null
          id?: string
          image_url?: string | null
          metadata?: Json | null
          muscles?: string[] | null
          related_client_id?: string | null
          source?: string | null
          user_id: string
        }
        Update: {
          classification?: string | null
          confidence?: number | null
          created_at?: string
          equipment_name?: string | null
          exercises?: string[] | null
          id?: string
          image_url?: string | null
          metadata?: Json | null
          muscles?: string[] | null
          related_client_id?: string | null
          source?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "scanner_results_related_client_id_fkey"
            columns: ["related_client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      session_sets: {
        Row: {
          completed: boolean
          exercise_name: string
          id: string
          load_kg: number | null
          reps: number | null
          rir: number | null
          rpe: number | null
          session_id: string
          set_number: number
        }
        Insert: {
          completed?: boolean
          exercise_name: string
          id?: string
          load_kg?: number | null
          reps?: number | null
          rir?: number | null
          rpe?: number | null
          session_id: string
          set_number?: number
        }
        Update: {
          completed?: boolean
          exercise_name?: string
          id?: string
          load_kg?: number | null
          reps?: number | null
          rir?: number | null
          rpe?: number | null
          session_id?: string
          set_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "session_sets_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "training_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      store_bundle_items: {
        Row: {
          bundle_id: string
          id: string
          product_id: string
        }
        Insert: {
          bundle_id: string
          id?: string
          product_id: string
        }
        Update: {
          bundle_id?: string
          id?: string
          product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "store_bundle_items_bundle_id_fkey"
            columns: ["bundle_id"]
            isOneToOne: false
            referencedRelation: "store_bundles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "store_bundle_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "store_products"
            referencedColumns: ["id"]
          },
        ]
      }
      store_bundles: {
        Row: {
          created_at: string
          description: string | null
          id: string
          price: number
          status: string | null
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          price?: number
          status?: string | null
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          price?: number
          status?: string | null
          title?: string
        }
        Relationships: []
      }
      store_products: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          cover_url: string | null
          created_at: string
          description: string | null
          file_url: string | null
          id: string
          metadata: Json | null
          price: number
          status: string
          title: string
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          cover_url?: string | null
          created_at?: string
          description?: string | null
          file_url?: string | null
          id?: string
          metadata?: Json | null
          price?: number
          status?: string
          title: string
          type?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          cover_url?: string | null
          created_at?: string
          description?: string | null
          file_url?: string | null
          id?: string
          metadata?: Json | null
          price?: number
          status?: string
          title?: string
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      store_purchases: {
        Row: {
          created_at: string
          id: string
          metadata: Json | null
          payment_id: string | null
          price_paid: number
          product_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          metadata?: Json | null
          payment_id?: string | null
          price_paid: number
          product_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          metadata?: Json | null
          payment_id?: string | null
          price_paid?: number
          product_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "store_purchases_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "store_products"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          amount: number | null
          cancel_at_period_end: boolean | null
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          expires_at: string | null
          id: string
          interval: string | null
          plan_id: string | null
          status: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          user_id: string
        }
        Insert: {
          amount?: number | null
          cancel_at_period_end?: boolean | null
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          expires_at?: string | null
          id?: string
          interval?: string | null
          plan_id?: string | null
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          user_id: string
        }
        Update: {
          amount?: number | null
          cancel_at_period_end?: boolean | null
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          expires_at?: string | null
          id?: string
          interval?: string | null
          plan_id?: string | null
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
        ]
      }
      training_sessions: {
        Row: {
          client_id: string | null
          created_at: string
          date: string
          duration_minutes: number | null
          id: string
          notes: string | null
          prescription_id: string | null
          status: string
          user_id: string
        }
        Insert: {
          client_id?: string | null
          created_at?: string
          date?: string
          duration_minutes?: number | null
          id?: string
          notes?: string | null
          prescription_id?: string | null
          status?: string
          user_id: string
        }
        Update: {
          client_id?: string | null
          created_at?: string
          date?: string
          duration_minutes?: number | null
          id?: string
          notes?: string | null
          prescription_id?: string | null
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "training_sessions_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "training_sessions_prescription_id_fkey"
            columns: ["prescription_id"]
            isOneToOne: false
            referencedRelation: "prescriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
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
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
