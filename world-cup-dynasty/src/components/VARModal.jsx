import React from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../theme';
import Button from './Button';

export default function VARModal({ visible, varEvent, onReaction, onClose }) {
  if (!varEvent) return null;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>📺 VAR REVIEW</Text>
          <Text style={styles.label}>{varEvent.label}</Text>
          <Text style={styles.desc}>{varEvent.description}</Text>
          <View style={styles.scanLine} />
          <Text style={styles.checking}>Checking replay...</Text>
          <View style={styles.buttons}>
            <Button title="Accept Decision" variant="secondary" onPress={() => onReaction('accept')} />
            <Button title="Protest" variant="danger" onPress={() => onReaction('protest')} style={{ marginTop: 8 }} />
            <Button title="Calm the Team" variant="gold" onPress={() => onReaction('calm_team')} style={{ marginTop: 8 }} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: COLORS.overlay, justifyContent: 'center', padding: SPACING.lg },
  modal: { backgroundColor: COLORS.card, borderRadius: 20, padding: SPACING.lg, borderWidth: 2, borderColor: COLORS.gold },
  title: { fontSize: 24, fontWeight: '900', color: COLORS.gold, textAlign: 'center', marginBottom: SPACING.sm },
  label: { fontSize: 18, fontWeight: '700', color: COLORS.text, textAlign: 'center' },
  desc: { fontSize: 14, color: COLORS.textMuted, textAlign: 'center', marginTop: 8 },
  scanLine: { height: 2, backgroundColor: COLORS.gold, marginVertical: SPACING.md, opacity: 0.5 },
  checking: { color: COLORS.goldLight, textAlign: 'center', fontStyle: 'italic', marginBottom: SPACING.md },
  buttons: { marginTop: SPACING.sm },
});
