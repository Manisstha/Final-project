import { supabase } from "@/api/index";

const TABLE_NAME = 'tasks'

export const getAllTasks = async (userId) => {
    try {
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .select("*")
            .eq("user_id", userId)
            .order("created_at", { ascending: false });

        if (error) {
            throw new Error(error.message)
        }
        return data
    } catch (err) {
        console.log("Error fetching tasks", err)
        return [];
    }
}

export const createTask = async (title, description, userId, favorite = false) => {
    try {
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .insert([{ title, description, favorite, status: "To Do", user_id: userId }])
            .select();

        if (error) {
            throw new Error(error.message)
        }
        return data[0]
    } catch (err) {
        console.log(err)
        return null;
    }
}

export const updateTask = async (id, updates) => {
    try {
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .update(updates)
            .eq("id", id)
            .select()

        if (error) {
            throw new Error(error.message)
        }
        return data[0]
    } catch (err) {
        console.error("Error updating task:", err);
        return null;
    }
}

export const deleteTask = async (id) => {
    try {
        const { error } = await supabase
            .from(TABLE_NAME)
            .delete()
            .eq("id", id)

        if (error) {
            throw new Error(error.message)
        }
        return true;
    } catch (err) {
        console.error("Error deleting task:", err);
        return false;
    }
}

export const toggleFavorite = async (id, currentValue) => {
    try {
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .update({ favorite: !currentValue })
            .eq("id", id)
            .select();

        if (error) throw new Error(error.message);
        return data[0];
    } catch (err) {
        console.error("Error toggling favorite:", err);
        return null;
    }
};