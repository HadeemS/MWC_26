import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../theme';
import Card from './Card';

export default function FanPostCard({ post }) {
  const sentimentColor = {
    positive: COLORS.success,
    negative: COLORS.danger,
    neutral: COLORS.textMuted,
  }[post.sentiment] || COLORS.textMuted;

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{post.username?.[0]?.toUpperCase() || 'F'}</Text>
        </View>
        <Text style={styles.username}>@{post.username}</Text>
        <View style={[styles.dot, { backgroundColor: sentimentColor }]} />
      </View>
      <Text style={styles.text}>{post.text}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: SPACING.sm },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.sm },
  avatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: COLORS.backgroundLight, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: COLORS.gold, fontWeight: '800' },
  username: { color: COLORS.gold, fontWeight: '700', marginLeft: SPACING.sm, flex: 1 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  text: { color: COLORS.text, fontSize: 14, lineHeight: 20 },
});
