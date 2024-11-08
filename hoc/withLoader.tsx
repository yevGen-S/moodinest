import { StyleSheet } from 'react-native';
import React, { PropsWithChildren } from 'react';
import Loader from '@/components/Loader/Loader';

type WithLoaderProps = PropsWithChildren<{
    isLoading: boolean;
}>;

export const WithLoader = ({ isLoading, children }: WithLoaderProps) => {
    if (isLoading) {
        return <Loader />;
    }
    return <>{children}</>;
};

const styles = StyleSheet.create({});
