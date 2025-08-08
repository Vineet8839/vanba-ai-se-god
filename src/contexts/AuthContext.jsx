import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Get initial session - Use Promise chain
    supabase?.auth?.getSession()?.then(({ data: { session } }) => {
        if (session?.user) {
          setUser(session?.user)
          fetchUserProfile(session?.user?.id)  // Fire-and-forget, NO AWAIT
        }
        setLoading(false)
      })?.catch(error => {
        setError('Failed to get session')
        setLoading(false)
      })

    // Listen for auth changes - NEVER ASYNC callback
    const { data: { subscription } } = supabase?.auth?.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          setUser(session?.user)
          fetchUserProfile(session?.user?.id)  // Fire-and-forget, NO AWAIT
        } else {
          setUser(null)
          setUserProfile(null)
        }
        setLoading(false)
        setError(null)
      }
    )

    return () => subscription?.unsubscribe()
  }, [])

  const fetchUserProfile = (userId) => {
    supabase?.from('user_profiles')?.select(`
        *,
        spiritual_preferences (
          preferred_traditions,
          meditation_practice,
          prayer_practice,
          study_practice,
          guidance_frequency
        )
      `)?.eq('id', userId)?.single()?.then(({ data, error }) => {
        if (error) {
          setError('Failed to fetch user profile')
          return
        }
        setUserProfile(data)
      })?.catch(error => {
        setError('Error loading user profile')
      })
  }

  const signUp = async (email, password, fullName) => {
    setError(null)
    setLoading(true)
    
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
      
      if (error) {
        setError(error?.message)
        setLoading(false)
        return { success: false, error: error?.message };
      }
      
      setLoading(false)
      return { success: true, data }
    } catch (error) {
      setError('Something went wrong during signup. Please try again.')
      setLoading(false)
      return { success: false, error: error?.message };
    }
  }

  const signIn = async (email, password) => {
    setError(null)
    setLoading(true)
    
    try {
      const { data, error } = await supabase?.auth?.signInWithPassword({
        email,
        password
      })
      
      if (error) {
        setError(error?.message)
        setLoading(false)
        return { success: false, error: error?.message };
      }
      
      setUser(data?.user)
      setLoading(false)
      return { success: true, data }
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('AuthRetryableFetchError')) {
        setError('Cannot connect to authentication service. Your Supabase project may be paused or inactive. Please check your Supabase dashboard and resume your project if needed.')
      } else {
        setError('Something went wrong during signin. Please try again.')
      }
      setLoading(false)
      return { success: false, error: error?.message };
    }
  }

  const signInWithOAuth = async (provider) => {
    setError(null)
    try {
      const { data, error } = await supabase?.auth?.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location?.origin}/main-chat-interface`
        }
      })
      
      if (error) {
        setError(error?.message)
        return { success: false, error: error?.message };
      }
      
      return { success: true, data }
    } catch (error) {
      setError('OAuth signin failed. Please try again.')
      return { success: false, error: error?.message };
    }
  }

  const signOut = async () => {
    setError(null)
    try {
      const { error } = await supabase?.auth?.signOut()
      if (error) {
        setError(error?.message)
        return { success: false, error: error?.message };
      }
      
      setUser(null)
      setUserProfile(null)
      return { success: true }
    } catch (error) {
      setError('Failed to sign out')
      return { success: false, error: error?.message };
    }
  }

  const updateProfile = async (updates) => {
    setError(null)
    if (!user) return { success: false, error: 'No user logged in' }
    
    try {
      const { data, error } = await supabase?.from('user_profiles')?.update(updates)?.eq('id', user?.id)?.select()?.single()
      
      if (error) {
        setError(error?.message)
        return { success: false, error: error?.message };
      }
      
      setUserProfile(data)
      return { success: true, data }
    } catch (error) {
      setError('Failed to update profile')
      return { success: false, error: error?.message };
    }
  }

  const updateSpiritualPreferences = async (preferences) => {
    setError(null)
    if (!user) return { success: false, error: 'No user logged in' }
    
    try {
      const { data, error } = await supabase?.from('spiritual_preferences')?.upsert({
          user_id: user?.id,
          ...preferences,
          updated_at: new Date()?.toISOString()
        })?.select()?.single()
      
      if (error) {
        setError(error?.message)
        return { success: false, error: error?.message };
      }
      
      // Refresh user profile to get updated spiritual preferences
      fetchUserProfile(user?.id)
      return { success: true, data }
    } catch (error) {
      setError('Failed to update spiritual preferences')
      return { success: false, error: error?.message };
    }
  }

  const value = {
    user,
    userProfile,
    loading,
    error,
    signUp,
    signIn,
    signInWithOAuth,
    signOut,
    updateProfile,
    updateSpiritualPreferences,
    clearError: () => setError(null)
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}