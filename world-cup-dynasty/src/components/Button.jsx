import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS, SPACING } from '../theme';

export default function Button({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon,
}) {
  const variantStyle = {
    primary: styles.primary,
    secondary: styles.secondary,
    danger: styles.danger,
    gold: styles.gold,
    outline: styles.outline,
  }[variant] || styles.primary;

  return (
    <TouchableOpacity
      style={[styles.button, variantStyle, disabled && styles.disabled, style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={COLORS.white} />
      ) : (
        <>
          {icon}
          <Text style={[styles.text, variant === 'outline' && styles.outlineText, textStyle]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
    flexDirection: 'row',
    gap: 8,
  },
  primary: { backgroundColor: COLORS.gold },
  secondary: { backgroundColor: COLORS.card },
  danger: { backgroundColor: COLORS.danger },
  gold: { backgroundColor: COLORS.goldDark },
  outline: { backgroundColor: 'transparent', borderWidth: 2, borderColor: COLORS.gold },
  disabled: { opacity: 0.5 },
  text: { fontSize: 16, fontWeight: '700', color: COLORS.background },
  outlineText: { color: COLORS.gold },
});
