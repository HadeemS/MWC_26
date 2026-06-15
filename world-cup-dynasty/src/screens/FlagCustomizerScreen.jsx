import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import Button from '../components/Button';
import FlagPreview from '../components/FlagPreview';
import { FLAG_PATTERNS, BADGE_SHAPES } from '../data/countries';
import { COLORS, SPACING } from '../theme';
import { useGame } from '../context/GameContext';

const COLOR_OPTIONS = ['#1E3A5F', '#D4AF37', '#FFFFFF', '#C0392B', '#2ECC71', '#1A5276', '#8B1A1A', '#4A235A', '#2C3E50', '#F39C12'];

export default function FlagCustomizerScreen({ navigation, route }) {
  const { country: initial } = route.params;
  const { setGameState } = useGame();
  const [country, setCountry] = useState({ ...initial });

  const setColor = (index, color) => {
    const colors = [...country.flagColors];
    colors[index] = color;
    setCountry({ ...country, flagColors: colors });
  };

  const save = () => {
    setGameState((prev) => ({ ...prev, country }));
    navigation.goBack();
  };

  return (
    <ScreenWrapper title="Flag Customizer" navigation={navigation}>
      <View style={styles.preview}>
        <FlagPreview colors={country.flagColors} pattern={country.flagPattern} width={200} height={120} />
      </View>

      <Text style={styles.label}>Pattern</Text>
      <View style={styles.row}>
        {FLAG_PATTERNS.map((p) => (
          <TouchableOpacity key={p} style={[styles.chip, country.flagPattern === p && styles.chipActive]} onPress={() => setCountry({ ...country, flagPattern: p })}>
            <Text style={styles.chipText}>{p}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {[0, 1, 2].map((i) => (
        <View key={i}>
          <Text style={styles.label}>Color {i + 1}</Text>
          <View style={styles.colorRow}>
            {COLOR_OPTIONS.map((c) => (
              <TouchableOpacity key={c} style={[styles.colorDot, { backgroundColor: c }, country.flagColors[i] === c && styles.colorSelected]} onPress={() => setColor(i, c)} />
            ))}
          </View>
        </View>
      ))}

      <Text style={styles.label}>Badge Shape</Text>
      <View style={styles.row}>
        {BADGE_SHAPES.map((s) => (
          <TouchableOpacity key={s} style={[styles.chip, country.badgeShape === s && styles.chipActive]} onPress={() => setCountry({ ...country, badgeShape: s })}>
            <Text style={styles.chipText}>{s}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Button title="Save Flag" onPress={save} style={styles.btn} />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  preview: { alignItems: 'center', marginBottom: SPACING.lg },
  label: { color: COLORS.gold, fontWeight: '700', marginTop: SPACING.md, marginBottom: SPACING.sm },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm },
  chip: { backgroundColor: COLORS.card, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: COLORS.cardBorder },
  chipActive: { borderColor: COLORS.gold, backgroundColor: COLORS.backgroundLight },
  chipText: { color: COLORS.text, fontSize: 12, textTransform: 'capitalize' },
  colorRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  colorDot: { width: 32, height: 32, borderRadius: 16, borderWidth: 2, borderColor: 'transparent' },
  colorSelected: { borderColor: COLORS.gold, borderWidth: 3 },
  btn: { marginTop: SPACING.lg },
});
