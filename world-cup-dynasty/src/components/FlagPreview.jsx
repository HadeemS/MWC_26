import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Rect, Line } from 'react-native-svg';

export default function FlagPreview({ colors = ['#1E3A5F', '#D4AF37', '#FFFFFF'], pattern = 'horizontal', width = 100, height = 60 }) {
  const renderPattern = () => {
    const [c1, c2, c3] = colors;
    switch (pattern) {
      case 'vertical':
        return (
          <>
            <Rect x="0" y="0" width={width / 3} height={height} fill={c1} />
            <Rect x={width / 3} y="0" width={width / 3} height={height} fill={c2} />
            <Rect x={(width / 3) * 2} y="0" width={width / 3} height={height} fill={c3 || c1} />
          </>
        );
      case 'diagonal':
        return (
          <>
            <Rect x="0" y="0" width={width} height={height} fill={c1} />
            <Rect x="0" y="0" width={width} height={height / 2} fill={c2} />
            <Rect x="0" y={height / 2} width={width} height={height / 2} fill={c3 || c1} />
          </>
        );
      case 'cross':
        return (
          <>
            <Rect x="0" y="0" width={width} height={height} fill={c1} />
            <Rect x={width * 0.35} y="0" width={width * 0.3} height={height} fill={c2} />
            <Rect x="0" y={height * 0.35} width={width} height={height * 0.3} fill={c2} />
          </>
        );
      default:
        return (
          <>
            <Rect x="0" y="0" width={width} height={height / 3} fill={c1} />
            <Rect x="0" y={height / 3} width={width} height={height / 3} fill={c2} />
            <Rect x="0" y={(height / 3) * 2} width={width} height={height / 3} fill={c3 || c1} />
          </>
        );
    }
  };

  return (
    <View style={[styles.container, { width, height }]}>
      <Svg width={width} height={height}>
        {renderPattern()}
        <Line x1="0" y1="0" x2={width} y2="0" stroke="#333" strokeWidth="1" />
        <Line x1="0" y1={height} x2={width} y2={height} stroke="#333" strokeWidth="1" />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { borderRadius: 4, overflow: 'hidden', borderWidth: 1, borderColor: '#333' },
});
