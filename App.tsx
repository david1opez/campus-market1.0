import { useState, useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import Constants from 'expo-constants';
import { StripeProvider } from '@stripe/stripe-react-native';
import { initializeApp } from 'firebase/app';
import { LogBox } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// SCREENS
import Location from './screens/Location';
import Home from './screens/Home';
import Post from './screens/Post';
import Login from './screens/Login';
import ForgotPassword from './screens/ForgotPassword';
import UserType from './screens/Register/UserType';
import StoreDetails from './screens/Register/StoreDetails';
import Products from './screens/Register/Products';
import UserDetails from './screens/Register/UserDetails';
import Chats from './screens/Chats';
import Messages from './screens/Messages';
import EditPost from './screens/EditPost';
import ScanQr from './screens/ScanQr';

// TYPES
import { RootStackParamList } from './types/RootStackParamList';


const Stack = createStackNavigator<RootStackParamList>();

const firebaseConfig = {
  apiKey: Constants?.manifest?.extra?.FIREBASE_API_KEY,
  authDomain: Constants?.manifest?.extra?.FIREBASE_AUTH_DOMAIN,
  projectId: Constants?.manifest?.extra?.FIREBASE_PROJECT_ID,
  storageBucket: Constants?.manifest?.extra?.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Constants?.manifest?.extra?.FIREBASE_MESSAGING_SENDERID,
  appId: Constants?.manifest?.extra?.FIREBASE_APP_ID,
};

export default function App() {
  LogBox.ignoreAllLogs();

  const [userLocation, setUserLocation] = useState(null)

  const firebaseApp = initializeApp(firebaseConfig);

  const GetUserLocation = async () => {
    const location = await AsyncStorage.getItem('@Location');

    if(location) {
      setUserLocation(JSON.parse(location))
    }
  }

  let [fontsLoaded] = useFonts({
    GorditaThin: require('./assets/fonts/GorditaThin.otf'),
    GorditaLight: require('./assets/fonts/GorditaLight.otf'),
    GorditaRegular: require('./assets/fonts/GorditaRegular.otf'),
    GorditaMedium: require('./assets/fonts/GorditaMedium.otf'),
    GorditaBold: require('./assets/fonts/GorditaBold.otf'),
    GorditaBlack: require('./assets/fonts/GorditaBlack.otf')
  });

  useEffect(() => {
    GetUserLocation();
  }, [])

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  if(userLocation === null) {
    return (
      <StripeProvider publishableKey={Constants?.manifest?.extra?.STRIPE_PUBLISHABLE_KEY}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Location" component={Location} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Post" component={Post} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="Register_UserType" component={UserType} />
            <Stack.Screen name="Register_StoreDetails" component={StoreDetails} />
            <Stack.Screen name="Register_Products" component={Products} />
            <Stack.Screen name="Register_UserDetails" component={UserDetails} />
            <Stack.Screen name="Chats" component={Chats} />
            <Stack.Screen name="Messages" component={Messages} />
            <Stack.Screen name="EditPost" component={EditPost} />
            <Stack.Screen name="ScanQr" component={ScanQr} />
          </Stack.Navigator>
        </NavigationContainer>
      </StripeProvider>
    );
  } else {
  return(
    <StripeProvider publishableKey={Constants?.manifest?.extra?.STRIPE_PUBLISHABLE_KEY}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Post" component={Post} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="Register_UserType" component={UserType} />
          <Stack.Screen name="Register_StoreDetails" component={StoreDetails} />
          <Stack.Screen name="Register_Products" component={Products} />
          <Stack.Screen name="Register_UserDetails" component={UserDetails} />
          <Stack.Screen name="Location" component={Location} />
          <Stack.Screen name="Chats" component={Chats} />
          <Stack.Screen name="Messages" component={Messages} />
          <Stack.Screen name="EditPost" component={EditPost} />
          <Stack.Screen name="ScanQr" component={ScanQr} />
        </Stack.Navigator>
      </NavigationContainer>
    </StripeProvider>
  )}
}
