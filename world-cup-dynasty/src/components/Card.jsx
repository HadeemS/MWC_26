import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../theme';

export default function Card({ children, style, variant = 'default' }) {
  return (
    <View style={[styles.card, variant === 'gold' && styles.goldCard, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    marginBottom: SPACING.sm,
  },
  goldCard: {
    borderColor: COLORS.gold,
    borderWidth: 1.5,
  },
});
