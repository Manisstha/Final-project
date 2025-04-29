import { supabase } from "@/api/index";

export const signUpUser = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
    return data
}

export const signInUser = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data
}

export const getCurrentUser = async () => {
    const { data, error } = await supabase.auth.getUser()
    if (error) throw error
    return data.user
}

export const signOutUser = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
};