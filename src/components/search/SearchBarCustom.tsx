import { SearchBar } from '@rneui/themed';
import { View, FlatList, StyleSheet, Text } from 'react-native';

const SearchBarCustom = () => {

    return (
        <SearchBar
            style={styles.container}
        />
    )
}

export default SearchBarCustom

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // paddingHorizontal: 20,
        // paddingBottom: 20
    },
})