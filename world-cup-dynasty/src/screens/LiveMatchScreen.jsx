import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import Button from '../components/Button';
import StatBar from '../components/StatBar';
import MatchTimeline from '../components/MatchTimeline';
import VARModal from '../components/VARModal';
import { COLORS, SPACING } from '../theme';
import { useGame } from '../context/GameContext';
import {
  createMatchState, initMatchStrengths, simulateMinute, resolveVAR,
  getPlayerTeamResult, applyTacticalDecision,
} from '../game/matchEngine';
import { MATCH_DECISIONS, VAR_REACTIONS } from '../data/decisions';
import { updateGroupAfterMatch, advanceKnockoutRound } from '../game/tournamentEngine';
import { createPenaltyShootout } from '../game/penaltyEngine';

export default function LiveMatchScreen({ navigation, route }) {
  const { fixture, isHome, opponent, isRivalry, weather, isKnockout } = route.params;
  const { gameState, setGameState, processMatchResult, unlockAchievement } = useGame();
  const [match, setMatch] = useState(null);
  const [running, setRunning] = useState(false);
  const [showDecisions, setShowDecisions] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    const homeTeam = {
      ...fixture.home,
      squad: fixture.home.id === gameState.country?.id ? gameState.squad : fixture.home.squad,
      chemistry: gameState.teamStats?.chemistry,
      morale: gameState.teamStats?.morale,
      fitness: gameState.teamStats?.fitness,
    };
    const awayTeam = {
      ...fixture.away,
      squad: fixture.away.id === gameState.country?.id ? gameState.squad : fixture.away.squad,
    };

    let m = createMatchState(homeTeam, awayTeam, { isHome, isRivalry, isKnockout, weather });
    m = initMatchStrengths(m);
    setMatch(m);
  }, []);

  const tick = useCallback(() => {
    setMatch((prev) => {
      if (!prev || prev.finished || prev.pendingVAR) return prev;
      let m = simulateMinute({ ...prev });
      if (m.pendingVAR) setRunning(false);
      if (m.pendingDecision) { setShowDecisions(true); setRunning(false); }
      if (m.finished) {
        setRunning(false);
        finishMatch(m);
      }
      return m;
    });
  }, []);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(tick, 800);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, tick]);

  const finishMatch = (finalMatch) => {
    const playerResult = getPlayerTeamResult(finalMatch, gameState.country?.id);
    const resultStr = playerResult === 'win' ? 'win' : playerResult === 'loss' ? 'loss' : 'draw';

    processMatchResult(resultStr, finalMatch, opponent.id);

    if (playerResult === 'win') unlockAchievement('first_win');

    setGameState((prev) => {
      let tournament = { ...prev.tournament };

      if (tournament.stage === 'group') {
        const group = tournament.groups.find((g) =>
          g.teams.some((t) => t.id === fixture.home.id)
        );
        if (group) {
          const updated = updateGroupAfterMatch(
            group, fixture.home.id, fixture.away.id,
            finalMatch.homeTeam.score, finalMatch.awayTeam.score
          );
          tournament.groups = tournament.groups.map((g) => g.id === group.id ? updated : g);
        }
        // Simulate other group matches
        tournament.groups.forEach((g) => {
          g.fixtures.forEach((f) => {
            if (!f.played && f.home.id !== prev.country?.id && f.away.id !== prev.country?.id) {
              const hScore = Math.floor(Math.random() * 4);
              const aScore = Math.floor(Math.random() * 4);
              updateGroupAfterMatch(g, f.home.id, f.away.id, hScore, aScore);
            }
          });
        });
      } else {
        const koMatch = tournament.knockout.find((m) => m.id === fixture.id);
        if (koMatch) {
          koMatch.homeScore = finalMatch.homeTeam.score;
          koMatch.awayScore = finalMatch.awayTeam.score;
          koMatch.played = true;
        }
        if (tournament.knockout.every((m) => m.played)) {
          tournament = advanceKnockoutRound(tournament);
        }
      }

      return { ...prev, tournament, currentMatch: finalMatch };
    });

    if (finalMatch.wentToPenalties) {
      navigation.replace('PenaltyShootout', { fixture, match: finalMatch });
      return;
    }

    setTimeout(() => {
      navigation.navigate('FanReactions', {
        result: resultStr,
        score: `${finalMatch.homeTeam.score}-${finalMatch.awayTeam.score}`,
        isRivalry,
      });
    }, 1500);
  };

  const handleVAR = (reactionId) => {
    const reaction = VAR_REACTIONS.find((r) => r.id === reactionId);
    setMatch((prev) => {
      const { match: updated } = resolveVAR({ ...prev }, prev.pendingVAR, reaction);
      return updated;
    });
    setRunning(true);
  };

  const handleDecision = (decision) => {
    setMatch((prev) => applyTacticalDecision({ ...prev }, decision, isHome));
    setShowDecisions(false);
    setRunning(true);
  };

  if (!match) return <ScreenWrapper title="Live Match" navigation={navigation} scroll={false}><Text style={styles.loading}>Preparing match...</Text></ScreenWrapper>;

  const playerScore = isHome ? match.homeTeam.score : match.awayTeam.score;
  const oppScore = isHome ? match.awayTeam.score : match.homeTeam.score;

  return (
    <ScreenWrapper title="Live Match" navigation={navigation} scroll={false}>
      <View style={styles.scoreboard}>
        <View style={styles.scoreTeam}>
          <Text style={styles.scoreName} numberOfLines={1}>{match.homeTeam.name}</Text>
          <Text style={styles.scoreNum}>{match.homeTeam.score}</Text>
        </View>
        <View style={styles.clock}>
          <Text style={styles.minute}>{match.minute}'</Text>
          <Text style={styles.phase}>{match.phase?.replace('_', ' ')}</Text>
        </View>
        <View style={styles.scoreTeam}>
          <Text style={styles.scoreName} numberOfLines={1}>{match.awayTeam.name}</Text>
          <Text style={styles.scoreNum}>{match.awayTeam.score}</Text>
        </View>
      </View>

      <View style={styles.stats}>
        <Text style={styles.statLabel}>Possession {Math.round(match.possession)}%</Text>
        <StatBar label="Momentum" value={match.momentum} color={match.momentum > 50 ? COLORS.success : COLORS.danger} />
        <View style={styles.statRow}>
          <Text style={styles.stat}>Shots: {isHome ? match.shots.home : match.shots.away} - {isHome ? match.shots.away : match.shots.home}</Text>
          <Text style={styles.stat}>YC: {match.yellowCards.home}-{match.yellowCards.away}</Text>
        </View>
        <Text style={styles.weather}>🌤 {match.weather?.label} · Ref: {match.referee?.name} ({match.referee?.personality})</Text>
      </View>

      <MatchTimeline events={match.events} />

      {!match.finished && (
        <View style={styles.controls}>
          {!running ? (
            <Button title="▶ Resume" variant="gold" onPress={() => setRunning(true)} />
          ) : (
            <Button title="⏸ Pause" variant="secondary" onPress={() => setRunning(false)} />
          )}
          <Button title="Tactical Decision" variant="outline" onPress={() => setShowDecisions(true)} style={styles.ctrlBtn} />
        </View>
      )}

      {showDecisions && (
        <View style={styles.decisions}>
          <Text style={styles.decTitle}>Manager Decision</Text>
          {MATCH_DECISIONS.slice(0, 4).map((d) => (
            <TouchableOpacity key={d.id} style={styles.decBtn} onPress={() => handleDecision(d)}>
              <Text style={styles.decLabel}>{d.label}</Text>
              <Text style={styles.decDesc}>{d.description}</Text>
            </TouchableOpacity>
          ))}
          <Button title="Cancel" variant="secondary" onPress={() => { setShowDecisions(false); setRunning(true); }} />
        </View>
      )}

      <VARModal
        visible={!!match.pendingVAR}
        varEvent={match.pendingVAR}
        onReaction={handleVAR}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  loading: { color: COLORS.textMuted, textAlign: 'center', marginTop: 40 },
  scoreboard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.card, borderRadius: 16, padding: SPACING.md, marginBottom: SPACING.sm },
  scoreTeam: { flex: 1, alignItems: 'center' },
  scoreName: { color: COLORS.text, fontWeight: '700', fontSize: 13 },
  scoreNum: { color: COLORS.gold, fontSize: 36, fontWeight: '900' },
  clock: { alignItems: 'center', paddingHorizontal: SPACING.md },
  minute: { color: COLORS.gold, fontSize: 20, fontWeight: '800' },
  phase: { color: COLORS.textMuted, fontSize: 10, textTransform: 'uppercase' },
  stats: { marginBottom: SPACING.sm },
  statLabel: { color: COLORS.text, fontSize: 13, marginBottom: 4 },
  statRow: { flexDirection: 'row', justifyContent: 'space-between' },
  stat: { color: COLORS.textMuted, fontSize: 12 },
  weather: { color: COLORS.textMuted, fontSize: 11, marginTop: 4 },
  controls: { marginTop: SPACING.sm },
  ctrlBtn: { marginTop: SPACING.sm },
  decisions: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: COLORS.overlay, padding: SPACING.md, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  decTitle: { color: COLORS.gold, fontWeight: '800', fontSize: 18, marginBottom: SPACING.sm },
  decBtn: { backgroundColor: COLORS.card, padding: SPACING.md, borderRadius: 10, marginBottom: SPACING.sm },
  decLabel: { color: COLORS.text, fontWeight: '700' },
  decDesc: { color: COLORS.textMuted, fontSize: 12, marginTop: 2 },
});
