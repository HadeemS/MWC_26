import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import Button from '../components/Button';
import JerseyPreview from '../components/JerseyPreview';
import { COLORS, SPACING } from '../theme';
import { useGame } from '../context/GameContext';

const COLORS_LIST = ['#1E3A5F', '#FFFFFF', '#D4AF37', '#C0392B', '#2ECC71', '#1A5276', '#1C1C2E', '#F39C12', '#8B1A1A', '#4ECDC4'];

export default function JerseyCustomizerScreen({ navigation, route }) {
  const { country: initial } = route.params;
  const { setGameState } = useGame();
  const [country, setCountry] = useState({ ...initial });

  const ColorPicker = ({ label, field }) => (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.colorRow}>
        {COLORS_LIST.map((c) => (
          <TouchableOpacity
            key={c}
            style={[styles.dot, { backgroundColor: c }, country[field] === c && styles.selected]}
            onPress={() => setCountry({ ...country, [field]: c })}
          />
        ))}
      </View>
    </View>
  );

  return (
    <ScreenWrapper title="Jersey Customizer" navigation={navigation}>
      <View style={styles.preview}>
        <JerseyPreview primary={country.jerseyHome} secondary={country.jerseyAway} accent={country.jerseyAccent} size={100} />
        <JerseyPreview primary={country.jerseyAway} secondary={country.jerseyHome} accent={country.jerseyAccent} size={100} />
      </View>
      <Text style={styles.hint}>Home (left) · Away (right)</Text>

      <ColorPicker label="Home Jersey" field="jerseyHome" />
      <ColorPicker label="Away Jersey" field="jerseyAway" />
      <ColorPicker label="Accent Color" field="jerseyAccent" />

      <Button title="Save Jerseys" onPress={() => { setGameState((p) => ({ ...p, country })); navigation.goBack(); }} style={styles.btn} />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  preview: { flexDirection: 'row', justifyContent: 'center', gap: SPACING.xl, marginVertical: SPACING.lg },
  hint: { textAlign: 'center', color: COLORS.textMuted, fontSize: 12 },
  label: { color: COLORS.gold, fontWeight: '700', marginTop: SPACING.md, marginBottom: SPACING.sm },
  colorRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  dot: { width: 36, height: 36, borderRadius: 8, borderWidth: 2, borderColor: 'transparent' },
  selected: { borderColor: COLORS.gold, borderWidth: 3 },
  btn: { marginTop: SPACING.lg },
});
