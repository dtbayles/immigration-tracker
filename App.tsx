import { ColorSchemeName, useColorScheme } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {NavigationContainer, DefaultTheme, DarkTheme, Theme} from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import MyCases from './components/MyCases';
import Settings from './components/Settings';

const Tab = createBottomTabNavigator();

const App = () => {
  const colorScheme: ColorSchemeName = useColorScheme();
  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <NavigationContainer theme={theme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarLabelStyle: {
            fontSize: 14,
            fontFamily: 'System',
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'My Cases') {
              iconName = focused ? 'ios-briefcase' : 'md-briefcase';
              return <Ionicons name={iconName} size={size} color={color} />;
            } else if (route.name === 'Settings') {
              iconName = focused ? 'cog' : 'cog-outline';
              return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
            }

            return <Ionicons name="help-circle" size={size} color={color} />;
          },
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: 'bold',
            alignSelf: 'flex-start',
            marginLeft: 10,
          },
          headerTitleContainerStyle: {
            position: 'absolute',
            transform: [{ translateY: 4 }],
          },
        })}
      >
        <Tab.Screen name="My Cases" component={MyCases} options={{ title: 'My USCIS Cases' }} />
        <Tab.Screen name="Settings" component={Settings} options={{ title: 'Settings' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;