-- =========================================
-- MIGRATION METADATA
-- =========================================
-- File: 20250808103955_vanba_spiritual_ai_complete_schema.sql
-- Purpose: Complete spiritual AI advisor schema with authentication and chat system
-- Schema State: FRESH_PROJECT
-- Dependencies: None (fresh installation)
-- Module: Spiritual AI Advisor with Authentication and User Management
-- Tables Created: user_profiles, spiritual_preferences, chat_conversations, chat_messages, spiritual_knowledge_base, user_analytics
-- Tables Modified: None
-- RLS Policies: 12 policies created
-- Functions Created: handle_new_user, get_user_chat_stats, cleanup_test_data
-- Mock Data: Yes - Complete spiritual AI test data
-- =========================================

-- 1. Types and Core Tables
CREATE TYPE public.user_role AS ENUM ('admin', 'moderator', 'user');
CREATE TYPE public.language_code AS ENUM (
    'en', 'hi', 'mr', 'ta', 'te', 'bn', 'gu', 'pa', 'ur', 
    'ar', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ko'
);
CREATE TYPE public.spiritual_tradition AS ENUM (
    'hinduism', 'islam', 'christianity', 'buddhism', 'sikhism', 
    'jainism', 'judaism', 'universal', 'all_traditions'
);
CREATE TYPE public.emotion_category AS ENUM (
    'sadness', 'anxiety', 'confusion', 'anger', 'fear', 
    'loneliness', 'depression', 'stress', 'hope', 'peace', 'gratitude'
);
CREATE TYPE public.message_type AS ENUM ('user', 'assistant', 'system');

-- Critical intermediary table
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    role public.user_role DEFAULT 'user'::public.user_role,
    preferred_language public.language_code DEFAULT 'en'::public.language_code,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Spiritual preferences for personalized guidance
CREATE TABLE public.spiritual_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    preferred_traditions public.spiritual_tradition[] DEFAULT ARRAY['universal']::public.spiritual_tradition[],
    meditation_practice BOOLEAN DEFAULT false,
    prayer_practice BOOLEAN DEFAULT false,
    study_practice BOOLEAN DEFAULT false,
    guidance_frequency TEXT DEFAULT 'as_needed',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Chat conversations for spiritual guidance
CREATE TABLE public.chat_conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL DEFAULT 'Spiritual Guidance Session',
    primary_emotion public.emotion_category,
    spiritual_context public.spiritual_tradition DEFAULT 'universal'::public.spiritual_tradition,
    language public.language_code DEFAULT 'en'::public.language_code,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Individual chat messages
CREATE TABLE public.chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID REFERENCES public.chat_conversations(id) ON DELETE CASCADE,
    message_type public.message_type NOT NULL,
    content TEXT NOT NULL,
    scripture_reference TEXT,
    language public.language_code DEFAULT 'en'::public.language_code,
    emotion_detected public.emotion_category,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Spiritual knowledge base for AI responses
