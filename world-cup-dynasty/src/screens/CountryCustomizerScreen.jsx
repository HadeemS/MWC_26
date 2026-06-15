import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import Button from '../components/Button';
import TeamBadge from '../components/TeamBadge';
import FlagPreview from '../components/FlagPreview';
import { COLORS, SPACING } from '../theme';
import { useGame } from '../context/GameContext';
import { generateSquad } from '../data/fictionalPlayers';

export default function CountryCustomizerScreen({ navigation, route }) {
  const { country: initial, gameMode, manager, isCustom } = route.params;
  const { setGameState } = useGame();
  const [country, setCountry] = useState({ ...initial });

  const update = (key, val) => setCountry((c) => ({ ...c, [key]: val }));

  const handleContinue = () => {
    const squad = generateSquad(country.strength || 70);
    setGameState((prev) => ({
      ...prev,
      gameMode,
      manager,
      country,
      squad,
    }));
    navigation.navigate('FlagCustomizer', { country });
  };

  return (
    <ScreenWrapper title="Customize Country" navigation={navigation}>
      <View style={styles.preview}>
        <FlagPreview colors={country.flagColors} pattern={country.flagPattern} width={120} height={72} />
        <TeamBadge colors={country.flagColors} shape={country.badgeShape} size={56} />
      </View>

      <Text style={styles.label}>Country Name</Text>
      <TextInput style={styles.input} value={country.name} onChangeText={(v) => update('name', v)} placeholderTextColor={COLORS.textMuted} />

      <Text style={styles.label}>Nickname</Text>
      <TextInput style={styles.input} value={country.nickname} onChangeText={(v) => update('nickname', v)} placeholderTextColor={COLORS.textMuted} />

      <Text style={styles.label}>Stadium Name</Text>
      <TextInput style={styles.input} value={country.stadium} onChangeText={(v) => update('stadium', v)} placeholderTextColor={COLORS.textMuted} />

      <Button title="Customize Flag" variant="secondary" onPress={() => navigation.navigate('FlagCustomizer', { country })} style={styles.btn} />
      <Button title="Customize Jersey" variant="secondary" onPress={() => navigation.navigate('JerseyCustomizer', { country })} style={styles.btn} />
      <Button title="Customize Stadium" variant="secondary" onPress={() => navigation.navigate('StadiumCustomizer', { country })} style={styles.btn} />
      <Button title="Build Squad" variant="gold" onPress={handleContinue} style={styles.btn} />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  preview: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: SPACING.lg, marginBottom: SPACING.lg },
  label: { color: COLORS.gold, fontWeight: '700', marginTop: SPACING.sm, marginBottom: 4 },
  input: { backgroundColor: COLORS.card, borderRadius: 10, padding: SPACING.md, color: COLORS.text, borderWidth: 1, borderColor: COLORS.cardBorder },
  btn: { marginTop: SPACING.sm },
});
