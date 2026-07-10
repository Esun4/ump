import React, { useEffect } from 'react';
import { AppState, useColorScheme, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import {
  useFonts,
  BarlowCondensed_500Medium,
  BarlowCondensed_600SemiBold,
  BarlowCondensed_700Bold,
} from '@expo-google-fonts/barlow-condensed';
import { RootStackParamList, TabParamList } from './src/navigation';
import { refreshBanks } from './src/data';
import { RulesetProvider } from './src/state/RulesetContext';
import { darkTheme, fonts, lightTheme, Theme } from './src/theme';
import HomeScreen from './src/screens/HomeScreen';
import QuizScreen from './src/screens/QuizScreen';
import StatsScreen from './src/screens/StatsScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import TopicsScreen from './src/screens/TopicsScreen';
import LibraryScreen from './src/screens/LibraryScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const TAB_ICONS: Record<
  keyof TabParamList,
  { active: keyof typeof Ionicons.glyphMap; inactive: keyof typeof Ionicons.glyphMap }
> = {
  Home: { active: 'baseball', inactive: 'baseball-outline' },
  Stats: { active: 'stats-chart', inactive: 'stats-chart-outline' },
  Settings: { active: 'settings', inactive: 'settings-outline' },
};

function Tabs({ theme }: { theme: Theme }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: route.name !== 'Home',
        headerShadowVisible: false,
        headerStyle: { backgroundColor: theme.background },
        headerTitleStyle: {
          fontFamily: fonts.displaySemi,
          fontSize: 24,
          letterSpacing: 0.5,
          color: theme.text,
        },
        tabBarActiveTintColor: theme.accent,
        tabBarInactiveTintColor: theme.faintText,
        tabBarStyle: {
          backgroundColor: theme.card,
          borderTopColor: theme.hairline,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        tabBarIcon: ({ size, color, focused }) => (
          <Ionicons
            name={focused ? TAB_ICONS[route.name].active : TAB_ICONS[route.name].inactive}
            size={size - 2}
            color={color}
          />
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Stats" component={StatsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    BarlowCondensed_500Medium,
    BarlowCondensed_600SemiBold,
    BarlowCondensed_700Bold,
  });

  // Banks refresh when the app returns to the foreground; refreshBanks
  // debounces itself and never rejects, so quick app switches are free.
  useEffect(() => {
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'active') void refreshBanks();
    });
    return () => sub.remove();
  }, []);

  const dark = useColorScheme() === 'dark';
  const app = dark ? darkTheme : lightTheme;

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: app.background }} />;
  }

  const base = dark ? DarkTheme : DefaultTheme;
  const navTheme = {
    ...base,
    colors: {
      ...base.colors,
      primary: app.accent,
      background: app.background,
      card: app.card,
      text: app.text,
      border: app.border,
    },
  };

  const stackHeader = {
    headerShadowVisible: false,
    headerStyle: { backgroundColor: app.background },
    headerTintColor: app.accent,
    headerTitleStyle: {
      fontFamily: fonts.displaySemi,
      fontSize: 22,
      color: app.text,
    },
    headerBackTitleVisible: false,
  } as const;

  return (
    <RulesetProvider>
      <NavigationContainer theme={navTheme}>
        <Stack.Navigator screenOptions={stackHeader}>
          <Stack.Screen name="Tabs" options={{ headerShown: false }}>
            {() => <Tabs theme={app} />}
          </Stack.Screen>
          <Stack.Screen name="Quiz" component={QuizScreen} />
          <Stack.Screen
            name="Topics"
            component={TopicsScreen}
            options={{ title: 'Practice a Topic' }}
          />
          <Stack.Screen
            name="Library"
            component={LibraryScreen}
            options={{ title: 'Question Library' }}
          />
        </Stack.Navigator>
        <StatusBar style={dark ? 'light' : 'dark'} />
      </NavigationContainer>
    </RulesetProvider>
  );
}