CREATE TABLE public.spiritual_knowledge_base (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tradition public.spiritual_tradition NOT NULL,
    scripture_name TEXT NOT NULL,
    chapter_verse TEXT,
    original_text TEXT NOT NULL,
    translation_text TEXT NOT NULL,
    language public.language_code NOT NULL,
    context_tags TEXT[],
    emotion_relevance public.emotion_category[],
    created_by UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- User analytics for admin dashboard
CREATE TABLE public.user_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    session_date DATE DEFAULT CURRENT_DATE,
    conversations_count INTEGER DEFAULT 0,
    messages_count INTEGER DEFAULT 0,
    primary_emotions public.emotion_category[],
    languages_used public.language_code[],
    traditions_explored public.spiritual_tradition[],
    session_duration_minutes INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 2. Essential Indexes
CREATE INDEX idx_user_profiles_user_id ON public.user_profiles(id);
CREATE INDEX idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX idx_spiritual_preferences_user_id ON public.spiritual_preferences(user_id);
CREATE INDEX idx_chat_conversations_user_id ON public.chat_conversations(user_id);
CREATE INDEX idx_chat_conversations_created_at ON public.chat_conversations(created_at DESC);
CREATE INDEX idx_chat_messages_conversation_id ON public.chat_messages(conversation_id);
CREATE INDEX idx_chat_messages_created_at ON public.chat_messages(created_at DESC);
CREATE INDEX idx_spiritual_knowledge_tradition ON public.spiritual_knowledge_base(tradition);
CREATE INDEX idx_spiritual_knowledge_language ON public.spiritual_knowledge_base(language);
CREATE INDEX idx_user_analytics_user_id ON public.user_analytics(user_id);
CREATE INDEX idx_user_analytics_session_date ON public.user_analytics(session_date DESC);

-- 3. RLS Setup
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.spiritual_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.spiritual_knowledge_base ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_analytics ENABLE ROW LEVEL SECURITY;

-- 4. Helper Functions (MUST BE BEFORE RLS POLICIES)
CREATE OR REPLACE FUNCTION public.is_admin_from_auth()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM auth.users au
    WHERE au.id = auth.uid() 
    AND (au.raw_user_meta_data->>'role' = 'admin' 
         OR au.raw_app_meta_data->>'role' = 'admin')
)
$$;

