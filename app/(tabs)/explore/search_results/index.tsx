import React, {useEffect} from 'react';
import {View, FlatList, Text, StyleSheet} from 'react-native';
import {useSearch} from '@/hooks/useSearch';
import ItemCard from '@/src/components/item/ItemCard';
import {router} from "expo-router";
import {Item} from "@/types/models.types";
import {useLocalSearchParams} from 'expo-router';

export default function SearchResults() {
    const {results} = useLocalSearchParams();
    const parsedSearchResults = JSON.parse(results as string);

    const renderItem = ({item}: { item: Item }) => (
        <ItemCard
            id={item.id}
            name={item.name}
            image={item.image}
            description={item.description}
            price={item.price}
            handlePress={() => router.push(`/explore/item/${item.id}`)}
        />
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={parsedSearchResults}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 50}}
            />
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