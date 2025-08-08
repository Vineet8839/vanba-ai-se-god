import { supabase } from '../lib/supabase';

class AuthService {
  async signIn(email, password) {
    try {
      const { data, error } = await supabase?.auth?.signInWithPassword({
        email,
        password
      })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error?.message };
    }
  }

  async signUp(email, password, fullName) {
    try {
      const { data, error } = await supabase?.auth?.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: 'user'
          }
        }
      })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error?.message };
    }
  }

  async signOut() {
    try {
      const { error } = await supabase?.auth?.signOut()
      if (error) throw error
      return { error: null }
    } catch (error) {
      return { error: error?.message };
    }
  }

  async getSession() {
    try {
      const { data: { session }, error } = await supabase?.auth?.getSession()
      if (error) throw error
      return { session, error: null }
    } catch (error) {
      return { session: null, error: error?.message };
    }
  }

  async getUserProfile(userId) {
    try {
      const { data, error } = await supabase?.from('user_profiles')?.select(`
          *,
          spiritual_preferences (
            preferred_traditions,
            meditation_practice,
            prayer_practice,
            study_practice,
            guidance_frequency
          )
        `)?.eq('id', userId)?.single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error?.message };
    }
  }

  async updateUserProfile(userId, updates) {
    try {
      const { data, error } = await supabase?.from('user_profiles')?.update(updates)?.eq('id', userId)?.select()?.single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error?.message };
    }
  }

  async resetPassword(email) {
    try {
      const { data, error } = await supabase?.auth?.resetPasswordForEmail(email, {
        redirectTo: `${window.location?.origin}/reset-password`
      })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error?.message };
    }
  }
}

export const authService = new AuthService()