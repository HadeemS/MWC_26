import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import Button from '../components/Button';
import PlayerCard from '../components/PlayerCard';
import Card from '../components/Card';
import { COLORS, SPACING } from '../theme';
import { useGame } from '../context/GameContext';
import { getScoutRegions, sendScout } from '../game/scoutingEngine';
import { spendCoins } from '../game/economyEngine';

export default function ScoutingScreen({ navigation }) {
  const { gameState, setGameState } = useGame();
  const scouting = gameState.scouting || { activeReports: [] };
  const regions = getScoutRegions();

  const scout = (regionId) => {
    const region = regions.find((r) => r.id === regionId);
    const result = spendCoins(gameState.economy, 'scout', region.cost);
    if (!result.success) return;

    const report = sendScout(regionId, scouting.level);
    setGameState((prev) => ({
      ...prev,
      economy: result.economy,
      scouting: {
        ...scouting,
        activeReports: [...(scouting.activeReports || []), report],
      },
    }));
  };

  const signPlayer = (report) => {
    setGameState((prev) => ({
      ...prev,
      squad: [...prev.squad, report.player],
      scouting: {
        ...scouting,
        activeReports: scouting.activeReports.filter((r) => r.id !== report.id),
      },
    }));
  };

  return (
    <ScreenWrapper title="Scouting" navigation={navigation}>
      <Text style={styles.section}>Send Scouts to Regions</Text>
      {regions.map((r) => (
        <Card key={r.id}>
          <View style={styles.row}>
            <View style={styles.info}>
              <Text style={styles.name}>{r.name}</Text>
              <Text style={styles.cost}>{r.cost} coins</Text>
            </View>
            <Button title="Scout" variant="gold" onPress={() => scout(r.id)} style={styles.scoutBtn} />
          </View>
        </Card>
      ))}

      <Text style={styles.section}>Scout Reports</Text>
      {(scouting.activeReports || []).length === 0 ? (
        <Text style={styles.empty}>No active reports. Send a scout!</Text>
      ) : (
        scouting.activeReports.map((report) => (
          <View key={report.id}>
            <Text style={styles.reportLabel}>{report.label} — {report.region}</Text>
            <PlayerCard player={report.player} />
            <Button title="Sign Player" variant="gold" onPress={() => signPlayer(report)} style={styles.signBtn} />
          </View>
        ))
      )}
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  section: { color: COLORS.gold, fontWeight: '700', marginTop: SPACING.md, marginBottom: SPACING.sm },
  row: { flexDirection: 'row', alignItems: 'center' },
  info: { flex: 1 },
  name: { color: COLORS.text, fontWeight: '700' },
  cost: { color: COLORS.textMuted, fontSize: 12 },
  scoutBtn: { paddingHorizontal: 16, minHeight: 40 },
  empty: { color: COLORS.textMuted, fontStyle: 'italic', textAlign: 'center' },
  reportLabel: { color: COLORS.gold, fontWeight: '600', marginBottom: 4 },
  signBtn: { marginBottom: SPACING.md },
});
