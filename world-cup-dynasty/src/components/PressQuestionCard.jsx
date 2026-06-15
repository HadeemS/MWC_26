import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../theme';
import Card from './Card';

export default function PressQuestionCard({ question, onAnswer, answered = false }) {
  return (
    <Card variant="gold">
      <Text style={styles.question}>🎤 {question.question}</Text>
      {!answered ? (
        <View style={styles.answers}>
          {question.answers.map((answer) => (
            <TouchableOpacity
              key={answer.id}
              style={styles.answerBtn}
              onPress={() => onAnswer(answer)}
              activeOpacity={0.7}
            >
              <Text style={styles.answerText}>{answer.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <Text style={styles.answered}>Response recorded.</Text>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  question: { color: COLORS.text, fontSize: 16, fontWeight: '700', marginBottom: SPACING.md },
  answers: { gap: SPACING.sm },
  answerBtn: {
    backgroundColor: COLORS.backgroundLight,
    padding: SPACING.md,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  answerText: { color: COLORS.text, fontSize: 14 },
  answered: { color: COLORS.success, fontStyle: 'italic' },
});
