import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../theme';

export default function StatBar({ label, value, max = 100, color = COLORS.gold, showValue = true }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label}</Text>
        {showValue && <Text style={styles.value}>{Math.round(value)}</Text>}
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${pct}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 8 },
  labelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  label: { fontSize: 13, color: COLORS.textMuted, fontWeight: '600' },
  value: { fontSize: 13, color: COLORS.gold, fontWeight: '700' },
  track: { height: 8, backgroundColor: COLORS.backgroundLight, borderRadius: 4, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 4 },
});
