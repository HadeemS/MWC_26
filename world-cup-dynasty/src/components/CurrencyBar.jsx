import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../theme';

export default function CurrencyBar({ coins = 0, gems = 0, style }) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.item}>
        <Ionicons name="logo-bitcoin" size={18} color={COLORS.gold} />
        <Text style={styles.coinText}>{coins.toLocaleString()}</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.item}>
        <Ionicons name="diamond" size={16} color={COLORS.accent} />
        <Text style={styles.gemText}>{gems}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 20,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  item: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  coinText: { color: COLORS.gold, fontWeight: '800', fontSize: 15 },
  gemText: { color: COLORS.accent, fontWeight: '800', fontSize: 15 },
  divider: { width: 1, height: 20, backgroundColor: COLORS.cardBorder, marginHorizontal: SPACING.sm },
});
