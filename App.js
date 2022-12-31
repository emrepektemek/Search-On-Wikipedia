import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useContext } from 'react';
import { StyleSheet, Image } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import FindEventsScreen from './screens/FindEventsScreen';
import FindBirthsScreen from './screens/FindBirthsScreen';
import FindDeathsScreen from './screens/FindDeathsScreen';
import EventsScreen from './screens/EventsScreen';
import BirthsScreen from './screens/BirthsScreen';
import DeathsScreen from './screens/DeathsScreen';
import HistoryScreen from './screens/HistoryScreen';

import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GlobalStyles } from './constants/styles';

import AuthContexProvider, { AuthContext } from './store/auth-context';
import UserSearchHistoryContexProvider from './store/user-search-history-context';

import LoadingOverlay from './components/UI/LoadingOverlay';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();


function BulEkranlari(){
  return(
    <BottomTabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarInactiveBackgroundColor: GlobalStyles.colors.tabBarBorder,
        tabBarLabelStyle:{
          color: GlobalStyles.colors.tabBarLabel,
          fontSize: 15,
          fontFamily: 'sans-serif-medium',
          fontWeight: 'bold'
        },
        tabBarStyle:{
          height:53
        },
        tabBarActiveBackgroundColor: GlobalStyles.colors.bottomActiveTabBar,
        tabBarIcon: ({focused})=>{
          return(
            <Image 
              style={styles.bottomTabImage}
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/5968/5968992.png'
                
              }}
            />
          );
        },
      }}
    >
    <BottomTabs.Screen 
      name="OlaylariGetirEkrani"
      component={FindEventsScreen}
      options={{title: 'Find Events'}}
    />
    <BottomTabs.Screen 
      name="DogumlariGetirEkrani"
      component={FindBirthsScreen}
      options={{title: 'Find Births'}}
    />
    <BottomTabs.Screen 
      name="OlumleriGetirEkrani"
      component={FindDeathsScreen}
      options={{title: 'Find Deaths'}}
    />   
    </BottomTabs.Navigator>
  );
}

function GirisKayitEkranlari(){

  return(
    <Stack.Navigator
      screenOptions={{headerShown: false, headerBackVisible:true}}
    > 
      <Stack.Screen 
        name="GirisEkrani"
        component={LoginScreen}
      />
      <Stack.Screen 
        name="KayitEkrani"
        component={SignUpScreen}
      />
    </Stack.Navigator>
  );
  
 
}

function UygulamaEkranlari(){

  return(
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerBackVisible:true
      }}
    > 
      <Stack.Screen 
        name="BulEkranlari"
        component={BulEkranlari}
      />
      <Stack.Screen 
        name="OlaylarEkrani"
        component={EventsScreen}
      />
      <Stack.Screen 
        name="DogumlarEkrani"
        component={BirthsScreen}
      />
      <Stack.Screen 
        name="OlumlerEkrani"
        component={DeathsScreen}
      />
      <Stack.Screen 
        name="GecmisAralamarEkrani"
        component={HistoryScreen}
      />
    </Stack.Navigator>
  );
  
}

function Navigation() {

  const authContext = useContext(AuthContext);
 
  return (
    <NavigationContainer>
      {!authContext.isAuthenticated && <GirisKayitEkranlari />}
      {authContext.isAuthenticated && <UygulamaEkranlari />}
    </NavigationContainer>
  );
}

function Root(){

  const [isTryingLogin , setIsTraingLogin] = useState(true);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken(){
        const storedToken = await AsyncStorage.getItem('token');
        
        if(storedToken){
          authContext.authenticate(storedToken);
        }
        setIsTraingLogin(false);
    }
    fetchToken();
    
  },[]);

  if(isTryingLogin){
    return (
      <LoadingOverlay />
    );
  }

  return <Navigation />;
}

export default function App() {

  return (
    <AuthContexProvider>
      <UserSearchHistoryContexProvider>
        <StatusBar
          style='auto'
        />
        <Root />
      </UserSearchHistoryContexProvider>
    </AuthContexProvider>
  );
  
}

const styles = StyleSheet.create({
    bottomTabImage:{
        height: 30,
        width: 30
    },
});