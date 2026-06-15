import React from 'react';
import { Text, StyleSheet, Alert } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import StoreItemCard from '../components/StoreItemCard';
import { COLORS, SPACING } from '../theme';
import { useGame } from '../context/GameContext';
import { UPGRADE_ITEMS } from '../data/storeItems';

export default function UpgradeShopScreen({ navigation }) {
  const { gameState, purchaseItem } = useGame();
  const economy = gameState.economy || {};

  const handleBuy = (item) => {
    const result = purchaseItem(item.id);
    Alert.alert(result?.success ? 'Upgrade Purchased!' : 'Insufficient Funds', result?.success ? `${item.name} activated.` : `Need more ${item.currency}.`);
  };

  return (
    <ScreenWrapper title="Upgrade Shop" navigation={navigation}>
      <Text style={styles.desc}>Spend coins and gems on gameplay upgrades. No pay-to-win items.</Text>
      {UPGRADE_ITEMS.map((item) => (
        <StoreItemCard key={item.id} item={item} onBuy={handleBuy} owned={economy.purchasedUpgrades?.includes(item.id)} />
      ))}
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  desc: { color: COLORS.textMuted, marginBottom: SPACING.lg },
});
