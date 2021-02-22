import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { THEME } from '../theme'

import { MainScreen } from '../screens/MainScreen'
import { BookedScreen } from '../screens/BookedScreen'
import { ItemScreen } from '../screens/ItemScreen'
import { CreateScreen } from '../screens/CreateScreen'
import { AboutScreen } from '../screens/AboutScreen'


const Stack = createStackNavigator()

function RootStack() {

  return (
    <Stack.Navigator
      initialRouteName="Main"
      //screenOptions={{ gestureEnabled: false }}
    >
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{ 
          title: 'Все',
          headerStyle: {
            backgroundColor: THEME.HEADER_BACKGROUND
        },  }}
      />
      <Stack.Screen
        name="Booked"
        component={BookedScreen}
        options={{ 
          title: 'Избранные',
          headerStyle: {
            backgroundColor: THEME.HEADER_BACKGROUND
        },  }}
      />
      <Stack.Screen
        name="Item"
        component={ItemScreen}
        options={{ 
          title: 'Запись',
          headerStyle: {
            backgroundColor: THEME.HEADER_BACKGROUND
        },  }}
      />
      <Stack.Screen
        name="Create"
        component={CreateScreen}
        options={{ 
          title: 'Новый',
          headerStyle: {
            backgroundColor: THEME.HEADER_BACKGROUND
        },  }}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{ 
          title: 'О программе',
          headerStyle: {
            backgroundColor: THEME.HEADER_BACKGROUND
        },  }}
      />
    </Stack.Navigator>
  );
}

export const AppNavigation = () => {
    return (
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    )}


    