import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Rect, Ellipse, Line } from 'react-native-svg';
import { COLORS } from '../theme';

export default function StadiumPreview({
  seatColor = '#2C3E6B',
  grassPattern = 'classic',
  lighting = 'floodlight',
  width = 200,
  height = 120,
}) {
  const grassColors = { classic: '#2D6A30', striped: '#358039', checkered: '#2A5C2D', dark: '#1E4620' };
  const grass = grassColors[grassPattern] || grassColors.classic;
  const lightOpacity = { day: 0, sunset: 0.3, night: 0.5, floodlight: 0.2 }[lighting] || 0;

  return (
    <View style={[styles.container, { width, height }]}>
      <Svg width={width} height={height} viewBox="0 0 200 120">
        <Rect x="10" y="10" width="180" height="100" rx="8" fill={seatColor} />
        <Ellipse cx="100" cy="65" rx="70" ry="40" fill={grass} />
        {grassPattern === 'striped' && [0, 1, 2, 3, 4].map((i) => (
          <Rect key={i} x={30 + i * 28} y="30" width="14" height="70" fill="#358839" opacity={0.4} />
        ))}
        <Ellipse cx="100" cy="65" rx="70" ry="40" fill="none" stroke="#fff" strokeWidth="1.5" opacity={0.6} />
        <Line x1="100" y1="25" x2="100" y2="105" stroke="#fff" strokeWidth="1" opacity={0.5} />
        <Ellipse cx="100" cy="65" rx="12" ry="12" fill="none" stroke="#fff" strokeWidth="1" opacity={0.5} />
        {lightOpacity > 0 && <Rect x="10" y="10" width="180" height="100" rx="8" fill={COLORS.gold} opacity={lightOpacity} />}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center' },
});
