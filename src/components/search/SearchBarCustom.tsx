import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {Input} from '@rneui/themed';
import {Ionicons} from '@expo/vector-icons';
import {useRouter} from "expo-router";
import {useSearch} from "@/hooks/useSearch";

const SearchBarCustom = () => {

    const router = useRouter();
    const {searchParams, setSearchParams, performSearch, searchResults} = useSearch();

    const handleSearchPress = async () => {
        try {
            const results = await performSearch(); // Get results immediately
            router.push({
                pathname: '/explore/search_results',
                params: {
                    results: JSON.stringify(results),
                    query: JSON.stringify(searchParams.name)
                }
            });
        } catch (error) {
            console.error('Search failed:', error);
        }
    };


    return (
        <View>
            <Input
                containerStyle={styles.searchBar}
                placeholder="Find your Gear"
                onChangeText={(text) => setSearchParams({...searchParams, name: text})}
                value={searchParams.name}
                inputContainerStyle={styles.inputContainer}
                rightIcon={
                    <Ionicons
                        name="search"
                        size={20} color="gray"
                        style={{marginRight: 10}}
                        onPress={handleSearchPress}
                    />
                }

            />
        </View>
    );
};

const styles = StyleSheet.create({
    searchBar: {
        backgroundColor: 'white',
        borderRadius: 30,
        marginTop: 10,
        height: 50,
        paddingHorizontal: 10,
    },
    inputContainer: {
        borderBottomWidth: 0,
    },
});

export default SearchBarCustom;