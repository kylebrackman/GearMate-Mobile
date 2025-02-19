import React, {useState, useEffect} from 'react';
import {View, FlatList} from 'react-native';
import ItemCard from '@/src/components/item/ItemCard';
import SearchBarCustom from '@/src/components/search/SearchBarCustom';
import ItemTypeSearch from '@/src/components/search/ItemTypeSearch';
import {useRouter} from "expo-router";
import {globalStyles} from "@/theme/styles";
import {StyleSheet} from "react-native";
import {getAllItemsApi} from "@/services/apis/ItemApi";
import {Item} from "@/types/models.types";

export default function ExploreScreen() {

    const [items, setItems] = useState<Item[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchAllItems = async () => {
            try {
                const data = await getAllItemsApi();
                setItems(data);
            } catch (error) {
                console.error("Error fetching allItems:", error);
            }
        };
        // Todo: review tsx error
        fetchAllItems();
    }, []);

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
        <View style={styles.exploreContainer}>
            <SearchBarCustom/>
            <ItemTypeSearch/>
            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 50}}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    exploreContainer: {
        flex: 1,
        paddingHorizontal: 20,
    }
});