import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Rect, Path } from 'react-native-svg';

export default function JerseyPreview({ primary = '#1E3A5F', secondary = '#FFFFFF', accent = '#D4AF37', size = 80 }) {
  return (
    <View style={[styles.container, { width: size, height: size * 1.2 }]}>
      <Svg width={size} height={size * 1.2} viewBox="0 0 80 96">
        <Path d="M20 8 L30 4 L40 12 L50 4 L60 8 L68 20 L60 24 L60 88 L20 88 L20 24 L12 20 Z" fill={primary} stroke={accent} strokeWidth="2" />
        <Rect x="32" y="28" width="16" height="20" rx="2" fill={secondary} opacity={0.9} />
        <Path d="M20 8 L12 20 L20 24" fill={primary} stroke={accent} strokeWidth="1" />
        <Path d="M60 8 L68 20 L60 24" fill={primary} stroke={accent} strokeWidth="1" />
        <Rect x="35" y="50" width="10" height="3" fill={accent} />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center' },
});
