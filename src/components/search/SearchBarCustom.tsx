import { SearchBar } from '@rneui/themed';
import { View, FlatList, StyleSheet, Text } from 'react-native';

const SearchBarCustom = () => {

    return (
        <SearchBar
            lightTheme
            placeholder="Find your Gear"
            containerStyle={styles.searchBar}
        />
    )
}

export default SearchBarCustom

const styles = StyleSheet.create({
    searchBar: {
        backgroundColor: "white",
        borderRadius: 10,
        marginHorizontal: 10,
        marginVertical: 10,
    },
})