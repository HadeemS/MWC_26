import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import Button from '../components/Button';
import Card from '../components/Card';
import { COLORS, SPACING } from '../theme';
import { useGame } from '../context/GameContext';
import { getSaveSlots, saveGame, loadGame, deleteSave, MAX_SLOTS } from '../game/saveManager';

export default function SaveSlotsScreen({ navigation }) {
  const { gameState, loadSlot, setCurrentSlot, saveCurrentGame } = useGame();
  const [slots, setSlots] = useState([]);

  const refresh = async () => {
    const data = await getSaveSlots();
    setSlots(data);
  };

  useEffect(() => { refresh(); }, []);

  const handleSave = async (index) => {
    setCurrentSlot(index);
    await saveGame(index, gameState);
    Alert.alert('Saved', `Game saved to slot ${index + 1}`);
    refresh();
  };

  const handleLoad = async (index) => {
    const result = await loadSlot(index);
    if (result.success) {
      Alert.alert('Loaded', `Slot ${index + 1} loaded.`);
      navigation.navigate('SquadHub');
    } else {
      Alert.alert('Empty Slot', 'No save data in this slot.');
    }
    refresh();
  };

  const handleDelete = async (index) => {
    await deleteSave(index);
    Alert.alert('Deleted', `Slot ${index + 1} cleared.`);
    refresh();
  };

  return (
    <ScreenWrapper title="Save Slots" navigation={navigation}>
      <Text style={styles.info}>{MAX_SLOTS} save slots available</Text>

      {slots.map((slot) => (
        <Card key={slot.index} variant={slot.occupied ? 'gold' : 'default'}>
          <Text style={styles.slotTitle}>Slot {slot.index + 1}</Text>
          {slot.occupied ? (
            <>
              <Text style={styles.slotMeta}>
                {slot.data.country?.name} · {slot.data.manager?.name}
              </Text>
              <Text style={styles.slotMeta}>
                Mode: {slot.data.gameMode} · Coins: {slot.data.economy?.coins || 0}
              </Text>
              <View style={styles.actions}>
                <Button title="Load" variant="gold" onPress={() => handleLoad(slot.index)} style={styles.actionBtn} />
                <Button title="Overwrite" variant="secondary" onPress={() => handleSave(slot.index)} style={styles.actionBtn} />
                <Button title="Delete" variant="danger" onPress={() => handleDelete(slot.index)} style={styles.actionBtn} />
              </View>
            </>
          ) : (
            <>
              <Text style={styles.empty}>Empty</Text>
              <Button title="Save Here" variant="gold" onPress={() => handleSave(slot.index)} style={styles.btn} />
            </>
          )}
        </Card>
      ))}
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  info: { color: COLORS.textMuted, marginBottom: SPACING.lg },
  slotTitle: { color: COLORS.gold, fontWeight: '800', fontSize: 18 },
  slotMeta: { color: COLORS.textMuted, fontSize: 13, marginTop: 2 },
  empty: { color: COLORS.textMuted, fontStyle: 'italic' },
  actions: { flexDirection: 'row', gap: SPACING.sm, marginTop: SPACING.sm },
  actionBtn: { flex: 1, minHeight: 40, paddingVertical: 8 },
  btn: { marginTop: SPACING.sm },
});
