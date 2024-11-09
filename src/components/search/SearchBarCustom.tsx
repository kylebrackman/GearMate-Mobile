import { SearchBar } from '@rneui/themed';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { useState } from "react"

const SearchBarCustom = () => {
    const [name, setName] = useState("")

    return (
        <SearchBar
            lightTheme
            placeholder="Find your Gear"
            containerStyle={styles.searchBar}
            onChangeText={setName}
            value={name}
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