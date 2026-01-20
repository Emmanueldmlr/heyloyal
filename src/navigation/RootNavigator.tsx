import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen  from '@/screens/home';
import RewardsScreen from '@/screens/reward';
import type { RootStackParamList } from './types';
import { colors } from '@/theme';

const Stack = createStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: colors.background.primary },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Rewards" component={RewardsScreen} />
    </Stack.Navigator>
  );
}