CREATE OR REPLACE FUNCTION public.get_user_chat_stats(target_user_id UUID)
RETURNS TABLE(
    total_conversations BIGINT,
    total_messages BIGINT,
    most_used_language TEXT,
    primary_emotions TEXT[]
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    SELECT
        COUNT(DISTINCT cc.id)::BIGINT,
        COUNT(cm.id)::BIGINT,
        COALESCE(
            (SELECT cc2.language::TEXT 
             FROM public.chat_conversations cc2 
             WHERE cc2.user_id = target_user_id 
             GROUP BY cc2.language 
             ORDER BY COUNT(*) DESC 
             LIMIT 1), 
            'en'::TEXT
        ),
        ARRAY_AGG(DISTINCT cc.primary_emotion::TEXT) FILTER (WHERE cc.primary_emotion IS NOT NULL)
    FROM public.chat_conversations cc
    LEFT JOIN public.chat_messages cm ON cc.id = cm.conversation_id
    WHERE cc.user_id = target_user_id;
EXCEPTION
    WHEN OTHERS THEN
        RETURN QUERY SELECT 0::BIGINT, 0::BIGINT, 'en'::TEXT, ARRAY[]::TEXT[];
END;
$$;

-- 5. RLS POLICIES (Using corrected patterns)

-- Pattern 1: Core user table (user_profiles) - Simple only, no functions
CREATE POLICY "users_manage_own_user_profiles"
ON public.user_profiles
FOR ALL
TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

-- Admin access using auth metadata
CREATE POLICY "admin_full_access_user_profiles"
ON public.user_profiles
FOR ALL
TO authenticated
USING (public.is_admin_from_auth())
WITH CHECK (public.is_admin_from_auth());

-- Pattern 2: Simple user ownership for spiritual preferences
CREATE POLICY "users_manage_own_spiritual_preferences"
ON public.spiritual_preferences
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Pattern 2: Simple user ownership for chat conversations
CREATE POLICY "users_manage_own_chat_conversations"
ON public.chat_conversations
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Admin access to all conversations
CREATE POLICY "admin_access_all_chat_conversations"
ON public.chat_conversations
FOR ALL
TO authenticated
USING (public.is_admin_from_auth())
WITH CHECK (public.is_admin_from_auth());

-- Chat messages - users access own conversation messages
CREATE POLICY "users_access_own_chat_messages"
ON public.chat_messages
FOR ALL
TO authenticated
USING (
    conversation_id IN (
        SELECT id FROM public.chat_conversations 
        WHERE user_id = auth.uid()
    )
)
WITH CHECK (
    conversation_id IN (
        SELECT id FROM public.chat_conversations 
        WHERE user_id = auth.uid()
    )
);

-- Pattern 4: Public read, private write for spiritual knowledge base
CREATE POLICY "public_can_read_spiritual_knowledge"
ON public.spiritual_knowledge_base
FOR SELECT
TO public
USING (is_active = true);

CREATE POLICY "admins_manage_spiritual_knowledge"
ON public.spiritual_knowledge_base
FOR ALL
TO authenticated
USING (public.is_admin_from_auth())
WITH CHECK (public.is_admin_from_auth());

-- Pattern 2: Simple user ownership for user analytics
CREATE POLICY "users_view_own_analytics"
ON public.user_analytics
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "admin_full_access_analytics"
ON public.user_analytics
FOR ALL
TO authenticated
USING (public.is_admin_from_auth())
WITH CHECK (public.is_admin_from_auth());

-- 6. Functions for automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO public.user_profiles (id, email, full_name, role)
    VALUES (
        NEW.id, 
        NEW.email, 
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
        COALESCE(NEW.raw_user_meta_data->>'role', 'user')::public.user_role
    );
    
    -- Create default spiritual preferences
    INSERT INTO public.spiritual_preferences (user_id, preferred_traditions)
    VALUES (NEW.id, ARRAY['universal']::public.spiritual_tradition[]);
    
    RETURN NEW;
END;
$$;

-- 7. Trigger for new user creation
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 8. Complete Mock Data
DO $$
DECLARE
    admin_uuid UUID := gen_random_uuid();
    user_uuid UUID := gen_random_uuid();
    conversation1_uuid UUID := gen_random_uuid();
    conversation2_uuid UUID := gen_random_uuid();
    knowledge1_uuid UUID := gen_random_uuid();
    knowledge2_uuid UUID := gen_random_uuid();
BEGIN
    -- Create auth users with required fields
    INSERT INTO auth.users (
        id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
        created_at, updated_at, raw_user_meta_data, raw_app_meta_data,
        is_sso_user, is_anonymous, confirmation_token, confirmation_sent_at,
        recovery_token, recovery_sent_at, email_change_token_new, email_change,
        email_change_sent_at, email_change_token_current, email_change_confirm_status,
        reauthentication_token, reauthentication_sent_at, phone, phone_change,
        phone_change_token, phone_change_sent_at
    ) VALUES
        (admin_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'admin@vanbase.ai', crypt('admin123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Vineet Pradhan", "role": "admin"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (user_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'seeker@spiritual.com', crypt('seeker123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Spiritual Seeker", "role": "user"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null);

    -- Create spiritual knowledge base entries
    INSERT INTO public.spiritual_knowledge_base (id, tradition, scripture_name, chapter_verse, original_text, translation_text, language, context_tags, emotion_relevance, created_by)
    VALUES
        (knowledge1_uuid, 'hinduism'::public.spiritual_tradition, 'Bhagavad Gita', 'Chapter 2, Verse 47', 
         'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥', 
         'You have a right to perform your prescribed duty, but not to the fruits of the work. Never consider yourself the cause of the results of your activities, and never be attached to not doing your duty.',
         'en'::public.language_code, ARRAY['duty', 'detachment', 'purpose'], 
         ARRAY['anxiety', 'confusion', 'stress']::public.emotion_category[], admin_uuid),
        (knowledge2_uuid, 'islam'::public.spiritual_tradition, 'Quran', 'Surah 2:286', 
         'لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا', 
         'Allah does not burden a soul beyond that it can bear.',
         'en'::public.language_code, ARRAY['burden', 'capacity', 'mercy'], 
         ARRAY['anxiety', 'stress', 'depression']::public.emotion_category[], admin_uuid);

    -- Create sample conversations
    INSERT INTO public.chat_conversations (id, user_id, title, primary_emotion, spiritual_context, language)
    VALUES
        (conversation1_uuid, user_uuid, 'Finding Purpose in Life', 'confusion'::public.emotion_category, 'hinduism'::public.spiritual_tradition, 'en'::public.language_code),
        (conversation2_uuid, user_uuid, 'Dealing with Anxiety', 'anxiety'::public.emotion_category, 'universal'::public.spiritual_tradition, 'en'::public.language_code);

    -- Create sample messages
    INSERT INTO public.chat_messages (conversation_id, message_type, content, scripture_reference, emotion_detected)
    VALUES
        (conversation1_uuid, 'user'::public.message_type, 'I feel lost and do not know what my purpose is in life. Can you guide me?', null, 'confusion'::public.emotion_category),
        (conversation1_uuid, 'assistant'::public.message_type, 'I understand your feelings of confusion about your purpose. The Bhagavad Gita teaches us that our duty is to act according to our nature and circumstances, without being attached to the results. Your purpose unfolds as you engage with life authentically.', 'Bhagavad Gita 2:47', 'hope'::public.emotion_category),
        (conversation2_uuid, 'user'::public.message_type, 'I have been feeling very anxious lately and cannot find peace.', null, 'anxiety'::public.emotion_category),
        (conversation2_uuid, 'assistant'::public.message_type, 'Your anxiety is understood and valid. Remember that Allah does not burden a soul beyond what it can bear. Take deep breaths, focus on what is within your control, and trust in the divine plan for your life.', 'Quran 2:286', 'peace'::public.emotion_category);

    -- Create analytics data
    INSERT INTO public.user_analytics (user_id, conversations_count, messages_count, primary_emotions, languages_used, traditions_explored, session_duration_minutes)
    VALUES
        (user_uuid, 2, 4, ARRAY['confusion', 'anxiety']::public.emotion_category[], ARRAY['en']::public.language_code[], ARRAY['hinduism', 'universal']::public.spiritual_tradition[], 45);

EXCEPTION
    WHEN foreign_key_violation THEN
        RAISE NOTICE 'Foreign key error: %', SQLERRM;
    WHEN unique_violation THEN
        RAISE NOTICE 'Unique constraint error: %', SQLERRM;
    WHEN OTHERS THEN
        RAISE NOTICE 'Unexpected error: %', SQLERRM;
END $$;

-- 9. Cleanup function for test data
CREATE OR REPLACE FUNCTION public.cleanup_test_data()
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    auth_user_ids_to_delete UUID[];
BEGIN
    -- Get test user IDs
    SELECT ARRAY_AGG(id) INTO auth_user_ids_to_delete
    FROM auth.users
    WHERE email IN ('admin@vanbase.ai', 'seeker@spiritual.com');

    -- Delete in dependency order (children first)
    DELETE FROM public.user_analytics WHERE user_id = ANY(auth_user_ids_to_delete);
    DELETE FROM public.chat_messages WHERE conversation_id IN (
        SELECT id FROM public.chat_conversations WHERE user_id = ANY(auth_user_ids_to_delete)
    );
    DELETE FROM public.chat_conversations WHERE user_id = ANY(auth_user_ids_to_delete);
    DELETE FROM public.spiritual_knowledge_base WHERE created_by = ANY(auth_user_ids_to_delete);
    DELETE FROM public.spiritual_preferences WHERE user_id = ANY(auth_user_ids_to_delete);
    DELETE FROM public.user_profiles WHERE id = ANY(auth_user_ids_to_delete);

    -- Delete auth.users last
    DELETE FROM auth.users WHERE id = ANY(auth_user_ids_to_delete);

EXCEPTION
    WHEN foreign_key_violation THEN
        RAISE NOTICE 'Foreign key constraint prevents deletion: %', SQLERRM;
    WHEN OTHERS THEN
        RAISE NOTICE 'Cleanup failed: %', SQLERRM;
END;
$$;