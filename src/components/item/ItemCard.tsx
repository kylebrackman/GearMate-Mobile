import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

type ItemCardProps = {
    id: number;
    name: string;
    image: { uri: string };
    description: string;
    price: number;
    handlePress?: () => void;
    variant?: 'default' | 'compact';
};

const ItemCard: React.FC<ItemCardProps> = ({
                                               name,
                                               image,
                                               description,
                                               price,
                                               handlePress,
                                               variant = 'default'
                                           }) => {
    const defaultImage = require('../../../assets/images/item/kayak.png');

    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={[
                styles.card,
                variant === 'compact' && styles.compactCard
            ]}>
                <Image
                    source={image ? { uri: `http://localhost:3000${image}` } : defaultImage}
                    style={[
                        styles.image,
                        variant === 'compact' && styles.compactImage
                    ]}
                />
                <View style={[
                    styles.infoContainer,
                    variant === 'compact' && styles.compactInfoContainer
                ]}>
                    <Text
                        style={[
                            styles.name,
                            variant === 'compact' && styles.compactName
                        ]}
                    >
                        {name}
                    </Text>
                    <Text
                        style={[
                            styles.description,
                            variant === 'compact' && styles.compactDescription
                        ]}
                        numberOfLines={variant === 'compact' ? 1 : 2}
                    >
                        {description}
                    </Text>
                    <Text
                        style={[
                            styles.price,
                            variant === 'compact' && styles.compactPrice
                        ]}
                    >
                        ${price} / Day
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        overflow: 'hidden',
        elevation: 3,
        marginBottom: 15,
        width: '100%',
    },
    compactCard: {
        marginBottom: 10,
    },
    image: {
        width: '100%',
        height: 300,
        borderRadius: 10,
    },
    compactImage: {
        height: 150, // or use aspectRatio: 1 for perfect square
        aspectRatio: 1,
    },
    infoContainer: {
        padding: 10,
    },
    compactInfoContainer: {
        padding: 8,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    compactName: {
        fontSize: 14,
        marginBottom: 3,
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    compactDescription: {
        fontSize: 12,
        marginBottom: 3,
    },
    price: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    compactPrice: {
        fontSize: 13,
    },
});

export default ItemCard;