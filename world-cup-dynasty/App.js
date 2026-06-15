import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GameProvider } from './src/context/GameContext';
import { COLORS } from './src/theme';

import SplashScreen from './src/screens/SplashScreen';
import MainMenuScreen from './src/screens/MainMenuScreen';
import ManagerCreationScreen from './src/screens/ManagerCreationScreen';
import CountrySelectScreen from './src/screens/CountrySelectScreen';
import CountryCustomizerScreen from './src/screens/CountryCustomizerScreen';
import FlagCustomizerScreen from './src/screens/FlagCustomizerScreen';
import JerseyCustomizerScreen from './src/screens/JerseyCustomizerScreen';
import StadiumCustomizerScreen from './src/screens/StadiumCustomizerScreen';
import SquadHubScreen from './src/screens/SquadHubScreen';
import PlayerEditorScreen from './src/screens/PlayerEditorScreen';
import TacticsScreen from './src/screens/TacticsScreen';
import TrainingScreen from './src/screens/TrainingScreen';
import YouthAcademyScreen from './src/screens/YouthAcademyScreen';
import ScoutingScreen from './src/screens/ScoutingScreen';
import TournamentScreen from './src/screens/TournamentScreen';
import MatchPreviewScreen from './src/screens/MatchPreviewScreen';
import LiveMatchScreen from './src/screens/LiveMatchScreen';
import VARReviewScreen from './src/screens/VARReviewScreen';
import PenaltyShootoutScreen from './src/screens/PenaltyShootoutScreen';
import PressConferenceScreen from './src/screens/PressConferenceScreen';
import LockerRoomScreen from './src/screens/LockerRoomScreen';
import FanReactionsScreen from './src/screens/FanReactionsScreen';
import RivalryHistoryScreen from './src/screens/RivalryHistoryScreen';
import StoreScreen from './src/screens/StoreScreen';
import UpgradeShopScreen from './src/screens/UpgradeShopScreen';
import JobOffersScreen from './src/screens/JobOffersScreen';
import TrophyRoomScreen from './src/screens/TrophyRoomScreen';
import LegacyCareerScreen from './src/screens/LegacyCareerScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import SaveSlotsScreen from './src/screens/SaveSlotsScreen';

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
  contentStyle: { backgroundColor: COLORS.background },
  animation: 'slide_from_right',
};

export default function App() {
  return (
    <GameProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator initialRouteName="Splash" screenOptions={screenOptions}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="MainMenu" component={MainMenuScreen} />
          <Stack.Screen name="ManagerCreation" component={ManagerCreationScreen} />
          <Stack.Screen name="CountrySelect" component={CountrySelectScreen} />
          <Stack.Screen name="CountryCustomizer" component={CountryCustomizerScreen} />
          <Stack.Screen name="FlagCustomizer" component={FlagCustomizerScreen} />
          <Stack.Screen name="JerseyCustomizer" component={JerseyCustomizerScreen} />
          <Stack.Screen name="StadiumCustomizer" component={StadiumCustomizerScreen} />
          <Stack.Screen name="SquadHub" component={SquadHubScreen} />
          <Stack.Screen name="PlayerEditor" component={PlayerEditorScreen} />
          <Stack.Screen name="Tactics" component={TacticsScreen} />
          <Stack.Screen name="Training" component={TrainingScreen} />
          <Stack.Screen name="YouthAcademy" component={YouthAcademyScreen} />
          <Stack.Screen name="Scouting" component={ScoutingScreen} />
          <Stack.Screen name="Tournament" component={TournamentScreen} />
          <Stack.Screen name="MatchPreview" component={MatchPreviewScreen} />
          <Stack.Screen name="LiveMatch" component={LiveMatchScreen} />
          <Stack.Screen name="VARReview" component={VARReviewScreen} />
          <Stack.Screen name="PenaltyShootout" component={PenaltyShootoutScreen} />
          <Stack.Screen name="PressConference" component={PressConferenceScreen} />
          <Stack.Screen name="LockerRoom" component={LockerRoomScreen} />
          <Stack.Screen name="FanReactions" component={FanReactionsScreen} />
          <Stack.Screen name="RivalryHistory" component={RivalryHistoryScreen} />
          <Stack.Screen name="Store" component={StoreScreen} />
          <Stack.Screen name="UpgradeShop" component={UpgradeShopScreen} />
          <Stack.Screen name="JobOffers" component={JobOffersScreen} />
          <Stack.Screen name="TrophyRoom" component={TrophyRoomScreen} />
          <Stack.Screen name="LegacyCareer" component={LegacyCareerScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="SaveSlots" component={SaveSlotsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GameProvider>
  );
}
