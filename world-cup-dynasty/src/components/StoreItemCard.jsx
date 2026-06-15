import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../theme';
import Card from './Card';

export default function StoreItemCard({ item, onBuy, owned = false }) {
  const icon = item.currency === 'gems' ? 'diamond' : 'logo-bitcoin';
  const color = item.currency === 'gems' ? COLORS.accent : COLORS.gold;

  return (
    <Card style={styles.card}>
      <View style={styles.row}>
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.category}>{item.category || item.type}</Text>
        </View>
        {owned ? (
          <Text style={styles.owned}>Owned</Text>
        ) : (
          <TouchableOpacity style={[styles.buyBtn, { borderColor: color }]} onPress={() => onBuy(item)}>
            <Ionicons name={icon} size={14} color={color} />
            <Text style={[styles.price, { color }]}>{item.price}</Text>
          </TouchableOpacity>
        )}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: SPACING.sm },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  info: { flex: 1 },
  name: { color: COLORS.text, fontWeight: '700', fontSize: 15 },
  category: { color: COLORS.textMuted, fontSize: 12, marginTop: 2, textTransform: 'capitalize' },
  buyBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, borderWidth: 1.5 },
  price: { fontWeight: '800', fontSize: 15 },
  owned: { color: COLORS.success, fontWeight: '700' },
});
