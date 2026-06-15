import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import Card from '../components/Card';
import { COLORS, SPACING } from '../theme';
import { useGame } from '../context/GameContext';
import { getRivalry, getRivalryIntensity } from '../game/rivalryEngine';
import { COUNTRIES } from '../data/countries';

export default function RivalryHistoryScreen({ navigation }) {
  const { gameState } = useGame();
  const rivals = gameState.country?.rivals || [];
  const rivalries = gameState.rivalries || {};

  return (
    <ScreenWrapper title="Rivalry History" navigation={navigation}>
      <Text style={styles.header}>⚔️ Rival Nations</Text>

      {rivals.length === 0 ? (
        <Text style={styles.empty}>No rivals configured for your nation.</Text>
      ) : (
        rivals.map((rivalId) => {
          const country = COUNTRIES.find((c) => c.id === rivalId);
          const rivalry = getRivalry(rivalries, gameState.country?.id, rivalId);
          const intensity = getRivalryIntensity(rivalry);

          return (
            <Card key={rivalId} variant="gold">
              <Text style={styles.rivalName}>{country?.name || rivalId}</Text>
              <Text style={styles.nick}>{country?.nickname}</Text>
              <View style={styles.record}>
                <Text style={styles.stat}>W: {rivalry.wins}</Text>
                <Text style={styles.stat}>D: {rivalry.draws}</Text>
                <Text style={styles.stat}>L: {rivalry.losses}</Text>
              </View>
              <Text style={styles.intensity}>Tension: {intensity}%</Text>
              {rivalry.controversialMatches > 0 && (
                <Text style={styles.controversy}>Controversial matches: {rivalry.controversialMatches}</Text>
              )}
            </Card>
          );
        })
      )}
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: { color: COLORS.gold, fontSize: 20, fontWeight: '800', marginBottom: SPACING.md },
  empty: { color: COLORS.textMuted, fontStyle: 'italic' },
  rivalName: { color: COLORS.text, fontSize: 18, fontWeight: '800' },
  nick: { color: COLORS.textMuted, marginBottom: SPACING.sm },
  record: { flexDirection: 'row', gap: SPACING.lg },
  stat: { color: COLORS.gold, fontWeight: '700' },
  intensity: { color: COLORS.danger, marginTop: SPACING.sm, fontWeight: '600' },
  controversy: { color: COLORS.warning, fontSize: 12, marginTop: 4 },
});
