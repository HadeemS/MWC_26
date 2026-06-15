import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import Button from '../components/Button';
import TeamBadge from '../components/TeamBadge';
import Card from '../components/Card';
import { COLORS, SPACING } from '../theme';
import { useGame } from '../context/GameContext';
import { isRivalMatch } from '../game/rivalryEngine';
import { getRandomWeather } from '../data/weather';

export default function MatchPreviewScreen({ navigation, route }) {
  const { fixture } = route.params;
  const { gameState } = useGame();
  const country = gameState.country;
  const isHome = fixture.home.id === country?.id;
  const opponent = isHome ? fixture.away : fixture.home;
  const isRivalry = isRivalMatch(country, opponent.id);
  const weather = getRandomWeather();

  const startMatch = () => {
    navigation.navigate('LiveMatch', {
      fixture,
      isHome,
      opponent,
      isRivalry,
      weather,
      isKnockout: fixture.isKnockout || fixture.stage !== 'group',
    });
  };

  return (
    <ScreenWrapper title="Match Preview" navigation={navigation}>
      <Card variant="gold">
        <View style={styles.teams}>
          <View style={styles.team}>
            <TeamBadge colors={fixture.home.flagColors || country?.flagColors} shape={fixture.home.badgeShape || 'shield'} size={56} />
            <Text style={styles.teamName}>{fixture.home.name}</Text>
          </View>
          <Text style={styles.vs}>VS</Text>
          <View style={styles.team}>
            <TeamBadge colors={fixture.away.flagColors} shape={fixture.away.badgeShape || 'shield'} size={56} />
            <Text style={styles.teamName}>{fixture.away.name}</Text>
          </View>
        </View>
      </Card>

      {isRivalry && <Text style={styles.rivalry}>🔥 RIVALRY MATCH</Text>}

      <Card>
        <Text style={styles.info}>Stage: {fixture.stage || 'Group Stage'}</Text>
        <Text style={styles.info}>Weather: {weather.label}</Text>
        <Text style={styles.info}>Venue: {isHome ? country?.stadium : `${opponent.name} Arena`}</Text>
        <Text style={styles.info}>Formation: {gameState.formation || '4-3-3'}</Text>
      </Card>

      <Button title="Pre-Match Press Conference" variant="secondary" onPress={() => navigation.navigate('PressConference', { type: 'pre_match', fixture })} style={styles.btn} />
      <Button title="Kick Off!" variant="gold" onPress={startMatch} style={styles.btn} />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  teams: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' },
  team: { alignItems: 'center', flex: 1 },
  teamName: { color: COLORS.text, fontWeight: '700', marginTop: SPACING.sm, textAlign: 'center' },
  vs: { color: COLORS.gold, fontSize: 24, fontWeight: '900' },
  rivalry: { color: COLORS.danger, fontWeight: '800', textAlign: 'center', marginVertical: SPACING.md, fontSize: 16 },
  info: { color: COLORS.text, marginBottom: 6 },
  btn: { marginTop: SPACING.sm },
});
