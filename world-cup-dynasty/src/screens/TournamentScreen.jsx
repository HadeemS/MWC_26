import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import Button from '../components/Button';
import Card from '../components/Card';
import { COLORS, SPACING } from '../theme';
import { useGame } from '../context/GameContext';
import { getNextFixture, getGroupStandings, advanceToKnockout } from '../game/tournamentEngine';

export default function TournamentScreen({ navigation }) {
  const { gameState, setGameState } = useGame();
  const tournament = gameState.tournament;

  if (!tournament) {
    return (
      <ScreenWrapper title="Tournament" navigation={navigation}>
        <Text style={styles.empty}>No active tournament. Start from Squad Hub.</Text>
        <Button title="Back to Squad" onPress={() => navigation.navigate('SquadHub')} />
      </ScreenWrapper>
    );
  }

  const nextFixture = getNextFixture(tournament);
  const playerGroup = tournament.groups?.find((g) => g.teams.some((t) => t.id === tournament.playerTeamId));

  const handleNextMatch = () => {
    if (nextFixture) {
      navigation.navigate('MatchPreview', { fixture: nextFixture });
    }
  };

  const advanceKnockout = () => {
    if (tournament.stage === 'group' && tournament.groups.every((g) => g.completed)) {
      setGameState((prev) => ({ ...prev, tournament: advanceToKnockout(prev.tournament) }));
    }
  };

  return (
    <ScreenWrapper title="Global Cup" navigation={navigation}>
      <Card variant="gold">
        <Text style={styles.cupName}>🏆 {tournament.name}</Text>
        <Text style={styles.stage}>{tournament.stage === 'group' ? 'Group Stage' : tournament.knockout[0]?.stage || 'Knockout'}</Text>
      </Card>

      {playerGroup && (
        <View>
          <Text style={styles.section}>{playerGroup.name} Standings</Text>
          {getGroupStandings(playerGroup).map((team, i) => (
            <View key={team.id} style={[styles.standingsRow, team.id === tournament.playerTeamId && styles.playerRow]}>
              <Text style={styles.pos}>{i + 1}</Text>
              <Text style={styles.teamName}>{team.name}</Text>
              <Text style={styles.pts}>{team.points} pts</Text>
              <Text style={styles.gd}>{team.goalsFor - team.goalsAgainst > 0 ? '+' : ''}{team.goalsFor - team.goalsAgainst}</Text>
            </View>
          ))}
        </View>
      )}

      {tournament.knockout?.length > 0 && tournament.stage === 'knockout' && (
        <View>
          <Text style={styles.section}>Knockout Bracket</Text>
          {tournament.knockout.map((m) => (
            <Card key={m.id}>
              <Text style={styles.matchText}>
                {m.home.name} {m.played ? `${m.homeScore}-${m.awayScore}` : 'vs'} {m.away.name}
              </Text>
              <Text style={styles.matchStage}>{m.stage}</Text>
            </Card>
          ))}
        </View>
      )}

      {nextFixture ? (
        <Button title={`Next: ${nextFixture.home.id === tournament.playerTeamId ? nextFixture.away.name : nextFixture.home.name}`} variant="gold" onPress={handleNextMatch} style={styles.btn} />
      ) : tournament.stage === 'group' && tournament.groups.every((g) => g.completed) ? (
        <Button title="Advance to Knockout" variant="gold" onPress={advanceKnockout} style={styles.btn} />
      ) : (
        <Text style={styles.wait}>Waiting for other results...</Text>
      )}

      <Button title="Press Conference" variant="secondary" onPress={() => navigation.navigate('PressConference', { type: 'pre_match' })} style={styles.btn} />
      <Button title="Locker Room" variant="secondary" onPress={() => navigation.navigate('LockerRoom')} style={styles.btn} />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  empty: { color: COLORS.textMuted, textAlign: 'center', marginBottom: SPACING.lg },
  cupName: { color: COLORS.gold, fontSize: 22, fontWeight: '900', textAlign: 'center' },
  stage: { color: COLORS.textMuted, textAlign: 'center', marginTop: 4 },
  section: { color: COLORS.gold, fontWeight: '700', marginTop: SPACING.lg, marginBottom: SPACING.sm },
  standingsRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: COLORS.cardBorder },
  playerRow: { backgroundColor: COLORS.backgroundLight, borderRadius: 8, paddingHorizontal: 8 },
  pos: { width: 24, color: COLORS.textMuted, fontWeight: '700' },
  teamName: { flex: 1, color: COLORS.text, fontWeight: '600' },
  pts: { color: COLORS.gold, fontWeight: '700', width: 50, textAlign: 'right' },
  gd: { color: COLORS.textMuted, width: 36, textAlign: 'right' },
  matchText: { color: COLORS.text, fontWeight: '700' },
  matchStage: { color: COLORS.textMuted, fontSize: 12 },
  btn: { marginTop: SPACING.sm },
  wait: { color: COLORS.textMuted, textAlign: 'center', marginTop: SPACING.lg },
});
