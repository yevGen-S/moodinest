import { View, Image, ImageURISource, Text } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import icons from '@/constants/icons';

type TabIconProps = {
    icon: ImageURISource;
    color: string;
    name: string;
    focused?: boolean;
};

const TabIcon = ({ icon, color, name }: TabIconProps) => {
    return (
        <View
            style={{
                display: 'flex',
                alignItems: 'center',
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

const TabsLayout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#000000',
                tabBarStyle: {
                    height: 104,
                },
            }}
        >
            <Tabs.Screen
                name="main"
                options={{
                    title: 'Главная',
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <TabIcon
                            icon={icons.main}
                            color={color}
                            name="Главная"
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="lessons"
                options={{
                    title: 'Видео',
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <TabIcon
                            icon={icons.discovery}
                            color={color}
                            name="Видео"
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="calendar-history"
                options={{
                    title: 'История',
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <TabIcon
                            icon={icons.activity}
                            color={color}
                            name="История"
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Профиль',
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <TabIcon
                            icon={icons.profile}
                            color={color}
                            name="Профиль"
                        />
                    ),
                }}
            />
        </Tabs>
    );
};

export default TabsLayout;
