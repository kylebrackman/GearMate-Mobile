import React, {useEffect} from 'react';
import {View, FlatList, Text, StyleSheet} from 'react-native';
import {useSearch} from '@/hooks/useSearch';
import ItemCard from '@/src/components/item/ItemCard';
import {router} from "expo-router";
import {Item} from "@/types/models.types";
import {useLocalSearchParams} from 'expo-router';
import {Card} from "@rneui/themed";

export default function SearchResults() {
    const {results, query} = useLocalSearchParams();
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
            <View style={styles.pillContainer}>
                <Text style={styles.pillText}>{JSON.parse(query as string)}</Text>
            </View>
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
    pillContainer: {
        alignSelf: 'center',
        backgroundColor: '#FFF',
        borderRadius: 50,
        paddingVertical: 5,
        marginVertical: 10,
        width: 200, // Fixed width for consistent size
        height: 40,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    pillText: {
        textAlign: 'center',
        color: '#333',
        fontWeight: 'bold',
        fontSize: 19
    },
});