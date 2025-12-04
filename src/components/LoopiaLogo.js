// src/components/LoopiaLogo.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Ellipse } from 'react-native-svg';

const LoopiaLogo = ({ size = 'default', style }) => {
  const sizes = {
    small: { width: 28, height: 28, fontSize: 16 },
    default: { width: 36, height: 36, fontSize: 20 },
    large: { width: 48, height: 48, fontSize: 28 },
  };

  const dimensions = sizes[size] || sizes.default;

  return (
    <View style={[styles.container, style]}>
      {/* Logo SVG - Crveni i roze oblaci */}
      <Svg width={dimensions.width} height={dimensions.height} viewBox="0 0 48 48">
        {/* Roze/magenta oblak */}
        <Ellipse
          cx="32"
          cy="24"
          rx="14"
          ry="16"
          fill="#E91E8C"
          opacity="0.9"
        />
        {/* Crveni oblak */}
        <Ellipse
          cx="18"
          cy="24"
          rx="14"
          ry="16"
          fill="#E31E24"
          opacity="0.9"
        />
      </Svg>

      {/* Loopia tekst */}
      <Text style={[styles.text, { fontSize: dimensions.fontSize }]}>
        loopia
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    color: '#1E293B',
    marginLeft: 8,
  },
});

export default LoopiaLogo;