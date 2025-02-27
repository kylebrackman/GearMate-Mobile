import {useLocalSearchParams} from "expo-router";
import ItemDetails from "@/src/components/item/ItemDetails";

export default function ItemScreen() {
    const {itemId} = useLocalSearchParams();

    return (
        <ItemDetails itemId={itemId}/>
    );
};

