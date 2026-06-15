import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import Card from '../components/Card';
import { COLORS, SPACING } from '../theme';
import { useGame } from '../context/GameContext';
import { ACHIEVEMENTS } from '../data/tournaments';

export default function TrophyRoomScreen({ navigation }) {
  const { gameState } = useGame();
  const trophies = gameState.trophies || [];
  const achievements = gameState.achievements || [];

  return (
    <ScreenWrapper title="Trophy Room" navigation={navigation}>
      <Text style={styles.header}>🏆 Trophy Cabinet</Text>

      {trophies.length === 0 ? (
        <Card>
          <Text style={styles.empty}>No trophies yet. Win the Global Cup!</Text>
        </Card>
      ) : (
        trophies.map((t, i) => (
          <Card key={i} variant="gold">
            <Text style={styles.trophy}>🏆 {t.name || 'Global Cup'}</Text>
            <Text style={styles.year}>{t.year || 'Season 1'} · {t.country || gameState.country?.name}</Text>
          </Card>
        ))
      )}

      <Text style={styles.section}>Achievements</Text>
      {ACHIEVEMENTS.map((a) => {
        const unlocked = achievements.includes(a.id);
        return (
          <Card key={a.id} style={!unlocked && styles.locked}>
            <Text style={[styles.achTitle, !unlocked && styles.lockedText]}>
              {unlocked ? '✓' : '🔒'} {a.title}
            </Text>
            <Text style={styles.achDesc}>{a.description}</Text>
            {unlocked && <Text style={styles.reward}>+{a.coins} coins {a.gems ? `+ ${a.gems} gems` : ''}</Text>}
          </Card>
        );
      })}
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: { color: COLORS.gold, fontSize: 22, fontWeight: '900', marginBottom: SPACING.lg },
  empty: { color: COLORS.textMuted, textAlign: 'center', fontStyle: 'italic' },
  trophy: { color: COLORS.gold, fontSize: 18, fontWeight: '800' },
  year: { color: COLORS.textMuted, marginTop: 4 },
  section: { color: COLORS.gold, fontWeight: '700', marginTop: SPACING.lg, marginBottom: SPACING.sm },
  locked: { opacity: 0.5 },
  achTitle: { color: COLORS.text, fontWeight: '700' },
  lockedText: { color: COLORS.textMuted },
  achDesc: { color: COLORS.textMuted, fontSize: 12, marginTop: 2 },
  reward: { color: COLORS.gold, fontSize: 12, marginTop: 4 },
});
