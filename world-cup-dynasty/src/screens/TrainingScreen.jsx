import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import Button from '../components/Button';
import StatBar from '../components/StatBar';
import Card from '../components/Card';
import { COLORS, SPACING } from '../theme';
import { useGame } from '../context/GameContext';
import { spendCoins } from '../game/economyEngine';

const SESSIONS = [
  { id: 'fitness', name: 'Fitness Drill', cost: 100, effect: { fitness: 10 } },
  { id: 'shooting', name: 'Finishing Practice', cost: 150, effect: { shooting: 5 } },
  { id: 'tactical', name: 'Tactical Session', cost: 200, effect: { chemistry: 8 } },
  { id: 'recovery', name: 'Recovery Day', cost: 50, effect: { fitness: 15, morale: 5 } },
];

export default function TrainingScreen({ navigation }) {
  const { gameState, setGameState } = useGame();

  const runSession = (session) => {
    const result = spendCoins(gameState.economy, session.id, session.cost);
    if (!result.success) return;

    setGameState((prev) => {
      const teamStats = { ...prev.teamStats };
      Object.entries(session.effect).forEach(([k, v]) => {
        teamStats[k] = Math.min(100, (teamStats[k] || 70) + v);
      });
      return { ...prev, economy: result.economy, teamStats };
    });
  };

  return (
    <ScreenWrapper title="Training" navigation={navigation}>
      <StatBar label="Team Fitness" value={gameState.teamStats?.fitness || 85} />
      <StatBar label="Chemistry" value={gameState.teamStats?.chemistry || 75} />
      <StatBar label="Morale" value={gameState.teamStats?.morale || 75} />

      <Text style={styles.section}>Training Sessions</Text>
      {SESSIONS.map((s) => (
        <Card key={s.id}>
          <View style={styles.row}>
            <View style={styles.info}>
              <Text style={styles.name}>{s.name}</Text>
              <Text style={styles.effect}>
                {Object.entries(s.effect).map(([k, v]) => `+${v} ${k}`).join(' · ')}
              </Text>
            </View>
            <Button title={`${s.cost} 🪙`} onPress={() => runSession(s)} variant="gold" style={styles.buyBtn} />
          </View>
        </Card>
      ))}
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  section: { color: COLORS.gold, fontWeight: '700', marginTop: SPACING.lg, marginBottom: SPACING.sm },
  row: { flexDirection: 'row', alignItems: 'center' },
  info: { flex: 1 },
  name: { color: COLORS.text, fontWeight: '700', fontSize: 15 },
  effect: { color: COLORS.textMuted, fontSize: 12, marginTop: 2 },
  buyBtn: { paddingHorizontal: 12, minHeight: 40 },
});
