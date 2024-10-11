import {
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableHighlightProps,
    View,
} from 'react-native';
import React from 'react';
import { generalStyles } from '@/constants/theme';

export type CustomButtonProps = {
    showText: string;
} & TouchableHighlightProps;

const CustomButton = ({ showText, ...props }: CustomButtonProps) => {
    return (
        <TouchableHighlight
            {...props}
            style={styles.btn}
        >
            <Text style={styles.btnText}>{showText}</Text>
        </TouchableHighlight>
    );
};

export default CustomButton;

const styles = StyleSheet.create({
    btn: {
        backgroundColor: '#000000',
        width: '85%',
        height: 48,
        borderRadius: 24,
    },
    btnText: {
        ...generalStyles.font,
        color: '#FFFFFF',
        width: '100%',
        height: '100%',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
});
