import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import Button from '../components/Button';
import { COLORS, SPACING } from '../theme';
import { useGame } from '../context/GameContext';
import { createPenaltyShootout, takePenalty, getPenaltyDirections, getDirectionLabel } from '../game/penaltyEngine';

export default function PenaltyShootoutScreen({ navigation, route }) {
  const { fixture, match } = route.params;
  const { gameState, unlockAchievement } = useGame();
  const [shootout, setShootout] = useState(() => createPenaltyShootout(fixture.home, fixture.away));
  const [phase, setPhase] = useState('shoot'); // shoot or save
  const [lastResult, setLastResult] = useState(null);
  const directions = getPenaltyDirections();

  const isPlayerTurn = shootout.currentKicker === (fixture.home.id === gameState.country?.id ? 'home' : 'away');
  const kicker = gameState.squad?.find((p) => p.isPenaltyTaker) || gameState.squad?.[0];
  const gk = gameState.squad?.find((p) => p.position === 'GK') || gameState.squad?.[0];

  const handleShot = (shotDir) => {
    const aiDive = directions[Math.floor(Math.random() * directions.length)];
    const { shootout: updated, scored, pressure } = takePenalty(shootout, kicker, gk, shotDir, aiDive);
    setShootout(updated);
    setLastResult({ scored, shotDir, dive: aiDive, pressure });

    if (updated.finished) {
      const playerSide = fixture.home.id === gameState.country?.id ? 'home' : 'away';
      if (updated.winner === playerSide) unlockAchievement('penalties');
      setTimeout(() => navigation.navigate('FanReactions', { result: updated.winner === playerSide ? 'win' : 'loss', penalties: true }), 2000);
    }
  };

  const handleSave = (diveDir) => {
    const aiShot = directions[Math.floor(Math.random() * directions.length)];
    const oppKicker = { shooting: 75, composure: 70, name: 'Opponent' };
    const { shootout: updated, scored, pressure } = takePenalty(shootout, oppKicker, gk, aiShot, diveDir);
    setShootout(updated);
    setLastResult({ scored, shotDir: aiShot, dive: diveDir, pressure });

    if (updated.finished) {
      const playerSide = fixture.home.id === gameState.country?.id ? 'home' : 'away';
      setTimeout(() => navigation.navigate('FanReactions', { result: updated.winner === playerSide ? 'win' : 'loss', penalties: true }), 2000);
    }
  };

  return (
    <ScreenWrapper title="Penalty Shootout" navigation={navigation}>
      <View style={styles.scoreboard}>
        <Text style={styles.team}>{shootout.homeTeam.name}</Text>
        <Text style={styles.score}>{shootout.homeTeam.score} - {shootout.awayTeam.score}</Text>
        <Text style={styles.team}>{shootout.awayTeam.name}</Text>
      </View>
      <Text style={styles.round}>Round {shootout.round} · Pressure: {shootout.pressure}%</Text>

      {lastResult && (
        <Text style={[styles.result, { color: lastResult.scored ? COLORS.danger : COLORS.success }]}>
          {lastResult.scored ? 'GOAL!' : 'SAVED!'} — {getDirectionLabel(lastResult.shotDir)}
        </Text>
      )}

      {!shootout.finished && isPlayerTurn && (
        <View>
          <Text style={styles.prompt}>Choose shot direction:</Text>
          <View style={styles.grid}>
            {directions.map((d) => (
              <TouchableOpacity key={d} style={styles.dirBtn} onPress={() => handleShot(d)}>
                <Text style={styles.dirText}>{getDirectionLabel(d)}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {!shootout.finished && !isPlayerTurn && (
        <View>
          <Text style={styles.prompt}>Choose dive direction:</Text>
          <View style={styles.grid}>
            {directions.map((d) => (
              <TouchableOpacity key={d} style={styles.dirBtn} onPress={() => handleSave(d)}>
                <Text style={styles.dirText}>{getDirectionLabel(d)}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {shootout.history.slice(-3).map((h, i) => (
        <Text key={i} style={styles.history}>
          R{h.round}: {h.kicker} — {h.scored ? '⚽' : '❌'}
        </Text>
      ))}
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  scoreboard: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: COLORS.card, padding: SPACING.lg, borderRadius: 16, marginBottom: SPACING.md },
  team: { color: COLORS.text, fontWeight: '700', flex: 1, textAlign: 'center' },
  score: { color: COLORS.gold, fontSize: 32, fontWeight: '900' },
  round: { color: COLORS.textMuted, textAlign: 'center', marginBottom: SPACING.md },
  result: { fontSize: 20, fontWeight: '800', textAlign: 'center', marginBottom: SPACING.md },
  prompt: { color: COLORS.gold, fontWeight: '700', textAlign: 'center', marginBottom: SPACING.md },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm, justifyContent: 'center' },
  dirBtn: { backgroundColor: COLORS.card, padding: SPACING.md, borderRadius: 12, borderWidth: 1, borderColor: COLORS.gold, minWidth: '40%' },
  dirText: { color: COLORS.text, fontWeight: '600', textAlign: 'center' },
  history: { color: COLORS.textMuted, textAlign: 'center', marginTop: 4 },
});
