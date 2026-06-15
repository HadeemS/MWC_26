import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../theme';
import Button from '../components/Button';
import CurrencyBar from '../components/CurrencyBar';
import { useGame } from '../context/GameContext';
import { GAME_MODES } from '../data/tournaments';

const ICON_MAP = {
  flash: 'flash', briefcase: 'briefcase', flag: 'flag', trophy: 'trophy', construct: 'construct', time: 'time',
};

export default function MainMenuScreen({ navigation }) {
  const { gameState } = useGame();
  const hasSave = gameState.manager && gameState.country;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.hero}>
        <Text style={styles.trophy}>🏆</Text>
        <Text style={styles.title}>WORLD CUP DYNASTY</Text>
        <Text style={styles.subtitle}>Road to Glory</Text>
        {hasSave && (
          <CurrencyBar coins={gameState.economy?.coins || 0} gems={gameState.economy?.gems || 0} style={styles.currency} />
        )}
      </View>

      <View style={styles.menu}>
        <Button title="New Game" onPress={() => navigation.navigate('ManagerCreation')} />
        {hasSave && (
          <Button title="Continue" variant="gold" onPress={() => navigation.navigate('SquadHub')} style={styles.btn} />
        )}
        <Button title="Save Slots" variant="secondary" onPress={() => navigation.navigate('SaveSlots')} style={styles.btn} />
        <Button title="Store" variant="secondary" onPress={() => navigation.navigate('Store')} style={styles.btn} />
        <Button title="Settings" variant="outline" onPress={() => navigation.navigate('Settings')} style={styles.btn} />
      </View>

      <View style={styles.modes}>
        <Text style={styles.modesTitle}>GAME MODES</Text>
        {GAME_MODES.map((mode) => (
          <TouchableOpacity
            key={mode.id}
            style={styles.modeCard}
            onPress={() => navigation.navigate('ManagerCreation', { gameMode: mode.id })}
          >
            <Ionicons name={ICON_MAP[mode.icon] || 'football'} size={24} color={COLORS.gold} />
            <View style={styles.modeInfo}>
              <Text style={styles.modeLabel}>{mode.label}</Text>
              <Text style={styles.modeDesc}>{mode.description}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.textMuted} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { flexGrow: 1, paddingBottom: SPACING.xl },
  hero: { alignItems: 'center', paddingTop: 60, paddingBottom: SPACING.lg },
  trophy: { fontSize: 48 },
  title: { fontSize: 24, fontWeight: '900', color: COLORS.gold, marginTop: 8 },
  subtitle: { fontSize: 13, color: COLORS.textMuted, letterSpacing: 3 },
  currency: { marginTop: SPACING.md },
  menu: { paddingHorizontal: SPACING.lg },
  btn: { marginTop: SPACING.sm },
  modes: { padding: SPACING.md, marginTop: SPACING.md },
  modesTitle: { color: COLORS.textMuted, fontSize: 11, fontWeight: '700', letterSpacing: 2, marginBottom: SPACING.sm },
  modeCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.card,
    padding: SPACING.md, borderRadius: 12, marginBottom: SPACING.sm, borderWidth: 1, borderColor: COLORS.cardBorder,
  },
  modeInfo: { flex: 1, marginLeft: SPACING.md },
  modeLabel: { color: COLORS.text, fontWeight: '700', fontSize: 15 },
  modeDesc: { color: COLORS.textMuted, fontSize: 12, marginTop: 2 },
});
