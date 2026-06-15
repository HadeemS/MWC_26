import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import Button from '../components/Button';
import { COLORS, SPACING } from '../theme';

const STYLES = ['Tactical Genius', 'Motivator', 'Disciplinarian', 'Youth Developer', 'Big Game Manager'];
const APPEARANCES = ['Formal Suit', 'Tracksuit', 'Casual Smart', 'Club Jacket', 'Rain Coat'];

export default function ManagerCreationScreen({ navigation, route }) {
  const gameMode = route.params?.gameMode || 'quick';
  const [name, setName] = useState('');
  const [style, setStyle] = useState(STYLES[0]);
  const [appearance, setAppearance] = useState(APPEARANCES[0]);

  const handleContinue = () => {
    if (!name.trim()) return;
    navigation.navigate('CountrySelect', {
      gameMode,
      manager: { name: name.trim(), style, appearance, reputation: 50 },
    });
  };

  return (
    <ScreenWrapper title="Create Manager" navigation={navigation}>
      <Text style={styles.label}>Manager Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
        placeholderTextColor={COLORS.textMuted}
        maxLength={24}
      />

      <Text style={styles.label}>Management Style</Text>
      {STYLES.map((s) => (
        <TouchableOpacity key={s} style={[styles.option, style === s && styles.selected]} onPress={() => setStyle(s)}>
          <Text style={[styles.optionText, style === s && styles.selectedText]}>{s}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.label}>Appearance</Text>
      {APPEARANCES.map((a) => (
        <TouchableOpacity key={a} style={[styles.option, appearance === a && styles.selected]} onPress={() => setAppearance(a)}>
          <Text style={[styles.optionText, appearance === a && styles.selectedText]}>{a}</Text>
        </TouchableOpacity>
      ))}

      <Button title="Choose Country" onPress={handleContinue} disabled={!name.trim()} style={styles.btn} />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  label: { color: COLORS.gold, fontWeight: '700', fontSize: 14, marginTop: SPACING.md, marginBottom: SPACING.sm },
  input: {
    backgroundColor: COLORS.card, borderRadius: 12, padding: SPACING.md,
    color: COLORS.text, fontSize: 16, borderWidth: 1, borderColor: COLORS.cardBorder,
  },
  option: {
    backgroundColor: COLORS.card, padding: SPACING.md, borderRadius: 10,
    marginBottom: SPACING.sm, borderWidth: 1, borderColor: COLORS.cardBorder,
  },
  selected: { borderColor: COLORS.gold, backgroundColor: COLORS.backgroundLight },
  optionText: { color: COLORS.text, fontSize: 14 },
  selectedText: { color: COLORS.gold, fontWeight: '700' },
  btn: { marginTop: SPACING.lg },
});
