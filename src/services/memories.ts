import { supabase } from "@/lib/supabase";
import { Memory } from "@/types";

export const getMemories = async (): Promise<Memory[]> => {
    const { data, error } = await supabase
        .from("memories")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        throw error;
    }

    return data;
};

export const uploadMemory = async (file: File): Promise<Memory> => {
    // 1. Upload image to Storage
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
        .from("memories")
        .upload(filePath, file);

    if (uploadError) {
        throw uploadError;
    }

    // 2. Get Public URL
    const { data: { publicUrl } } = supabase.storage
        .from("memories")
        .getPublicUrl(filePath);

    // 3. Insert record into Database
    const { data, error: insertError } = await supabase
        .from("memories")
        .insert([
            {
                name: file.name,
                image_url: publicUrl,
            },
        ])
        .select()
        .single();

    if (insertError) {
        throw insertError;
    }

    return data;
};
