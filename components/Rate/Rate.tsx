import {
    Image,
    Pressable,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
    View,
} from 'react-native';
import React from 'react';
import icons from '@/constants/icons';

const Rate = () => {
    return (
        <View style={{ gap: 15, flexDirection: 'row', marginBottom: 20 }}>
            <TouchableOpacity>
                <Image
                    style={styles.icon}
                    source={icons.star}
                />
            </TouchableOpacity>
            <TouchableOpacity>
                <Image
                    style={styles.icon}
                    source={icons.star}
                />
            </TouchableOpacity>
            <TouchableOpacity>
                <Image
                    style={styles.icon}
                    source={icons.star}
                />
            </TouchableOpacity>
            <TouchableOpacity>
                <Image
                    style={styles.icon}
                    source={icons.star}
                />
            </TouchableOpacity>
            <TouchableOpacity>
                <Image
                    style={styles.icon}
                    source={icons.star}
                />
            </TouchableOpacity>
        </View>
    );
};

export default Rate;

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30,
    },
});
