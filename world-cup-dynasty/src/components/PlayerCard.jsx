import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SPACING } from '../theme';
import Card from './Card';

export default function PlayerCard({ player, onPress, compact = false }) {
  const posColor = { GK: COLORS.warning, DEF: COLORS.info, MID: COLORS.success, FWD: COLORS.danger }[player.position] || COLORS.gold;

  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress} activeOpacity={0.7}>
      <Card style={[styles.card, compact && styles.compact]}>
        <View style={styles.row}>
          <View style={[styles.posBadge, { backgroundColor: posColor }]}>
            <Text style={styles.posText}>{player.position}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.name}>{player.name}</Text>
            <Text style={styles.meta}>Age {player.age} · {player.trait}</Text>
          </View>
          <View style={styles.overall}>
            <Text style={styles.overallNum}>{player.overall}</Text>
            <Text style={styles.overallLabel}>OVR</Text>
          </View>
        </View>
        {!compact && (
          <View style={styles.stats}>
            {['pace', 'shooting', 'passing', 'defense'].map((stat) => (
              <View key={stat} style={styles.statItem}>
                <Text style={styles.statVal}>{player[stat]}</Text>
                <Text style={styles.statLabel}>{stat.slice(0, 3).toUpperCase()}</Text>
              </View>
            ))}
          </View>
        )}
        {player.injured && <Text style={styles.injured}>⚕ Injured</Text>}
        {player.isCaptain && <Text style={styles.role}>© Captain</Text>}
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { padding: SPACING.sm },
  compact: { marginBottom: 4 },
  row: { flexDirection: 'row', alignItems: 'center' },
  posBadge: { width: 36, height: 36, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  posText: { color: COLORS.white, fontWeight: '800', fontSize: 11 },
  info: { flex: 1, marginLeft: SPACING.sm },
  name: { color: COLORS.text, fontWeight: '700', fontSize: 15 },
  meta: { color: COLORS.textMuted, fontSize: 11, marginTop: 2 },
  overall: { alignItems: 'center' },
  overallNum: { color: COLORS.gold, fontSize: 22, fontWeight: '800' },
  overallLabel: { color: COLORS.textMuted, fontSize: 9 },
  stats: { flexDirection: 'row', marginTop: SPACING.sm, justifyContent: 'space-around' },
  statItem: { alignItems: 'center' },
  statVal: { color: COLORS.text, fontWeight: '700', fontSize: 14 },
  statLabel: { color: COLORS.textMuted, fontSize: 9 },
  injured: { color: COLORS.danger, fontSize: 11, marginTop: 4 },
  role: { color: COLORS.gold, fontSize: 11, marginTop: 2 },
});
