import { supabase } from "@/api/index";

const TABLE_NAME = 'users'

export const getUserData = async () => {
    try {
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .select()

        if (error) {
            throw new Error(error.message)
        }

        return data
    } catch (err) {
        console.log(err)
        return [];
    }

}

export const createUser = async (email, password) => {
    try {
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .insert({ email, password })

        if (error) {
            throw new Error(error.message)
        }
        return data
    } catch (err) {
        console.log(err)
        return [];
    }
}

export const updateUser = async (password) => {
    try {
        const { error } = await supabase
            .from(TABLE_NAME)
            .update({})
            .eq()

        if (error) {
            throw new Error(error.message)
        }
        return data
    } catch (err) {
        console.log(err)
        return [];
    }
}