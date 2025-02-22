import {Input} from '@rneui/themed';
import {StyleSheet} from 'react-native';
import {useState} from "react";
import {Ionicons} from '@expo/vector-icons';
import {searchItemsApi} from "@/services/apis/SearchApi";
import {router} from "expo-router";

type SearchField = 'location' | 'name' | 'date_from' | 'date_to';

type SearchParams = {
    name: string;
    location?: string;
    date_from?: string;
    date_to?: string;
};

const SearchBarCustom = () => {
    const [searchParams, setSearchParams] = useState<SearchParams>({
        name: '',
        // location: '',
        // date_from: '',
        // date_to: '',
    });
    const [errors, setErrors] = useState<string[]>([]);

    const handleInputChange = (field: SearchField) => (value: string) => {
        setSearchParams((prevParams) => ({
            ...prevParams,
            [field]: value,
        }));
    };

    const handleSearch = () => {
        const query = new URLSearchParams(searchParams).toString();
        console.log(searchParams);
        if (searchParams.name == '') {
            setErrors(['Name is required.']);
        } else router.push(`/explore/search?${query}`);
    };

    return (
        <Input
            containerStyle={styles.searchBar}
            placeholder="Find your Gear"
            onChangeText={handleInputChange('name')}
            value={searchParams.name}
            inputContainerStyle={styles.inputContainer}
            leftIcon={
                <Ionicons onPress={handleSearch} name="search" size={20} color="gray" style={{marginRight: 10}}/>
            }
        />
    );
};

export default SearchBarCustom;

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
});