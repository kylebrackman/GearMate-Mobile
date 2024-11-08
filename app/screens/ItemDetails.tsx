import React from 'react';
import { View, Text, Image, StyleSheet, Button, ScrollView, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Item } from '../../src/types/models.types';
import { RootStackParamList } from '../_layout';

type ItemDetailsRouteProp = RouteProp<RootStackParamList, 'ItemDetails'>;

const ItemDetails: React.FC = () => {
  const route = useRoute<ItemDetailsRouteProp>();
  const { item } = route.params; // Access the item passed from ItemList

  return (
    <ScrollView style={styles.container}>
      {/* Image Section */}
      <Image
        style={styles.image}
        source={item.image}

        />
      {/* Title and Location */}
      <View style={styles.section}>
        <Text style={styles.title}>Title</Text>
        <Text style={styles.location}>Location</Text>
        <Text style={styles.details}>{item.description}</Text>
      </View>

      {/* Rating and Reviews */}
      <View style={styles.section}>
        <View style={styles.ratingRow}>
          <Text style={styles.rating}>Rating</Text>
          <TouchableOpacity>
            <Text style={styles.reviews}>Reviews</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Host Info */}
      <View style={styles.hostSection}>
        <View>
          <Text style={styles.hostName}>Owned by OWNER</Text>
        </View>
      </View>

      {/* Price and Reserve Button */}
      <View style={styles.footer}>
        <Text style={styles.price}> {item.price} / <Text style={styles.perNight}>day</Text></Text>
        <TouchableOpacity style={styles.reserveButton}>
          <Text style={styles.reserveButtonText}>Request</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 16,
    color: 'gray',
    marginTop: 4,
  },
  details: {
    fontSize: 14,
    color: 'gray',
    marginTop: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  rating: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviews: {
    marginLeft: 10,
    color: '#3498db',
    fontSize: 12,
  },
  alertContainer: {
    backgroundColor: '#fdecea',
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 8,
    marginVertical: 8,
  },
  hostSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 16,
  },
  hostImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  hostName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  hostInfo: {
    fontSize: 14,
    color: 'gray',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  perNight: {
    fontSize: 14,
    color: 'gray',
  },
  reserveButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  reserveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ItemDetails;
