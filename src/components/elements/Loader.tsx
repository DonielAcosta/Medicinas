/* eslint-disable react/react-in-jsx-scope */
import { ActivityIndicator } from 'react-native';
import { themeColors } from '../../styles/themeColors'; // ajusta el path si es necesario
import React from 'react';

export const Loader = ({ color, size }: { color?: string; size?: number }) => {
  const { darkTurquoise } = themeColors;

  return (
    <ActivityIndicator size={size ? size : 'large'} color={color ? color : darkTurquoise} />
  );
};

