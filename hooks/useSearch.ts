import { useState } from 'react';
import { searchItemsApi } from '@/services/apis/SearchApi';
import { Item } from '@/types/models.types';
import { SearchParams } from '@/types/search.types';

export const useSearch = () => {
    const [searchParams, setSearchParams] = useState<SearchParams>({ name: '' });
    const [searchResults, setSearchResults] = useState<Item[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const performSearch = async () => {
        if (!searchParams.name) {
            console.error('Please enter a search term');
            throw new Error('Please enter a search term');
        }

        setIsLoading(true);
        try {
            const results = await searchItemsApi(searchParams);
            setSearchResults(results);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
        console.log(searchResults);
    };

    return {
        searchParams,
        setSearchParams,
        searchResults,
        isLoading,
        performSearch
    };
};