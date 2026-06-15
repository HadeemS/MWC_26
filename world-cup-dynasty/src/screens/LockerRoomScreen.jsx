import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import Button from '../components/Button';
import Card from '../components/Card';
import { COLORS, SPACING } from '../theme';
import { useGame } from '../context/GameContext';
import { getRandomLockerRoomEvent } from '../data/lockerRoomEvents';
import { processLockerRoomChoice } from '../game/decisionEngine';

export default function LockerRoomScreen({ navigation }) {
  const { gameState, setGameState } = useGame();
  const [event, setEvent] = useState(() => getRandomLockerRoomEvent());
  const [resolved, setResolved] = useState(false);

  const handleChoice = (choice) => {
    const newState = processLockerRoomChoice(gameState, choice);
    setGameState(newState);
    setResolved(true);
  };

  const newEvent = () => {
    setEvent(getRandomLockerRoomEvent());
    setResolved(false);
  };

  return (
    <ScreenWrapper title="Locker Room" navigation={navigation}>
      <Card variant="gold">
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.desc}>{event.description}</Text>
      </Card>

      {!resolved ? (
        <View style={styles.choices}>
          {event.choices.map((c) => (
            <TouchableOpacity key={c.id} style={styles.choiceBtn} onPress={() => handleChoice(c)}>
              <Text style={styles.choiceLabel}>{c.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View>
          <Text style={styles.resolved}>Decision made. Team dynamics updated.</Text>
          <Button title="New Event" variant="secondary" onPress={newEvent} style={styles.btn} />
          <Button title="Back" variant="outline" onPress={() => navigation.goBack()} style={styles.btn} />
        </View>
      )}
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  title: { color: COLORS.gold, fontSize: 18, fontWeight: '800' },
  desc: { color: COLORS.text, marginTop: SPACING.sm, lineHeight: 22 },
  choices: { marginTop: SPACING.lg },
  choiceBtn: { backgroundColor: COLORS.card, padding: SPACING.md, borderRadius: 12, marginBottom: SPACING.sm, borderWidth: 1, borderColor: COLORS.cardBorder },
  choiceLabel: { color: COLORS.text, fontWeight: '600' },
  resolved: { color: COLORS.success, textAlign: 'center', marginVertical: SPACING.lg },
  btn: { marginTop: SPACING.sm },
});
