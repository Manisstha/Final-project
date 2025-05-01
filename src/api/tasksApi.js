import { supabase } from "@/api/index";

const TABLE_NAME = 'tasks'

export const getAllTasks = async () => {
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

export const createTask = async (title, description) => {
    try {
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .insert({ title, description })

        if (error) {
            throw new Error(error.message)
        }
        return data
    } catch (err) {
        console.log(err)
        return [];
    }
}

export const updateTask = async () => {
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

export const deleteTask = async () => {
    try {
        const { error } = await supabase
            .from(TABLE_NAME)
            .delete()
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