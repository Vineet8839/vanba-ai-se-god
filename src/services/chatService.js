import { supabase } from '../lib/supabase';

class ChatService {
  async getUserConversations(userId) {
    try {
      const { data, error } = await supabase?.from('chat_conversations')?.select('*')?.eq('user_id', userId)?.order('updated_at', { ascending: false })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: [], error: error?.message };
    }
  }

  async getConversationMessages(conversationId) {
    try {
      const { data, error } = await supabase?.from('chat_messages')?.select('*')?.eq('conversation_id', conversationId)?.order('created_at', { ascending: true })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: [], error: error?.message };
    }
  }

  async createConversation(userId, title, primaryEmotion = 'hope', spiritualContext = 'universal', language = 'en') {
    try {
      const { data, error } = await supabase?.from('chat_conversations')?.insert({
          user_id: userId,
          title,
          primary_emotion: primaryEmotion,
          spiritual_context: spiritualContext,
          language: language
        })?.select()?.single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error?.message };
    }
  }

  async sendMessage(conversationId, messageType, content, scriptureReference = null, emotionDetected = null, language = 'en') {
    try {
      const { data, error } = await supabase?.from('chat_messages')?.insert({
          conversation_id: conversationId,
          message_type: messageType,
          content,
          scripture_reference: scriptureReference,
          emotion_detected: emotionDetected,
          language: language
        })?.select()?.single()

      if (error) throw error

      // Update conversation's updated_at timestamp
      await this.updateConversationTimestamp(conversationId)
      
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error?.message };
    }
  }

  async updateConversationTimestamp(conversationId) {
    try {
      const { error } = await supabase?.from('chat_conversations')?.update({ updated_at: new Date()?.toISOString() })?.eq('id', conversationId)

      if (error) throw error
    } catch (error) {
      // Silent fail for timestamp update
    }
  }

  async updateConversationTitle(conversationId, title) {
    try {
      const { data, error } = await supabase?.from('chat_conversations')?.update({ title })?.eq('id', conversationId)?.select()?.single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error?.message };
    }
  }

  async deleteConversation(conversationId) {
    try {
      const { error } = await supabase?.from('chat_conversations')?.delete()?.eq('id', conversationId)

      if (error) throw error
      return { error: null }
    } catch (error) {
      return { error: error?.message };
    }
  }

  async getSpiritualKnowledge(tradition = null, emotionRelevance = null, limit = 10) {
    try {
      let query = supabase?.from('spiritual_knowledge_base')?.select('*')?.eq('is_active', true)

      if (tradition && tradition !== 'all_traditions') {
        query = query?.eq('tradition', tradition)
      }

      if (emotionRelevance) {
        query = query?.contains('emotion_relevance', [emotionRelevance])
      }

      const { data, error } = await query?.limit(limit)?.order('created_at', { ascending: false })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: [], error: error?.message };
    }
  }

  async searchSpiritualContent(searchTerm, tradition = null, language = 'en') {
    try {
      let query = supabase?.from('spiritual_knowledge_base')?.select('*')?.eq('is_active', true)?.eq('language', language)

      if (tradition && tradition !== 'all_traditions') {
        query = query?.eq('tradition', tradition)
      }

      // Search in translation text and context tags
      query = query?.or(`translation_text.ilike.%${searchTerm}%,context_tags.cs.{${searchTerm}}`)

      const { data, error } = await query?.limit(20)?.order('created_at', { ascending: false })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: [], error: error?.message };
    }
  }

  // Real-time subscription for new messages in conversation
  subscribeToMessages(conversationId, callback) {
    const channel = supabase?.channel(`conversation-${conversationId}`)?.on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `conversation_id=eq.${conversationId}`
        },
        (payload) => {
          callback?.(payload?.new)
        }
      )?.subscribe()

    return () => supabase?.removeChannel(channel);
  }
}

export const chatService = new ChatService()