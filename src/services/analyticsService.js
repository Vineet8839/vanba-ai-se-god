import { supabase } from '../lib/supabase';

class AnalyticsService {
  async getUserAnalytics(userId, startDate = null, endDate = null) {
    try {
      let query = supabase?.from('user_analytics')?.select('*')?.eq('user_id', userId)

      if (startDate) {
        query = query?.gte('session_date', startDate)
      }

      if (endDate) {
        query = query?.lte('session_date', endDate)
      }

      const { data, error } = await query?.order('session_date', { ascending: false })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: [], error: error?.message };
    }
  }

  async getAllUsersAnalytics(startDate = null, endDate = null, limit = 100) {
    try {
      let query = supabase?.from('user_analytics')?.select(`
          *,
          user_profiles (
            full_name,
            email,
            preferred_language
          )
        `)

      if (startDate) {
        query = query?.gte('session_date', startDate)
      }

      if (endDate) {
        query = query?.lte('session_date', endDate)
      }

      const { data, error } = await query?.order('session_date', { ascending: false })?.limit(limit)

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: [], error: error?.message };
    }
  }

  async getEmotionTrends(startDate = null, endDate = null) {
    try {
      let query = supabase?.from('user_analytics')?.select('primary_emotions, session_date')

      if (startDate) {
        query = query?.gte('session_date', startDate)
      }

      if (endDate) {
        query = query?.lte('session_date', endDate)
      }

      const { data, error } = await query?.order('session_date', { ascending: false })

      if (error) throw error

      // Process emotion data for trends
      const emotionTrends = {}
      data?.forEach(record => {
        const date = record?.session_date
        record?.primary_emotions?.forEach(emotion => {
          if (!emotionTrends?.[emotion]) {
            emotionTrends[emotion] = {}
          }
          if (!emotionTrends?.[emotion]?.[date]) {
            emotionTrends[emotion][date] = 0
          }
          emotionTrends[emotion][date]++
        })
      })

      return { data: emotionTrends, error: null }
    } catch (error) {
      return { data: {}, error: error?.message };
    }
  }

  async getLanguageUsageStats(startDate = null, endDate = null) {
    try {
      let query = supabase?.from('user_analytics')?.select('languages_used, session_date')

      if (startDate) {
        query = query?.gte('session_date', startDate)
      }

      if (endDate) {
        query = query?.lte('session_date', endDate)
      }

      const { data, error } = await query

      if (error) throw error

      // Process language usage data
      const languageStats = {}
      data?.forEach(record => {
        record?.languages_used?.forEach(language => {
          if (!languageStats?.[language]) {
            languageStats[language] = 0
          }
          languageStats[language]++
        })
      })

      return { data: languageStats, error: null }
    } catch (error) {
      return { data: {}, error: error?.message };
    }
  }

  async getSpiritualTraditionsStats(startDate = null, endDate = null) {
    try {
      let query = supabase?.from('user_analytics')?.select('traditions_explored, session_date')

      if (startDate) {
        query = query?.gte('session_date', startDate)
      }

      if (endDate) {
        query = query?.lte('session_date', endDate)
      }

      const { data, error } = await query

      if (error) throw error

      // Process traditions data
      const traditionStats = {}
      data?.forEach(record => {
        record?.traditions_explored?.forEach(tradition => {
          if (!traditionStats?.[tradition]) {
            traditionStats[tradition] = 0
          }
          traditionStats[tradition]++
        })
      })

      return { data: traditionStats, error: null }
    } catch (error) {
      return { data: {}, error: error?.message };
    }
  }

  async getOverallStats() {
    try {
      // Get total users
      const { count: totalUsers, error: usersError } = await supabase?.from('user_profiles')?.select('*', { count: 'exact', head: true })

      if (usersError) throw usersError

      // Get total conversations
      const { count: totalConversations, error: conversationsError } = await supabase?.from('chat_conversations')?.select('*', { count: 'exact', head: true })

      if (conversationsError) throw conversationsError

      // Get total messages
      const { count: totalMessages, error: messagesError } = await supabase?.from('chat_messages')?.select('*', { count: 'exact', head: true })

      if (messagesError) throw messagesError

      // Get active users today
      const today = new Date()?.toISOString()?.split('T')?.[0]
      const { count: activeUsersToday, error: activeError } = await supabase?.from('user_analytics')?.select('*', { count: 'exact', head: true })?.eq('session_date', today)

      if (activeError) throw activeError

      return {
        data: {
          totalUsers: totalUsers || 0,
          totalConversations: totalConversations || 0,
          totalMessages: totalMessages || 0,
          activeUsersToday: activeUsersToday || 0
        },
        error: null
      }
    } catch (error) {
      return {
        data: {
          totalUsers: 0,
          totalConversations: 0,
          totalMessages: 0,
          activeUsersToday: 0
        },
        error: error?.message
      };
    }
  }

  async recordUserSession(userId, conversationsCount, messagesCount, emotions = [], languages = [], traditions = [], sessionDurationMinutes = 0) {
    try {
      const today = new Date()?.toISOString()?.split('T')?.[0]

      const { data, error } = await supabase?.from('user_analytics')?.upsert({
          user_id: userId,
          session_date: today,
          conversations_count: conversationsCount,
          messages_count: messagesCount,
          primary_emotions: emotions,
          languages_used: languages,
          traditions_explored: traditions,
          session_duration_minutes: sessionDurationMinutes,
          created_at: new Date()?.toISOString()
        })?.select()?.single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error?.message };
    }
  }
}

export const analyticsService = new AnalyticsService()