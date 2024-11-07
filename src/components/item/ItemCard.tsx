import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Item } from '../../types/models.types';

type ItemCardProps = {
  id: number;
  name: string;
  image: any;
  description: string;
  price: number;
  handlePress?: () => void;
};

const ItemCard: React.FC<ItemCardProps> = ({ name, image, description, price, handlePress }) => {
  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.card}>
        <Image source={image} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.price}>${price} / Day</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    // backgroundColor: '#fff',
    overflow: 'hidden',
    elevation: 3, // For Android shadow
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 }, // For iOS shadow
    // shadowOpacity: 0.2,
    // shadowRadius: 5,
    marginBottom: 15,
    width: '100%',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  infoContainer: {
    padding: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ItemCard;