import { Item } from "@/types/models.types";
import { ErrorResponse } from "@/types/responses.types";
import { API_BASE_URL } from "@/src/config/api.config";

export const getAllItemsApi = async (): Promise<Item[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/items?all_items=true`);
        if (!response.ok) {
            const errorData = (await response.json()) as ErrorResponse;
            throw new Error(errorData.error);
        } else {
            const items: Item[] = (await response.json()) as Item[];
            return items;
        }
    } catch (error) {
        throw error;
    }
};

export const getItemApi = async (id: number): Promise<Item | null> => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/items/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            const item: Item = (await response.json()) as Item;
            return item;
        }
    } catch (error) {
        return null; // Return null instead of throwing
    }
};