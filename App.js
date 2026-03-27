import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import StatusScreen from './pages/Status';
import SkillsScreen from './pages/Skills';
import InventoryScreen from './pages/Inventory';

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#1a1a1a',
          borderBottomWidth: 1,
          borderBottomColor: '#333',
        },
        tabBarActiveTintColor: '#9b59b6',
        tabBarInactiveTintColor: '#888',
        tabBarIndicatorStyle: {
          backgroundColor: '#9b59b6',
          height: 3,
        },
        tabBarLabelStyle: {
          fontWeight: 'bold',
          fontSize: 14,
        }
      }}
    >
      <Tab.Screen name="Status" component={StatusScreen} />
      <Tab.Screen name="Skills" component={SkillsScreen} />
      <Tab.Screen name="Inventory" component={InventoryScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1a1a1a' }}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" /> 
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    </SafeAreaView>
  );
}