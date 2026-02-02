import { create } from 'zustand';
import { supabase } from '../lib/supabase';

export const useAuthStore = create((set, get) => ({
    user: null,
    profile: null,
    loading: true,
    role: null, // 'admin', 'student', 'parent'

    // Initialize auth state
    initialize: async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession();

            if (session?.user) {
                await get().loadUserProfile(session.user);
            }

            // Listen for auth changes
            supabase.auth.onAuthStateChange(async (event, session) => {
                if (session?.user) {
                    await get().loadUserProfile(session.user);
                } else {
                    set({ user: null, profile: null, role: null, loading: false });
                }
            });

        } catch (error) {
            console.error('Error initializing auth:', error);
            set({ loading: false });
        }
    },

    // Load user profile from database
    loadUserProfile: async (user) => {
        try {
            const { data: profile, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            if (error) throw error;

            set({
                user,
                profile,
                role: profile?.role || null,
                loading: false
            });
        } catch (error) {
            console.error('Error loading profile:', error);
            set({ user, profile: null, role: null, loading: false });
        }
    },

    // Sign in
    signIn: async (email, password) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                // FALLBACK DEV: Si le compte n'existe pas dans Supabase, on autorise l'admin local
                if (email === 'admin@noor.com' && password === 'Admin123!') {
                    console.log('⚡ Dev Mode: Admin Login Bypass');
                    set({
                        user: { id: 'dev-admin', email },
                        profile: { name: 'Super Admin', role: 'admin' },
                        role: 'admin',
                        loading: false
                    });
                    return { user: { id: 'dev-admin' }, session: {} };
                }
                throw error;
            }
            return data;
        } catch (err) {
            // Double check au cas où l'erreur est levée avant
            if (email === 'admin@noor.com' && password === 'Admin123!') {
                console.log('⚡ Dev Mode: Admin Login Bypass (Catch)');
                set({
                    user: { id: 'dev-admin', email },
                    profile: { name: 'Super Admin', role: 'admin' },
                    role: 'admin',
                    loading: false
                });
                return { user: { id: 'dev-admin' }, session: {} };
            }
            throw err;
        }
    },

    // Sign up
    signUp: async (email, password, userData) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: userData,
            },
        });

        if (error) throw error;
        return data;
    },

    // Sign out
    signOut: async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        set({ user: null, profile: null, role: null });
    },
}));
