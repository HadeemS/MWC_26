import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../theme';

const EVENT_ICONS = {
  goal: '⚽',
  yellow_card: '🟨',
  red_card: '🟥',
  injury: '⚕',
  var_result: '📺',
  tactical: '📋',
  shot: '🎯',
  extra_time: '⏱',
  full_time: '🏁',
};

export default function MatchTimeline({ events = [] }) {
  const recent = [...events].reverse().slice(0, 15);

  return (
    <ScrollView style={styles.container} nestedScrollEnabled>
      {recent.length === 0 ? (
        <Text style={styles.empty}>Match events will appear here...</Text>
      ) : (
        recent.map((event, i) => (
          <View key={`${event.minute}-${i}`} style={styles.event}>
            <Text style={styles.minute}>{event.minute}'</Text>
            <Text style={styles.icon}>{EVENT_ICONS[event.type] || '•'}</Text>
            <Text style={styles.text} numberOfLines={2}>{event.text}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { maxHeight: 200 },
  empty: { color: COLORS.textMuted, fontStyle: 'italic', textAlign: 'center', padding: SPACING.md },
  event: { flexDirection: 'row', alignItems: 'center', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: COLORS.cardBorder },
  minute: { width: 32, color: COLORS.gold, fontWeight: '700', fontSize: 12 },
  icon: { width: 24, fontSize: 14 },
  text: { flex: 1, color: COLORS.text, fontSize: 13 },
});
