import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import Button from '../components/Button';
import { COLORS, SPACING } from '../theme';
import { VAR_TYPES } from '../data/referees';
import { VAR_REACTIONS } from '../data/decisions';
import { useGame } from '../context/GameContext';
import { processVARReaction } from '../game/decisionEngine';

export default function VARReviewScreen({ navigation, route }) {
  const varEvent = route.params?.varEvent || VAR_TYPES[0];
  const { gameState, setGameState } = useGame();

  const handleReaction = (reaction) => {
    const newState = processVARReaction(gameState, reaction);
    setGameState(newState);
    navigation.goBack();
  };

  return (
    <ScreenWrapper title="VAR Review" navigation={navigation}>
      <View style={styles.drama}>
        <Text style={styles.icon}>📺</Text>
        <Text style={styles.title}>VAR CHECK IN PROGRESS</Text>
        <Text style={styles.type}>{varEvent.label}</Text>
        <Text style={styles.desc}>{varEvent.description}</Text>
        <View style={styles.scanLines}>
          {[1, 2, 3].map((i) => <View key={i} style={styles.line} />)}
        </View>
        <Text style={styles.reviewing}>Reviewing footage...</Text>
      </View>

      <Text style={styles.reactTitle}>How do you react?</Text>
      {VAR_REACTIONS.map((r) => (
        <Button key={r.id} title={r.label} variant="secondary" onPress={() => handleReaction(r)} style={styles.btn} />
      ))}
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  drama: { alignItems: 'center', backgroundColor: COLORS.card, borderRadius: 20, padding: SPACING.xl, borderWidth: 2, borderColor: COLORS.gold, marginBottom: SPACING.lg },
  icon: { fontSize: 48 },
  title: { color: COLORS.gold, fontSize: 20, fontWeight: '900', marginTop: SPACING.md },
  type: { color: COLORS.text, fontSize: 18, fontWeight: '700', marginTop: SPACING.sm },
  desc: { color: COLORS.textMuted, textAlign: 'center', marginTop: 8 },
  scanLines: { marginVertical: SPACING.lg, width: '100%' },
  line: { height: 2, backgroundColor: COLORS.gold, opacity: 0.3, marginVertical: 8 },
  reviewing: { color: COLORS.goldLight, fontStyle: 'italic' },
  reactTitle: { color: COLORS.gold, fontWeight: '700', marginBottom: SPACING.sm },
  btn: { marginBottom: SPACING.sm },
});
