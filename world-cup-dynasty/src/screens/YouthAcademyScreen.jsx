import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import Button from '../components/Button';
import PlayerCard from '../components/PlayerCard';
import Card from '../components/Card';
import { COLORS, SPACING } from '../theme';
import { useGame } from '../context/GameContext';
import { generateAcademyIntake, developYouthPlayer, promoteToSenior, upgradeAcademy } from '../game/youthAcademyEngine';
import { awardCoins } from '../game/economyEngine';

export default function YouthAcademyScreen({ navigation }) {
  const { gameState, setGameState } = useGame();
  const academy = gameState.youthAcademy || { level: 1, players: [], capacity: 8 };

  const scoutIntake = () => {
    const newPlayers = generateAcademyIntake(academy);
    setGameState((prev) => ({
      ...prev,
      youthAcademy: { ...academy, players: [...academy.players, ...newPlayers] },
    }));
  };

  const developAll = () => {
    const developed = academy.players.map((p) => developYouthPlayer(p, academy));
    const stars = developed.filter((p) => p.developed);
    let economy = gameState.economy;
    if (stars.length > 0) economy = awardCoins(economy, 'youth_developed', stars.length * 75);

    setGameState((prev) => ({
      ...prev,
      youthAcademy: { ...academy, players: developed },
      economy,
    }));
  };

  const promote = (player) => {
    setGameState((prev) => ({
      ...prev,
      squad: promoteToSenior(player, prev.squad),
      youthAcademy: { ...academy, players: academy.players.filter((p) => p.id !== player.id) },
    }));
  };

  const upgrade = () => {
    setGameState((prev) => ({
      ...prev,
      youthAcademy: upgradeAcademy(academy),
    }));
  };

  return (
    <ScreenWrapper title="Youth Academy" navigation={navigation}>
      <Card variant="gold">
        <Text style={styles.level}>Academy Level {academy.level}</Text>
        <Text style={styles.meta}>Capacity: {academy.players.length}/{academy.capacity}</Text>
      </Card>

      <View style={styles.actions}>
        <Button title="Scout Intake" variant="gold" onPress={scoutIntake} style={styles.actionBtn} />
        <Button title="Develop All" variant="secondary" onPress={developAll} style={styles.actionBtn} />
        <Button title="Upgrade Academy" variant="outline" onPress={upgrade} style={styles.actionBtn} />
      </View>

      <Text style={styles.section}>Academy Players</Text>
      {academy.players.length === 0 ? (
        <Text style={styles.empty}>No youth players. Scout new intake!</Text>
      ) : (
        academy.players.map((p) => (
          <View key={p.id}>
            <PlayerCard player={p} compact />
            <Button title="Promote to Senior" variant="secondary" onPress={() => promote(p)} style={styles.promoteBtn} />
          </View>
        ))
      )}
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  level: { color: COLORS.gold, fontSize: 20, fontWeight: '800' },
  meta: { color: COLORS.textMuted, marginTop: 4 },
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm, marginVertical: SPACING.md },
  actionBtn: { flex: 1, minWidth: '30%' },
  section: { color: COLORS.textMuted, fontWeight: '700', marginBottom: SPACING.sm },
  empty: { color: COLORS.textMuted, fontStyle: 'italic', textAlign: 'center', padding: SPACING.lg },
  promoteBtn: { marginBottom: SPACING.sm, marginTop: -4 },
});
