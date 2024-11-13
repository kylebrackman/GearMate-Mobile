import { SearchBar, Input } from '@rneui/themed';
import { StyleSheet } from 'react-native';
import { useState } from "react"
import { Ionicons } from '@expo/vector-icons';

const SearchBarCustom = () => {
    const [name, setName] = useState("")

    return (
        // <SearchBar
        //     clearIcon={true}
        //     containerStyle={styles.searchBar}
        //     lightTheme
        //     placeholder="Find your Gear"
        //     onChangeText={setName}
        //     value={name}
        // />
        <Input
            containerStyle={styles.searchBar}
            placeholder="Find your Gear"
            onChangeText={setName}
            value={name}
            inputContainerStyle={styles.inputContainer} 
            leftIcon={
                <Ionicons name="search" size={20} color="gray" style={{ marginRight: 10 }} /> // Add the search icon
            }
        />

    )
}

export default SearchBarCustom

const styles = StyleSheet.create({
    searchBar: {
        backgroundColor: "white",
        borderRadius: 30,
        marginTop: 10,
        textDecorationColor: "black",
        height: 50,
        paddingHorizontal: 10
    },
    inputContainer: {
        borderBottomWidth: 0,  // Removes the underline
    }
})