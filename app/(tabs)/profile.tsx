import { Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { generalStyles } from '@/constants/theme';

const Profile = () => {
    return (
        <SafeAreaView style={generalStyles.container}>
            <Text>Profile</Text>
        </SafeAreaView>
    );
};

export default Profile;
