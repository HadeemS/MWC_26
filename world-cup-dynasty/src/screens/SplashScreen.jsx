import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { COLORS } from '../theme';

export default function SplashScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 1500, useNativeDriver: true }).start();
    const timer = setTimeout(() => navigation.replace('MainMenu'), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim, alignItems: 'center' }}>
        <Text style={styles.trophy}>🏆</Text>
        <Text style={styles.title}>WORLD CUP DYNASTY</Text>
        <Text style={styles.subtitle}>Road to Glory</Text>
        <View style={styles.line} />
        <Text style={styles.tagline}>Build Your Legacy. Win the Global Cup.</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, alignItems: 'center', justifyContent: 'center' },
  trophy: { fontSize: 64, marginBottom: 16 },
  title: { fontSize: 28, fontWeight: '900', color: COLORS.gold, letterSpacing: 2 },
  subtitle: { fontSize: 16, color: COLORS.textMuted, marginTop: 4, letterSpacing: 4 },
  line: { width: 120, height: 2, backgroundColor: COLORS.gold, marginVertical: 20 },
  tagline: { fontSize: 13, color: COLORS.text, fontStyle: 'italic' },
});
