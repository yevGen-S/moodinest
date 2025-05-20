import {
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableOpacityProps,
    Image,
    ImageSourcePropType,
} from 'react-native';
import React from 'react';
import { generalStyles } from '@/constants/theme';

export type CustomButtonProps = {
    showText: string;
    textStyle?: object;
    icon?: ImageSourcePropType;
} & TouchableOpacityProps;

const CustomButton = ({ showText, style, textStyle, icon, ...props }: CustomButtonProps) => {
    return (
        <TouchableOpacity
            {...props}
            style={[styles.btn, style,]}
            activeOpacity={0.8}
        >
            {icon && (
                <Image
                    source={icon}
                    style={styles.iconBackground}
                    resizeMode="contain"
                />
            )}
            <Text style={[styles.btnText, textStyle]}>{showText}</Text>
        </TouchableOpacity>
    );
};

export default CustomButton;

const styles = StyleSheet.create({
    btn: {
        backgroundColor: '#000000',
        width: '90%',
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    btnText: {
        ...generalStyles.font,
        color: '#FFFFFF',
        textAlign: 'center',
        textAlignVertical: 'center',
        zIndex: 1,
    },
    iconBackground: {
        position: 'absolute',
        left: 16,
        height: 20,
        width: 20,
    },
});
