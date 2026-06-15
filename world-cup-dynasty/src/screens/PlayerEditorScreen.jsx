import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import Button from '../components/Button';
import StatBar from '../components/StatBar';
import { COLORS, SPACING } from '../theme';
import { useGame } from '../context/GameContext';
import { PLAYER_TRAITS } from '../data/fictionalPlayers';

export default function PlayerEditorScreen({ navigation, route }) {
  const { playerId } = route.params;
  const { gameState, setGameState } = useGame();
  const player = gameState.squad?.find((p) => p.id === playerId);
  const [edited, setEdited] = useState(player ? { ...player } : null);

  if (!edited) return <ScreenWrapper title="Player Editor" navigation={navigation}><Text style={styles.error}>Player not found</Text></ScreenWrapper>;

  const update = (key, val) => setEdited({ ...edited, [key]: val });

  const setRole = (role) => {
    const squad = gameState.squad.map((p) => ({
      ...p,
      isCaptain: role === 'captain' ? p.id === edited.id : p.isCaptain && p.id !== edited.id,
      isPenaltyTaker: role === 'penalty' ? p.id === edited.id : p.isPenaltyTaker && p.id !== edited.id,
      isFreeKickTaker: role === 'freekick' ? p.id === edited.id : p.isFreeKickTaker && p.id !== edited.id,
      isCornerTaker: role === 'corner' ? p.id === edited.id : p.isCornerTaker && p.id !== edited.id,
    }));
    const updated = squad.find((p) => p.id === edited.id);
    setEdited(updated);
    setGameState((prev) => ({ ...prev, squad }));
  };

  const save = () => {
    setGameState((prev) => ({
      ...prev,
      squad: prev.squad.map((p) => (p.id === edited.id ? edited : p)),
    }));
    navigation.goBack();
  };

  return (
    <ScreenWrapper title="Edit Player" navigation={navigation}>
      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} value={edited.name} onChangeText={(v) => update('name', v)} placeholderTextColor={COLORS.textMuted} />

      <Text style={styles.overall}>{edited.overall} OVR · {edited.position}</Text>

      <StatBar label="Pace" value={edited.pace} />
      <StatBar label="Shooting" value={edited.shooting} color={COLORS.danger} />
      <StatBar label="Passing" value={edited.passing} color={COLORS.info} />
      <StatBar label="Defense" value={edited.defense} color={COLORS.success} />
      <StatBar label="Stamina" value={edited.stamina} />
      <StatBar label="Composure" value={edited.composure} color={COLORS.accent} />
      <StatBar label="Morale" value={edited.morale} />
      <StatBar label="Potential" value={edited.potential} color={COLORS.goldLight} />

      <Text style={styles.label}>Trait</Text>
      <View style={styles.traits}>
        {PLAYER_TRAITS.slice(0, 6).map((t) => (
          <TouchableOpacity key={t} style={[styles.chip, edited.trait === t && styles.chipActive]} onPress={() => update('trait', t)}>
            <Text style={styles.chipText}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Special Roles</Text>
      <View style={styles.roles}>
        <Button title="Captain" variant={edited.isCaptain ? 'gold' : 'secondary'} onPress={() => setRole('captain')} style={styles.roleBtn} />
        <Button title="Penalties" variant={edited.isPenaltyTaker ? 'gold' : 'secondary'} onPress={() => setRole('penalty')} style={styles.roleBtn} />
        <Button title="Free Kicks" variant={edited.isFreeKickTaker ? 'gold' : 'secondary'} onPress={() => setRole('freekick')} style={styles.roleBtn} />
        <Button title="Corners" variant={edited.isCornerTaker ? 'gold' : 'secondary'} onPress={() => setRole('corner')} style={styles.roleBtn} />
      </View>

      <Button title="Save Player" onPress={save} style={styles.btn} />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  error: { color: COLORS.danger, textAlign: 'center' },
  label: { color: COLORS.gold, fontWeight: '700', marginTop: SPACING.md, marginBottom: 4 },
  input: { backgroundColor: COLORS.card, borderRadius: 10, padding: SPACING.md, color: COLORS.text, borderWidth: 1, borderColor: COLORS.cardBorder },
  overall: { color: COLORS.gold, fontSize: 18, fontWeight: '800', textAlign: 'center', marginVertical: SPACING.md },
  traits: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { backgroundColor: COLORS.card, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, borderWidth: 1, borderColor: COLORS.cardBorder },
  chipActive: { borderColor: COLORS.gold },
  chipText: { color: COLORS.text, fontSize: 11 },
  roles: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  roleBtn: { flex: 1, minWidth: '45%' },
  btn: { marginTop: SPACING.lg },
});
