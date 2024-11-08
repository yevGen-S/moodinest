import { StyleSheet } from 'react-native';
import React, { PropsWithChildren } from 'react';
import { Loader, LoaderPage } from '@/components/Loader/Loader';

type WithLoaderProps = PropsWithChildren<{
    isLoading: boolean;
    size?: 'small' | 'large';
}>;

export const WithLoader = ({
    isLoading,
    size = 'large',
    children,
}: WithLoaderProps) => {
    if (isLoading) {
        switch (size) {
            case 'small':
                return <Loader />;
            case 'large':
                return <LoaderPage />;
        }
    }
    return <>{children}</>;
};

const styles = StyleSheet.create({});
