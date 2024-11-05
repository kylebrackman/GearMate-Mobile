import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { AntDesign, Feather } from '@expo/vector-icons';

function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {

    const primaryColor = '#1976D2';
    const greyColor = '#696969';

    const icons = {
        "screens/Explore": (color: string) => <AntDesign name="search1" size={26} color={color} />,
        "screens/LogIn": (color: string) => <AntDesign name="user" size={26} color={color} />,
        "screens/Messages": (color: string) => <AntDesign name="message1" size={26} color={color} />,
    };
    return (
        <View style={styles.tabbar}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                if (['_sitemap', '+not-found'].includes(route.name)) return null
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        key={route.name}
                        style={styles.tabbarItem}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                    >
                        {
                            icons[route.name as keyof typeof icons](
                                isFocused ? primaryColor : greyColor
                            )
                        }
                        <Text style={{ color: isFocused ? primaryColor : greyColor }}>
                            {/* Check if label is a string or function */}
                            {typeof label === 'string' ? label : label({ focused: isFocused, color: isFocused ? '#673ab7' : '#222', position: 'beside-icon', children: '' })}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}


const styles = StyleSheet.create({
    tabbar: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 10,
    },
    tabbarItem: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
})

export default TabBar;