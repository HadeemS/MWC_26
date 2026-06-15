import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import Button from '../components/Button';
import PlayerCard from '../components/PlayerCard';
import StatBar from '../components/StatBar';
import CurrencyBar from '../components/CurrencyBar';
import TeamBadge from '../components/TeamBadge';
import { COLORS, SPACING } from '../theme';
import { useGame } from '../context/GameContext';

export default function SquadHubScreen({ navigation }) {
  const { gameState, startTournament } = useGame();
  const { country, squad, teamStats, manager, economy } = gameState;

  const handleStartTournament = () => {
    startTournament();
    navigation.navigate('Tournament');
  };

  return (
    <ScreenWrapper title="Squad Hub" navigation={navigation} rightAction={
      <CurrencyBar coins={economy?.coins || 0} gems={economy?.gems || 0} />
    }>
      <View style={styles.header}>
        <TeamBadge colors={country?.flagColors} shape={country?.badgeShape} size={48} />
        <View style={styles.headerInfo}>
          <Text style={styles.country}>{country?.name}</Text>
          <Text style={styles.manager}>Mgr: {manager?.name}</Text>
        </View>
      </View>

      <View style={styles.stats}>
        <StatBar label="Chemistry" value={teamStats?.chemistry || 75} />
        <StatBar label="Morale" value={teamStats?.morale || 75} color={COLORS.success} />
        <StatBar label="Fitness" value={teamStats?.fitness || 85} color={COLORS.info} />
        <StatBar label="Fan Approval" value={teamStats?.fanApproval || 70} color={COLORS.accent} />
      </View>

      <View style={styles.nav}>
        <Button title="Tactics" variant="secondary" onPress={() => navigation.navigate('Tactics')} style={styles.navBtn} />
        <Button title="Training" variant="secondary" onPress={() => navigation.navigate('Training')} style={styles.navBtn} />
        <Button title="Youth Academy" variant="secondary" onPress={() => navigation.navigate('YouthAcademy')} style={styles.navBtn} />
        <Button title="Scouting" variant="secondary" onPress={() => navigation.navigate('Scouting')} style={styles.navBtn} />
      </View>

      <Text style={styles.section}>Squad ({squad?.length || 0})</Text>
      <FlatList
        data={squad}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <PlayerCard player={item} onPress={() => navigation.navigate('PlayerEditor', { playerId: item.id })} compact />
        )}
      />

      <View style={styles.actions}>
        <Button title="🏆 Start Global Cup" variant="gold" onPress={handleStartTournament} />
        <Button title="Trophy Room" variant="secondary" onPress={() => navigation.navigate('TrophyRoom')} style={styles.btn} />
        <Button title="Rivalries" variant="secondary" onPress={() => navigation.navigate('RivalryHistory')} style={styles.btn} />
        <Button title="Legacy Career" variant="secondary" onPress={() => navigation.navigate('LegacyCareer')} style={styles.btn} />
        <Button title="Store" variant="outline" onPress={() => navigation.navigate('Store')} style={styles.btn} />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.md },
  headerInfo: { marginLeft: SPACING.md },
  country: { color: COLORS.gold, fontSize: 20, fontWeight: '800' },
  manager: { color: COLORS.textMuted, fontSize: 13 },
  stats: { marginBottom: SPACING.md },
  nav: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm, marginBottom: SPACING.md },
  navBtn: { flex: 1, minWidth: '45%' },
  section: { color: COLORS.textMuted, fontWeight: '700', marginBottom: SPACING.sm },
  actions: { marginTop: SPACING.lg },
  btn: { marginTop: SPACING.sm },
});
