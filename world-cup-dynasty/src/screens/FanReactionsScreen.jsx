import React from 'react';
import { Text, StyleSheet } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import Button from '../components/Button';
import FanPostCard from '../components/FanPostCard';
import { getFanReactions } from '../data/fanReactions';
import { COLORS, SPACING } from '../theme';

export default function FanReactionsScreen({ navigation, route }) {
  const { result, score, isRivalry, penalties } = route.params || {};
  let context = result === 'win' ? 'win' : 'loss';
  if (isRivalry && result === 'win') context = 'rivalry_win';
  if (penalties) context = result === 'win' ? 'win' : 'loss';

  const posts = getFanReactions(context);

  return (
    <ScreenWrapper title="Fan Reactions" navigation={navigation}>
      <Text style={styles.header}>📱 Fan Social Feed</Text>
      {score && <Text style={styles.score}>Final Score: {score}</Text>}

      {posts.map((post, i) => (
        <FanPostCard key={i} post={post} />
      ))}

      <Button title="Post-Match Press Conference" variant="secondary" onPress={() => navigation.navigate('PressConference', { type: 'post_match' })} style={styles.btn} />
      <Button title="Back to Tournament" variant="gold" onPress={() => navigation.navigate('Tournament')} style={styles.btn} />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: { color: COLORS.gold, fontSize: 20, fontWeight: '800', marginBottom: SPACING.sm },
  score: { color: COLORS.text, fontSize: 16, marginBottom: SPACING.lg },
  btn: { marginTop: SPACING.sm },
});
