import {Item} from '@/types/models.types';
import {SearchParams} from '@/types/search.types';
import {API_BASE_URL} from "@/src/config/api.config";


export const searchItemsApi = async (
    searchParams: SearchParams
): Promise<Item[]> => {
    const queryString = new URLSearchParams(
        // Todo: review ts error when removing ts-ignore
        // @ts-ignore
        searchParams as Record<string, string>
    ).toString();

    const response = await fetch(`${API_BASE_URL}/api/item_search?${queryString}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = (await response.json()) as Item[];
    return data;
};