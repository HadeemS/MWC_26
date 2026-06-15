import React from 'react';
import { Platform, View, StyleSheet, useWindowDimensions } from 'react-native';
import { COLORS } from '../theme';

// Centers the mobile UI on desktop browsers with a phone-width frame.
export default function WebAppShell({ children }) {
  const { width } = useWindowDimensions();

  if (Platform.OS !== 'web') {
    return children;
  }

  const frameWidth = Math.min(480, Math.max(360, width - 32));

  return (
    <View style={styles.page}>
      <View style={[styles.frame, { width: frameWidth, maxWidth: '100%' }]}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    minHeight: '100vh',
    backgroundColor: '#050D18',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  frame: {
    flex: 1,
    width: '100%',
    maxHeight: '100vh',
    backgroundColor: COLORS.background,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    // @ts-ignore web-only shadow
    boxShadow: '0 12px 48px rgba(0, 0, 0, 0.45)',
  },
});
