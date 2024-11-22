import { Image, ImageURISource, Text, View } from 'react-native';

type TabIconProps = {
    icon: ImageURISource;
    color: string;
    name: string;
    focused?: boolean;
};

export const TabIcon = ({ icon, color, name }: TabIconProps) => {
    return (
        <View
            style={{
                display: 'flex',
                alignItems: 'center',
                width: 60,
                paddingTop: 20,
            }}
        >
            <Image
                source={icon}
                resizeMode="contain"
                tintColor={color}
                style={{
                    width: 28,
                    height: 28,
                    marginBottom: 5,
                }}
            />
            <Text
                style={{
                    fontFamily: 'Work Sans',
                    fontSize: 12,
                    fontWeight: 500,
                    lineHeight: 16,
                    textAlign: 'center',
                }}
            >
                {name}
            </Text>
        </View>
    );
};
