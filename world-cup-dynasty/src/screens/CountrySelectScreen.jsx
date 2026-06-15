import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import Button from '../components/Button';
import TeamBadge from '../components/TeamBadge';
import FlagPreview from '../components/FlagPreview';
import { COUNTRIES } from '../data/countries';
import { COLORS, SPACING } from '../theme';
import { useGame } from '../context/GameContext';

export default function CountrySelectScreen({ navigation, route }) {
  const { gameMode, manager } = route.params;
  const { initNewGame } = useGame();

  const selectCountry = (country) => {
    initNewGame(gameMode, manager, country);
    navigation.navigate('CountryCustomizer', { country, gameMode, manager });
  };

  const createCountry = () => {
    navigation.navigate('CountryCustomizer', {
      country: {
        id: 'custom', name: 'New Nation', nickname: 'The Dreamers',
        flagColors: ['#1E3A5F', '#D4AF37', '#FFFFFF'], flagPattern: 'horizontal',
        jerseyHome: '#1E3A5F', jerseyAway: '#FFFFFF', jerseyAccent: '#D4AF37',
        stadium: 'National Arena', badgeShape: 'shield', rivals: [], strength: 65,
      },
      gameMode, manager, isCustom: true,
    });
  };

  return (
    <ScreenWrapper title="Select Country" navigation={navigation}>
      <Button title="✨ Create Custom Country" variant="gold" onPress={createCountry} />

      <Text style={styles.section}>Fictional Nations</Text>
      <FlatList
        data={COUNTRIES}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.countryCard} onPress={() => selectCountry(item)}>
            <FlagPreview colors={item.flagColors} pattern={item.flagPattern} width={60} height={36} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.nick}>{item.nickname} · Rank #{item.ranking}</Text>
            </View>
            <TeamBadge colors={item.flagColors} shape={item.badgeShape} size={40} />
            <Text style={styles.str}>{item.strength}</Text>
          </TouchableOpacity>
        )}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  section: { color: COLORS.textMuted, fontWeight: '700', marginTop: SPACING.lg, marginBottom: SPACING.sm },
  countryCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.card,
    padding: SPACING.md, borderRadius: 12, marginBottom: SPACING.sm, borderWidth: 1, borderColor: COLORS.cardBorder,
  },
  info: { flex: 1, marginLeft: SPACING.md },
  name: { color: COLORS.text, fontWeight: '700', fontSize: 16 },
  nick: { color: COLORS.textMuted, fontSize: 12, marginTop: 2 },
  str: { color: COLORS.gold, fontWeight: '800', fontSize: 18, marginLeft: SPACING.sm },
});
