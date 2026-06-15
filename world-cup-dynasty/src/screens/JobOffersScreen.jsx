import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import Button from '../components/Button';
import Card from '../components/Card';
import TeamBadge from '../components/TeamBadge';
import { COLORS, SPACING } from '../theme';
import { useGame } from '../context/GameContext';
import { generateJobOffers, acceptJobOffer } from '../game/jobOfferEngine';
import { generateSquad } from '../data/fictionalPlayers';

export default function JobOffersScreen({ navigation }) {
  const { gameState, setGameState } = useGame();
  const [offers] = useState(() => generateJobOffers(gameState));
  const [accepted, setAccepted] = useState(null);

  const accept = (offer) => {
    const newState = acceptJobOffer(gameState, offer);
    if (offer.country && offer.type !== 'stay') {
      newState.squad = generateSquad(offer.country.strength);
      newState.country = offer.country;
    }
    setGameState(newState);
    setAccepted(offer.id);
  };

  return (
    <ScreenWrapper title="Job Offers" navigation={navigation}>
      <Text style={styles.header}>📋 Career Opportunities</Text>
      <Text style={styles.sub}>Based on your reputation and performance</Text>

      {offers.map((offer) => (
        <Card key={offer.id} variant={accepted === offer.id ? 'gold' : 'default'}>
          <View style={styles.row}>
            {offer.country && <TeamBadge colors={offer.country.flagColors} shape={offer.country.badgeShape} size={40} />}
            <View style={styles.info}>
              <Text style={styles.title}>{offer.title}</Text>
              <Text style={styles.desc}>{offer.description}</Text>
              <Text style={styles.salary}>Salary: ${offer.salary?.toLocaleString()}</Text>
              <Text style={styles.appeal}>Appeal: {offer.appeal}%</Text>
            </View>
          </View>
          {!accepted && (
            <Button title="Accept Offer" variant="gold" onPress={() => accept(offer)} style={styles.btn} />
          )}
          {accepted === offer.id && <Text style={styles.accepted}>✓ Accepted</Text>}
        </Card>
      ))}

      {accepted && <Button title="Continue Career" variant="gold" onPress={() => navigation.navigate('SquadHub')} />}
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: { color: COLORS.gold, fontSize: 20, fontWeight: '800' },
  sub: { color: COLORS.textMuted, marginBottom: SPACING.lg },
  row: { flexDirection: 'row', alignItems: 'center' },
  info: { flex: 1, marginLeft: SPACING.md },
  title: { color: COLORS.text, fontWeight: '700', fontSize: 16 },
  desc: { color: COLORS.textMuted, fontSize: 13, marginTop: 2 },
  salary: { color: COLORS.gold, fontSize: 12, marginTop: 4 },
  appeal: { color: COLORS.accent, fontSize: 12 },
  btn: { marginTop: SPACING.sm },
  accepted: { color: COLORS.success, fontWeight: '700', marginTop: SPACING.sm },
});
