import React, {useEffect} from 'react';
import {View, FlatList, Dimensions, StyleSheet, Text} from 'react-native';
import ItemCard from '@/src/components/item/ItemCard';
import {useRouter} from "expo-router";
import {Divider} from "@rneui/themed";
import {getUserOwnedItemsApi} from "@/services/apis/UserApi";
import {useAuthService} from "@/hooks/useAuthService";

type Item = {
    id: number;
    name: string;
    image: any;
    description: string;
    price: number;
    condition: string;
};

const allItems: Item[] = [
    {
        id: 1,
        name: 'Mountain Bike',
        image: require('assets/images/item/mountain-bike.png'),
        description: 'Great for off-road trails',
        price: 25,
        condition: 'New',
    },
    {
        id: 2,
        name: 'Fishing Pole',
        image: require('assets/images/item/fishing-pole.png'),
        description: 'Perfect for your next fishing trip',
        price: 15,
        condition: 'Like New',
    },
    {
        id: 3,
        name: 'Kayak',
        image: require('assets/images/item/kayak.png'),
        description: 'Enjoy a day on the water',
        price: 30,
        condition: 'New',
    },
    {
        id: 4,
        name: 'Snowboard Boots',
        image: require('assets/images/item/snowboard-boots.png'),
        description: 'Stay warm and stylish on the slopes',
        price: 20,
        condition: 'Like New',
    },
    {
        id: 5,
        name: 'Yeti Cooler',
        image: require('assets/images/item/yeti-cooler.png'),
        description: 'Keep your drinks cold for days',
        price: 50,
        condition: 'Used',
    },
];


export default function UserItems() {
    const router = useRouter();
    const screenWidth = Dimensions.get('window').width;
    const itemWidth = (screenWidth - 60) / 2;
    const {user} = useAuthService();
    const [userOwnedItems, setUserOwnedItems] = React.useState<Item[]>([]);

    useEffect(() => {
        const fetchUserOwnedItems = async () => {
            try {
                const data = await getUserOwnedItemsApi(user?.uid);
                setUserOwnedItems(data);
            } catch (error) {
                console.error("Error fetching userOwnedItems:", error);
            }
        };
        fetchUserOwnedItems();
    }, []);

    useEffect(() => {
        console.log("userOwnedItems", userOwnedItems);
    }, []);


    const renderItem = ({item}: { item: Item }) => (
        <View style={[styles.itemContainer, {width: itemWidth}]}>
            <ItemCard
                id={item.id}
                name={item.name}
                image={item.image}
                description={item.description}
                price={item.price}
                variant="compact"
                handlePress={() => router.push(`/profile/userItems/item/${item.id}`)}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}> View or Edit Your Gear Below</Text>
            <Divider style={styles.divider}/>
            <FlatList
                data={userOwnedItems}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={styles.row}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 50
    },
    listContainer: {
        paddingBottom: 50,
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    itemContainer: {
        // Individual item container styling
        // You might need to adjust ItemCard component styling to fit well in this width
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        paddingBottom: 20
    },
    divider: {
        marginBottom: 20
    },
});