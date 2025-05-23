import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { ActivityIndicator, View } from 'react-native';

import Home from './screens/Home';
import Profile from './screens/Profile';
import useLoadingStore from './store/LoadStore';
import HomeWork from './screens/HomeWork';
import Login from './screens/Login';
import { getData } from './components/LocalStorage';
import Header from './components/Header';
import Schedule from './screens/Schedule';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function Router() {
  const load = useLoadingStore((state) => state.load);
  const [initialScreen, setInitialScreen] = useState<string | null>(null);

  useEffect(() => {
    const checkLogin = async () => {
      const login = await getData('login');
      setInitialScreen(login ? 'App' : 'Login');
    };
    checkLogin();
  }, []);

  if (!initialScreen) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#367bc5" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {initialScreen === 'Login' ? (
          <Stack.Screen name="Login" component={Login} />
        ) : (
          <Stack.Screen name="App" options={{ headerShown: false }}>
            {(props) => (
              <Tab.Navigator
                screenOptions={({ route }: { route: RouteProp<any> }) => ({
                  header: () => <Header />,
                  tabBarIcon: ({ color, size, focused }) => {
                    let iconName: keyof typeof Ionicons.glyphMap = 'home-outline';
                    if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
                    if (route.name === 'HomeWork') iconName = focused ? 'list' : 'list-outline';
                    if (route.name === 'Schedule') iconName = focused ? 'calendar' : 'calendar-outline';
                    if (route.name === 'Profile') iconName = focused ? 'settings' : 'settings-outline';

                    return <Ionicons name={iconName} size={size} color={color} />;
                  },
                  tabBarActiveTintColor: '#367bc5',
                  tabBarInactiveTintColor: 'gray',
                  tabBarShowLabel: true,
                  tabBarStyle: {
                    display: load ? 'none' : 'flex',
                  },
                })}
                {...props}
              >
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="HomeWork" component={HomeWork} />
                <Tab.Screen name="Schedule" component={Schedule} />
                <Tab.Screen name="Profile" component={Profile} />
              </Tab.Navigator>
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}