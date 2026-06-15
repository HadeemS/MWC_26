import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Circle, Polygon, Rect } from 'react-native-svg';
import { COLORS } from '../theme';

export default function TeamBadge({ colors = ['#1E3A5F', '#D4AF37'], shape = 'shield', size = 48 }) {
  const primary = colors[0] || COLORS.card;
  const accent = colors[1] || COLORS.gold;

  const shapes = {
    shield: <Path d="M24 2 L44 8 L44 28 C44 38 34 46 24 48 C14 46 4 38 4 28 L4 8 Z" fill={primary} stroke={accent} strokeWidth="2" />,
    circle: <Circle cx="24" cy="24" r="20" fill={primary} stroke={accent} strokeWidth="2" />,
    diamond: <Polygon points="24,4 44,24 24,44 4,24" fill={primary} stroke={accent} strokeWidth="2" />,
    hexagon: <Polygon points="24,4 40,14 40,34 24,44 8,34 8,14" fill={primary} stroke={accent} strokeWidth="2" />,
  };

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} viewBox="0 0 48 48">
        {shapes[shape] || shapes.shield}
        <Rect x="18" y="18" width="12" height="12" rx="2" fill={accent} opacity={0.8} />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center' },
});
