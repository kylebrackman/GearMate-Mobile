import { Item } from "@/types/models.types";
import { ErrorResponse } from "@/types/responses.types";

export const getAllItemsApi = async (): Promise<Item[]> => {
    try {
        const response = await fetch('/api/items?all_items=true');
        if (!response.ok) {
            const errorData = (await response.json()) as ErrorResponse;
            throw new Error(`${errorData.errors.join(', ')}`);
        } else {
            const items: Item[] = (await response.json()) as Item[];
            return items;
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};