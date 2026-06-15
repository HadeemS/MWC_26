import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import Button from '../components/Button';
import StadiumPreview from '../components/StadiumPreview';
import { GRASS_PATTERNS, LIGHTING_STYLES } from '../data/countries';
import { COLORS, SPACING } from '../theme';
import { useGame } from '../context/GameContext';

const SEAT_COLORS = ['#2C3E6B', '#1A1A2E', '#8B1A1A', '#1A6B4A', '#4A235A', '#566573'];

export default function StadiumCustomizerScreen({ navigation, route }) {
  const { country: initial } = route.params;
  const { setGameState } = useGame();
  const [stadium, setStadium] = useState({
    name: initial.stadium || 'National Arena',
    seatColor: initial.seatColor || '#2C3E6B',
    grassPattern: initial.grassPattern || 'classic',
    lighting: initial.lighting || 'floodlight',
  });

  const save = () => {
    setGameState((prev) => ({ ...prev, country: { ...prev.country, ...stadium, stadium: stadium.name } }));
    navigation.goBack();
  };

  return (
    <ScreenWrapper title="Stadium Customizer" navigation={navigation}>
      <View style={styles.preview}>
        <StadiumPreview seatColor={stadium.seatColor} grassPattern={stadium.grassPattern} lighting={stadium.lighting} />
      </View>

      <Text style={styles.label}>Seat Colors</Text>
      <View style={styles.row}>
        {SEAT_COLORS.map((c) => (
          <TouchableOpacity key={c} style={[styles.dot, { backgroundColor: c }, stadium.seatColor === c && styles.selected]} onPress={() => setStadium({ ...stadium, seatColor: c })} />
        ))}
      </View>

      <Text style={styles.label}>Grass Pattern</Text>
      <View style={styles.row}>
        {GRASS_PATTERNS.map((g) => (
          <TouchableOpacity key={g} style={[styles.chip, stadium.grassPattern === g && styles.chipActive]} onPress={() => setStadium({ ...stadium, grassPattern: g })}>
            <Text style={styles.chipText}>{g}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Lighting</Text>
      <View style={styles.row}>
        {LIGHTING_STYLES.map((l) => (
          <TouchableOpacity key={l} style={[styles.chip, stadium.lighting === l && styles.chipActive]} onPress={() => setStadium({ ...stadium, lighting: l })}>
            <Text style={styles.chipText}>{l}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Button title="Save Stadium" onPress={save} style={styles.btn} />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  preview: { alignItems: 'center', marginVertical: SPACING.lg },
  label: { color: COLORS.gold, fontWeight: '700', marginTop: SPACING.md, marginBottom: SPACING.sm },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  dot: { width: 36, height: 36, borderRadius: 8, borderWidth: 2, borderColor: 'transparent' },
  selected: { borderColor: COLORS.gold, borderWidth: 3 },
  chip: { backgroundColor: COLORS.card, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: COLORS.cardBorder },
  chipActive: { borderColor: COLORS.gold },
  chipText: { color: COLORS.text, fontSize: 12, textTransform: 'capitalize' },
  btn: { marginTop: SPACING.lg },
});
