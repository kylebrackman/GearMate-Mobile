import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useSearch } from '@/hooks/useSearch';
import SearchBarCustom from '@/src/components/search/SearchBarCustom';
import ItemCard from '@/src/components/item/ItemCard';
import {Item} from "@/types/models.types";
import {router} from "expo-router";


export default function SearchResults() {
    // const { items, isLoading, error, searchParams, setSearchParams } = useSearch();

    // const renderItem = ({ item }: { item: Item }) => (
    //     <ItemCard
    //         id={item.id}
    //         name={item.name}
    //         image={item.image}
    //         description={item.description}
    //         price={item.price}
    //         handlePress={() => router.push(`/explore/item/${item.id}`)}
    //     />
    // );

    return (
        <View style={styles.container}>
            <Text>Testing</Text>
            {/*<SearchBarCustom*/}
            {/*    value={searchParams.name}*/}
            {/*    onChangeText={(text) => setSearchParams({ ...searchParams, name: text })}*/}
            {/*    isLoading={isLoading}*/}
            {/*    error={error}*/}
            {/*/>*/}
            {/*{items.length === 0 && !isLoading && searchParams.name && (*/}
            {/*    <Text style={styles.noResults}>No items found</Text>*/}
            {/*)}*/}
            {/*<FlatList*/}
            {/*    data={items}*/}
            {/*    renderItem={renderItem}*/}
            {/*    keyExtractor={(item) => item.id.toString()}*/}
            {/*    showsVerticalScrollIndicator={false}*/}
            {/*    contentContainerStyle={{ paddingBottom: 50 }}*/}
            {/*/>*/}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    noResults: {
        textAlign: 'center',
        marginTop: 20,
        color: 'gray',
    },
});