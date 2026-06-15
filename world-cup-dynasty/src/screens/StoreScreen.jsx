import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import Button from '../components/Button';
import CurrencyBar from '../components/CurrencyBar';
import StoreItemCard from '../components/StoreItemCard';
import Card from '../components/Card';
import { COLORS, SPACING } from '../theme';
import { useGame } from '../context/GameContext';
import { COSMETIC_ITEMS, UPGRADE_ITEMS, IAP_PLACEHOLDERS, COIN_EARN_METHODS } from '../data/storeItems';

export default function StoreScreen({ navigation }) {
  const { gameState, purchaseItem, claimDaily } = useGame();
  const economy = gameState.economy || {};

  const handleBuy = (item) => {
    const result = purchaseItem(item.id);
    if (result?.success) {
      Alert.alert('Purchased!', `${item.name} acquired.`);
    } else {
      Alert.alert('Insufficient Funds', `You need more ${item.currency}.`);
    }
  };

  const handleDaily = () => {
    const result = claimDaily();
    if (result?.success) {
      Alert.alert('Daily Reward!', `+${result.coinReward} coins (Streak: ${result.streak})`);
    } else {
      Alert.alert('Already Claimed', 'Come back tomorrow!');
    }
  };

  return (
    <ScreenWrapper title="Store" navigation={navigation}>
      <CurrencyBar coins={economy.coins || 0} gems={economy.gems || 0} style={styles.currency} />

      <Card variant="gold">
        <Text style={styles.comingSoon}>Coming Soon: In-App Purchases</Text>
        <Text style={styles.fair}>All gameplay progress is earnable without spending real money.</Text>
      </Card>

      <Text style={styles.section}>Earn Coins</Text>
      <Button title="🎁 Daily Reward" variant="gold" onPress={handleDaily} />
      <Button title="📺 Watch Ad for Coins (Coming Soon)" variant="secondary" onPress={() => Alert.alert('Coming Soon', 'Rewarded ads will be available in a future update.')} style={styles.btn} />

      <Text style={styles.section}>Cosmetic Shop</Text>
      {COSMETIC_ITEMS.map((item) => (
        <StoreItemCard key={item.id} item={item} onBuy={handleBuy} owned={economy.unlockedCosmetics?.includes(item.id)} />
      ))}

      <Text style={styles.section}>Upgrades</Text>
      {UPGRADE_ITEMS.filter((i) => i.currency === 'coins').map((item) => (
        <StoreItemCard key={item.id} item={item} onBuy={handleBuy} owned={economy.purchasedUpgrades?.includes(item.id)} />
      ))}
      <Button title="View All Upgrades" variant="outline" onPress={() => navigation.navigate('UpgradeShop')} style={styles.btn} />

      <Text style={styles.section}>Premium Gems Packs (Placeholder)</Text>
      {IAP_PLACEHOLDERS.map((pack) => (
        <Card key={pack.id}>
          <Text style={styles.packName}>{pack.name}</Text>
          <Text style={styles.packDesc}>{pack.description}</Text>
          <Text style={styles.packPrice}>{pack.price} — {pack.coins} coins + {pack.gems} gems</Text>
          <Button title="Coming Soon" variant="secondary" onPress={() => Alert.alert('Coming Soon', 'Real purchases not enabled in v1.')} style={styles.packBtn} />
        </Card>
      ))}
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  currency: { alignSelf: 'center', marginBottom: SPACING.md },
  comingSoon: { color: COLORS.gold, fontWeight: '800', fontSize: 16, textAlign: 'center' },
  fair: { color: COLORS.textMuted, textAlign: 'center', marginTop: 4, fontSize: 12 },
  section: { color: COLORS.gold, fontWeight: '700', marginTop: SPACING.lg, marginBottom: SPACING.sm },
  btn: { marginTop: SPACING.sm },
  packName: { color: COLORS.text, fontWeight: '700', fontSize: 16 },
  packDesc: { color: COLORS.textMuted, marginTop: 4 },
  packPrice: { color: COLORS.gold, marginTop: 4, fontWeight: '600' },
  packBtn: { marginTop: SPACING.sm },
});
