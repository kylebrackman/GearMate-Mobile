import { Item } from "@/types/models.types";
import { ErrorResponse } from "@/types/responses.types";
import { API_BASE_URL } from "@/src/config/api.config";

export const getAllItemsApi = async (): Promise<Item[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/items?all_items=true`);
        console.log(`${API_BASE_URL}/api/items?all_items=true`)
        if (!response.ok) {
            const errorData = (await response.json()) as ErrorResponse;
            throw new Error(errorData.error);
        } else {
            const items: Item[] = (await response.json()) as Item[];
            console.log(items)
            return items;
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};