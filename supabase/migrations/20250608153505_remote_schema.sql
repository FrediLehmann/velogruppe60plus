create extension if not exists "moddatetime" with schema "extensions";


revoke delete on table "public"."touren" from "postgres";

revoke insert on table "public"."touren" from "postgres";

revoke references on table "public"."touren" from "postgres";

revoke select on table "public"."touren" from "postgres";

revoke trigger on table "public"."touren" from "postgres";

revoke truncate on table "public"."touren" from "postgres";

revoke update on table "public"."touren" from "postgres";

alter table "public"."tour_dates" add column "updated_at" timestamp with time zone;

alter table "public"."touren" add column "updated_at" timestamp with time zone;

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.tour_dates FOR EACH ROW EXECUTE FUNCTION moddatetime('updated_at');

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.touren FOR EACH ROW EXECUTE FUNCTION moddatetime('updated_at');


