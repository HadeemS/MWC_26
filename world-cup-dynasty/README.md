# World Cup Dynasty: Road to Glory

A polished mobile soccer management game built with **React Native**, **Expo**, and **JavaScript**. Manage a fictional national team, customize your nation, simulate matches with VAR drama, build a youth academy, and chase the **Global Cup** trophy.

> **Legal note:** This game uses entirely fictional branding — no real FIFA/World Cup logos, federation marks, player names, or copyrighted jerseys.

## Quick Start

```bash
cd world-cup-dynasty
npm install
npx expo start
```

Scan the QR code with **Expo Go** (iOS/Android) or press `a` for Android emulator / `i` for iOS simulator.

### Dependencies

```bash
npm install @react-native-async-storage/async-storage
npm install react-native-svg
npm install @react-navigation/native @react-navigation/native-stack
npm install react-native-screens react-native-safe-area-context
```

## Game Modes

| Mode | Description |
|------|-------------|
| Quick Tournament | Fast Global Cup run |
| Career Mode | Season-based manager career |
| Create-a-Country | Design a nation from scratch |
| Road to Glory | Underdog story to champions |
| Custom Cup Builder | Set up your own tournament |
| Legacy Mode | 20-year dynasty across tournaments |

## Core Features

- **Manager & country customization** — name, flag, jerseys, stadium, badge
- **Squad management** — 23-player rosters with 13 traits and full attributes
- **Match simulation** — live clock, possession, momentum, injuries, cards
- **VAR & referee system** — 8 referee personalities, 6 VAR event types
- **Tactical decisions** — 15+ in-match choices that affect outcomes
- **Penalty shootout mini-game** — choose shot/dive direction
- **Press conferences & locker room drama** — narrative choices
- **Youth academy & scouting** — develop and sign prospects
- **Rivalry tracking** — history, tension, media storylines
- **Economy** — coins (gameplay) + premium gems (placeholder)
- **Store** — cosmetics, upgrades, IAP placeholders (no real payments in v1)
- **Legacy career** — 20-year manager journey with job offers
- **Save slots** — 3 AsyncStorage save slots

## Project Structure

```
src/
  components/     # Reusable UI (Button, Card, PlayerCard, VARModal, etc.)
  screens/        # 30 game screens
  data/           # Countries, players, referees, store items, events
  game/           # Engines (match, tournament, economy, scouting, etc.)
  context/        # GameContext global state
  theme.js        # Colors, spacing, styles
App.js            # Navigation stack
```

## Monetization Design (v1 — Placeholder Only)

Version 1 does **not** process real payments. The Store screen shows future purchasable packs with a "Coming Soon" label.

### Fair Monetization Principles

1. **Never pay-to-win** — all progression is achievable without spending money
2. **Cosmetics first** — jerseys, stadium themes, manager outfits, celebrations
3. **Convenience optional** — scouting boosts, training sessions earnable via coins
4. **Transparent pricing** — clear coin/gem costs shown before purchase
5. **Rewarded ads (future)** — optional coin earning, never required

### Future IAP Integration

The `economyEngine.js` and `storeItems.js` modules are designed for easy integration with:

- `expo-in-app-purchases` or **RevenueCat**
- Rewarded video ads (AdMob / Unity Ads)
- Cosmetic packs, season pass, no-ads purchase

To add real IAP later:

1. Install `expo-in-app-purchases` or RevenueCat SDK
2. Map `IAP_PLACEHOLDERS` product IDs to store listings
3. Wire Store screen buttons to purchase flow
4. Validate receipts server-side (recommended for production)

### Currency

| Currency | Earned Via | Spent On |
|----------|-----------|----------|
| Coins | Wins, tournaments, daily rewards, youth development | Training, scouting, upgrades, cosmetics |
| Premium Gems | Achievements, trophies, login streaks | Premium cosmetics, light shows, rare styles |

## App Store Preparation

### iOS (App Store Connect)

1. Set `bundleIdentifier`: `com.worldcupdynasty.roadtoglory`
2. Create app listing with screenshots from Expo simulator
3. Add privacy policy URL (required for IAP even if not active)
4. Set age rating (likely 4+ or 9+)
5. Build: `eas build --platform ios`
6. Submit via `eas submit`

### Android (Google Play)

1. Set `package`: `com.worldcupdynasty.roadtoglory`
2. Create store listing with feature graphic and screenshots
3. Content rating questionnaire
4. Build: `eas build --platform android`
5. Upload AAB to Play Console

### Recommended Next Steps for Production

- [ ] Add EAS Build configuration (`eas.json`)
- [ ] Create app icons and splash screens with custom artwork
- [ ] Add sound effects and background music
- [ ] Implement analytics (Expo Analytics or Firebase)
- [ ] Add crash reporting (Sentry)
- [ ] Privacy policy and terms of service pages
- [ ] Beta testing via TestFlight / Play Internal Testing

## Adding Content

### New Country

Add an entry to `src/data/countries.js` with fictional name, colors, and rivals.

### New Player Trait

Add to `PLAYER_TRAITS` in `src/data/fictionalPlayers.js` and reference in match/penalty engines.

### New Store Item

Add to `COSMETIC_ITEMS` or `UPGRADE_ITEMS` in `src/data/storeItems.js`.

### New Decision

Add to `MATCH_DECISIONS` or `LOCKER_ROOM_EVENTS` in the data files.

## License

Original fictional content. Not affiliated with FIFA, any national federation, or real athletes.
