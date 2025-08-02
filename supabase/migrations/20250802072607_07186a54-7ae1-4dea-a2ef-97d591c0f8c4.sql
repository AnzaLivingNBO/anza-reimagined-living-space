-- Fix function search path security warnings
ALTER FUNCTION public.update_updated_at_column() SET search_path = '';
ALTER FUNCTION public.validate_available_from() SET search_path = '';