export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
	public: {
		Tables: {
			tour_dates: {
				Row: {
					created_at: string | null;
					halfday_tour: boolean;
					id: number;
					is_canceled: boolean;
					tour_date: string | null;
					updated_at: string | null;
				};
				Insert: {
					created_at?: string | null;
					halfday_tour?: boolean;
					id?: number;
					is_canceled?: boolean;
					tour_date?: string | null;
					updated_at?: string | null;
				};
				Update: {
					created_at?: string | null;
					halfday_tour?: boolean;
					id?: number;
					is_canceled?: boolean;
					tour_date?: string | null;
					updated_at?: string | null;
				};
				Relationships: [];
			};
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
					image_data: Json | null;
					mapUrl: string | null;
					name: string | null;
					next_tour: boolean;
					pause: string | null;
					published: boolean | null;
					route: string | null;
					startPoint: string | null;
					updated_at: string | null;
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
					image_data?: Json | null;
					mapUrl?: string | null;
					name?: string | null;
					next_tour?: boolean;
					pause?: string | null;
					published?: boolean | null;
					route?: string | null;
					startPoint?: string | null;
					updated_at?: string | null;
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
					image_data?: Json | null;
					mapUrl?: string | null;
					name?: string | null;
					next_tour?: boolean;
					pause?: string | null;
					published?: boolean | null;
					route?: string | null;
					startPoint?: string | null;
					updated_at?: string | null;
				};
				Relationships: [];
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
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
	PublicTableNameOrOptions extends
		| keyof (PublicSchema['Tables'] & PublicSchema['Views'])
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
				Database[PublicTableNameOrOptions['schema']]['Views'])
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
			Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
			Row: infer R;
		}
		? R
		: never
	: PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
		? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
				Row: infer R;
			}
			? R
			: never
		: never;

export type TablesInsert<
	PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Insert: infer I;
		}
		? I
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema['Tables']
		? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
				Insert: infer I;
			}
			? I
			: never
		: never;

export type TablesUpdate<
	PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Update: infer U;
		}
		? U
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema['Tables']
		? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
				Update: infer U;
			}
			? U
			: never
		: never;

export type Enums<
	PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
	EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
		: never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
	? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
	: PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
		? PublicSchema['Enums'][PublicEnumNameOrOptions]
		: never;
