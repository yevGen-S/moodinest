import {
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableOpacityProps,
} from 'react-native';
import React from 'react';
import { generalStyles } from '@/constants/theme';

export type CustomButtonProps = {
    showText: string;
} & TouchableOpacityProps;

const CustomButton = ({ showText, ...props }: CustomButtonProps) => {
    return (
        <TouchableOpacity
            {...props}
            style={styles.btn}
            activeOpacity={0.8}
        >
            <Text style={styles.btnText}>{showText}</Text>
        </TouchableOpacity>
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
