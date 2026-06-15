// Premium dark sports broadcast theme
export const COLORS = {
  background: '#0A1628',
  backgroundLight: '#122240',
  card: '#1A2F4F',
  cardBorder: '#2A4068',
  gold: '#D4AF37',
  goldLight: '#F0D060',
  goldDark: '#A8892A',
  white: '#FFFFFF',
  text: '#E8EDF5',
  textMuted: '#8A9BB5',
  success: '#2ECC71',
  danger: '#E74C3C',
  warning: '#F39C12',
  info: '#3498DB',
  accent: '#4ECDC4',
  overlay: 'rgba(10, 22, 40, 0.92)',
};

export const FONTS = {
  title: { fontSize: 28, fontWeight: '800', color: COLORS.gold },
  subtitle: { fontSize: 18, fontWeight: '700', color: COLORS.text },
  body: { fontSize: 15, color: COLORS.text },
  caption: { fontSize: 12, color: COLORS.textMuted },
  button: { fontSize: 16, fontWeight: '700', color: COLORS.white },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const commonStyles = {
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  screenPadding: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
};
