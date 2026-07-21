import React, { useEffect } from 'react';
import { AppState, Pressable, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
  DefaultTheme,
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  BottomTabBar,
  BottomTabBarButtonProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  useFonts,
  Archivo_400Regular,
  Archivo_600SemiBold,
  Archivo_800ExtraBold,
} from '@expo-google-fonts/archivo';
import { RootStackParamList, TabParamList } from './src/navigation';
import { refreshBanks } from './src/data';
import { RulesetProvider } from './src/state/RulesetContext';
import { WalkthroughProvider } from './src/walkthrough/WalkthroughContext';
import { useWalkthroughTarget } from './src/walkthrough/useWalkthroughTarget';
import WalkthroughOverlay from './src/walkthrough/WalkthroughOverlay';
import { fonts, lightTheme, Theme } from './src/theme';
import HomeScreen from './src/screens/HomeScreen';
import QuizScreen from './src/screens/QuizScreen';
import StatsScreen from './src/screens/StatsScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import TopicsScreen from './src/screens/TopicsScreen';
import LibraryScreen from './src/screens/LibraryScreen';
import CoverageScreen from './src/screens/CoverageScreen';
import PlateMeetingScreen from './src/screens/PlateMeetingScreen';
import MythsScreen from './src/screens/MythsScreen';
import SimulatorScreen from './src/screens/SimulatorScreen';
import SimPlayScreen from './src/screens/SimPlayScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

// Held outside the component so the walkthrough can drive navigation.
const navigationRef = createNavigationContainerRef<RootStackParamList>();

const TAB_ICONS: Record<
  keyof TabParamList,
  { active: keyof typeof Ionicons.glyphMap; inactive: keyof typeof Ionicons.glyphMap }
> = {
  Home: { active: 'baseball', inactive: 'baseball-outline' },
  Field: { active: 'play-circle', inactive: 'play-circle-outline' },
  Stats: { active: 'stats-chart', inactive: 'stats-chart-outline' },
  Settings: { active: 'settings', inactive: 'settings-outline' },
};

// The active tab is marked by a claret bar inset along the top of its
// cell, which needs to span the full cell — hence a custom tab button
// rather than decoration hung off the icon.
function TabButton({ theme, ...props }: BottomTabBarButtonProps & { theme: Theme }) {
  const selected = props.accessibilityState?.selected ?? false;
  const { style, children, delayLongPress, ref, ...rest } = props;
  return (
    <Pressable
      {...rest}
      delayLongPress={delayLongPress ?? undefined}
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      {selected && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            backgroundColor: theme.accent,
          }}
        />
      )}
      {children}
    </Pressable>
  );
}

function Tabs({ theme }: { theme: Theme }) {
  // The tab bar is wrapped so the walkthrough can measure and spotlight it.
  const tabTarget = useWalkthroughTarget('app.tabs');
  return (
    <Tab.Navigator
      tabBar={(props) => (
        <View {...tabTarget} collapsable={false}>
          <BottomTabBar {...props} />
        </View>
      )}
      screenOptions={({ route }) => ({
        headerShown: route.name !== 'Home',
        headerShadowVisible: false,
        headerStyle: { backgroundColor: theme.background },
        headerTitleStyle: {
          fontFamily: fonts.display,
          fontSize: 20,
          color: theme.text,
        },
        tabBarActiveTintColor: theme.accent,
        tabBarInactiveTintColor: theme.subtleText,
        tabBarStyle: {
          backgroundColor: theme.card,
          borderTopWidth: 2,
          borderTopColor: theme.rule,
        },
        tabBarLabelStyle: {
          fontFamily: fonts.bodyBold,
          fontSize: 10,
          letterSpacing: 0.6,
        },
        tabBarLabel: route.name.toUpperCase(),
        tabBarButton: (props) => <TabButton {...props} theme={theme} />,
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
      <Tab.Screen
        name="Field"
        component={SimulatorScreen}
        options={{ title: 'Play Simulator', tabBarLabel: 'Sim' }}
      />
      <Tab.Screen name="Stats" component={StatsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_600SemiBold,
    Archivo_800ExtraBold,
  });

  // Banks refresh when the app returns to the foreground; refreshBanks
  // debounces itself and never rejects, so quick app switches are free.
  useEffect(() => {
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'active') void refreshBanks();
    });
    return () => sub.remove();
  }, []);

  const app = lightTheme;

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: app.background }} />;
  }

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
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
      fontFamily: fonts.display,
      fontSize: 20,
      color: app.text,
    },
    headerBackTitleVisible: false,
  } as const;

  return (
    <SafeAreaProvider>
      <RulesetProvider>
        <WalkthroughProvider navigationRef={navigationRef}>
          {/* The overlay is a sibling of the navigator, not inside it, so it
              floats over both tabs and pushed stack screens. */}
          <View style={{ flex: 1 }}>
            <NavigationContainer ref={navigationRef} theme={navTheme}>
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
            options={{ title: 'Question Bank' }}
          />
          <Stack.Screen
            name="Coverage"
            component={CoverageScreen}
            options={{ title: 'Fly Ball Coverage' }}
          />
          <Stack.Screen
            name="PlateMeeting"
            component={PlateMeetingScreen}
            options={{ title: 'Plate Meeting' }}
          />
          <Stack.Screen
            name="Myths"
            component={MythsScreen}
            options={{ title: 'Rule Myths' }}
          />
                <Stack.Screen name="SimPlay" component={SimPlayScreen} />
              </Stack.Navigator>
              <StatusBar style="dark" />
            </NavigationContainer>
            <WalkthroughOverlay />
          </View>
        </WalkthroughProvider>
      </RulesetProvider>
    </SafeAreaProvider>
  );
}
