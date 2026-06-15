import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import Button from '../components/Button';
import { FORMATIONS } from '../data/decisions';
import { COLORS, SPACING } from '../theme';
import { useGame } from '../context/GameContext';

export default function TacticsScreen({ navigation }) {
  const { gameState, setGameState } = useGame();
  const [formation, setFormation] = useState(gameState.formation || '4-3-3');
  const [mentality, setMentality] = useState(gameState.mentality || 'balanced');

  const mentalities = ['defensive', 'balanced', 'attacking'];

  const save = () => {
    setGameState((prev) => ({ ...prev, formation, mentality }));
    navigation.goBack();
  };

  return (
    <ScreenWrapper title="Tactics" navigation={navigation}>
      <Text style={styles.section}>Formation</Text>
      {FORMATIONS.map((f) => (
        <TouchableOpacity key={f.id} style={[styles.card, formation === f.id && styles.selected]} onPress={() => setFormation(f.id)}>
          <Text style={styles.formLabel}>{f.label}</Text>
          <View style={styles.stats}>
            <Text style={styles.stat}>ATK {f.attack}</Text>
            <Text style={styles.stat}>MID {f.midfield}</Text>
            <Text style={styles.stat}>DEF {f.defense}</Text>
          </View>
        </TouchableOpacity>
      ))}

      <Text style={styles.section}>Mentality</Text>
      <View style={styles.row}>
        {mentalities.map((m) => (
          <TouchableOpacity key={m} style={[styles.chip, mentality === m && styles.chipActive]} onPress={() => setMentality(m)}>
            <Text style={styles.chipText}>{m}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Button title="Save Tactics" onPress={save} style={styles.btn} />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  section: { color: COLORS.gold, fontWeight: '700', marginTop: SPACING.md, marginBottom: SPACING.sm },
  card: { backgroundColor: COLORS.card, padding: SPACING.md, borderRadius: 12, marginBottom: SPACING.sm, borderWidth: 1, borderColor: COLORS.cardBorder },
  selected: { borderColor: COLORS.gold },
  formLabel: { color: COLORS.text, fontWeight: '800', fontSize: 18 },
  stats: { flexDirection: 'row', gap: SPACING.md, marginTop: 4 },
  stat: { color: COLORS.textMuted, fontSize: 12 },
  row: { flexDirection: 'row', gap: SPACING.sm },
  chip: { flex: 1, backgroundColor: COLORS.card, padding: SPACING.md, borderRadius: 10, alignItems: 'center', borderWidth: 1, borderColor: COLORS.cardBorder },
  chipActive: { borderColor: COLORS.gold, backgroundColor: COLORS.backgroundLight },
  chipText: { color: COLORS.text, textTransform: 'capitalize', fontWeight: '600' },
  btn: { marginTop: SPACING.lg },
});
