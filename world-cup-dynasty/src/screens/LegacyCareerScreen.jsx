import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import Button from '../components/Button';
import Card from '../components/Card';
import StatBar from '../components/StatBar';
import { COLORS, SPACING } from '../theme';
import { useGame } from '../context/GameContext';

export default function LegacyCareerScreen({ navigation }) {
  const { gameState, setGameState } = useGame();
  const legacy = gameState.legacy || { year: 1, maxYears: 20, tournamentsPlayed: 0 };
  const history = gameState.careerHistory || [];

  const advanceYear = () => {
    if (legacy.year >= legacy.maxYears) return;
    setGameState((prev) => ({
      ...prev,
      legacy: {
        ...legacy,
        year: legacy.year + 1,
        tournamentsPlayed: legacy.tournamentsPlayed + 1,
      },
      careerHistory: [
        ...history,
        {
          year: legacy.year,
          country: prev.country?.name,
          trophies: prev.trophies?.length || 0,
          reputation: prev.manager?.reputation || 50,
        },
      ],
    }));
    navigation.navigate('JobOffers');
  };

  return (
    <ScreenWrapper title="Legacy Mode" navigation={navigation}>
      <Card variant="gold">
        <Text style={styles.year}>Year {legacy.year} of {legacy.maxYears}</Text>
        <Text style={styles.meta}>Tournaments: {legacy.tournamentsPlayed}</Text>
        <StatBar label="Manager Reputation" value={gameState.manager?.reputation || 50} />
        <StatBar label="Trophies Won" value={(gameState.trophies?.length || 0) * 20} max={100} color={COLORS.gold} />
      </Card>

      <Text style={styles.section}>Career Timeline</Text>
      {history.length === 0 ? (
        <Text style={styles.empty}>Your legacy begins now...</Text>
      ) : (
        history.map((h, i) => (
          <Card key={i}>
            <Text style={styles.timeline}>Year {h.year}: {h.country}</Text>
            <Text style={styles.timelineMeta}>Rep: {h.reputation} · Trophies: {h.trophies}</Text>
          </Card>
        ))
      )}

      <Button title="Advance to Next Tournament" variant="gold" onPress={advanceYear} disabled={legacy.year >= legacy.maxYears} style={styles.btn} />
      <Button title="View Job Offers" variant="secondary" onPress={() => navigation.navigate('JobOffers')} style={styles.btn} />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  year: { color: COLORS.gold, fontSize: 24, fontWeight: '900', textAlign: 'center' },
  meta: { color: COLORS.textMuted, textAlign: 'center', marginBottom: SPACING.md },
  section: { color: COLORS.gold, fontWeight: '700', marginTop: SPACING.lg, marginBottom: SPACING.sm },
  empty: { color: COLORS.textMuted, fontStyle: 'italic' },
  timeline: { color: COLORS.text, fontWeight: '700' },
  timelineMeta: { color: COLORS.textMuted, fontSize: 12 },
  btn: { marginTop: SPACING.sm },
});
