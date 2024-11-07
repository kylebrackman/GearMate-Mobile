import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import ItemCard from '../../src/components/item/ItemCard'; // Adjust the path based on your file structure
import { UserContext } from '../../src/context/UserContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Sample data type
type Item = {
  id: number;
  name: string;
  image: any;
  description: string;
  price: number;
  condition: string;
};

// Sample data
const allItems: Item[] = [
  {
    id: 1,
    name: 'Mountain Bike',
    image: require('../../assets/images/item/mountain-bike.png'),
    description: 'Great for off-road trails',
    price: 25,
    condition: 'New',
  },
  {
    id: 2,
    name: 'Fishing Pole',
    image: require('../../assets/images/item/fishing-pole.png'),
    description: 'Perfect for your next fishing trip',
    price: 15,
    condition: 'Like New',
  },
  {
    id: 3,
    name: 'Kayak',
    image: require('../../assets/images/item/kayak.png'),
    description: 'Enjoy a day on the water',
    price: 30,
    condition: 'New',
  },
  {
    id: 4,
    name: 'Snowboard Boots',
    image: require('../../assets/images/item/snowboard-boots.png'),
    description: 'Stay warm and stylish on the slopes',
    price: 20,
    condition: 'Like New',
  },
  {
    id: 5,
    name: 'Yeti Cooler',
    image: require('../../assets/images/item/yeti-cooler.png'),
    description: 'Keep your drinks cold for days',
    price: 50,
    condition: 'Used',
  },
  // Add more items as needed
];

const ItemList: React.FC = () => {

  const { user } = React.useContext(UserContext);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  console.log("user from context", user)
  const renderItem = ({ item }: { item: Item }) => (
    <ItemCard
      id={item.id}
      name={item.name}
      image={item.image}
      description={item.description}
      price={item.price}
      handlePress={() => navigation.navigate('screens/ItemDetails', { item })}
    />
  );

  return (
    <View style={styles.container}>
        <Text> SEARCH HERE </Text>
      <FlatList
        data={allItems}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

export default ItemList;
