/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import { Layout, Spinner } from '@ui-kitten/components';
import React from 'react';

export const Loading = () => {
  return (
    <Layout style={{ flex:1, justifyContent: 'center',alignItems:'center' }}>
      <Spinner status="primary" size="large"/>
    </Layout>
  );
};
