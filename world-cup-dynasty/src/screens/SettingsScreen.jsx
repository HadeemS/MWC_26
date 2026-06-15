import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, Alert } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import Button from '../components/Button';
import { COLORS, SPACING } from '../theme';
import { useGame } from '../context/GameContext';
import { saveSettings } from '../game/saveManager';

export default function SettingsScreen({ navigation }) {
  const { gameState, setGameState, saveCurrentGame } = useGame();
  const [settings, setSettings] = useState(gameState.settings || { sound: true, music: true, notifications: true });

  const toggle = (key) => {
    const updated = { ...settings, [key]: !settings[key] };
    setSettings(updated);
    setGameState((prev) => ({ ...prev, settings: updated }));
    saveSettings(updated);
  };

  const handleSave = async () => {
    await saveCurrentGame();
    Alert.alert('Saved', 'Game saved successfully!');
  };

  return (
    <ScreenWrapper title="Settings" navigation={navigation}>
      <View style={styles.row}>
        <Text style={styles.label}>Sound Effects</Text>
        <Switch value={settings.sound} onValueChange={() => toggle('sound')} trackColor={{ true: COLORS.gold }} />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Music</Text>
        <Switch value={settings.music} onValueChange={() => toggle('music')} trackColor={{ true: COLORS.gold }} />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Notifications</Text>
        <Switch value={settings.notifications} onValueChange={() => toggle('notifications')} trackColor={{ true: COLORS.gold }} />
      </View>

      <Button title="Save Game" variant="gold" onPress={handleSave} style={styles.btn} />
      <Button title="Save Slots" variant="secondary" onPress={() => navigation.navigate('SaveSlots')} style={styles.btn} />

      <Text style={styles.version}>World Cup Dynasty v1.0.0</Text>
      <Text style={styles.legal}>All teams, players, and tournaments are fictional.</Text>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: SPACING.md, borderBottomWidth: 1, borderBottomColor: COLORS.cardBorder },
  label: { color: COLORS.text, fontSize: 16 },
  btn: { marginTop: SPACING.md },
  version: { color: COLORS.textMuted, textAlign: 'center', marginTop: SPACING.xl },
  legal: { color: COLORS.textMuted, textAlign: 'center', fontSize: 11, marginTop: 4 },
});
