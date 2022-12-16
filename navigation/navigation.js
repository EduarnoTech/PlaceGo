import * as React from 'react';
import { Button, View ,Image, Text, Platform } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {useDispatch, useSelector} from 'react-redux';

import Dashboard from '../Screen/dashboard';
import SessionRequest from '../Screen/SessionRequest';

import History from '../Screen/History'

import UpcommingSession from '../Screen/UpcommingSession'
import { SimpleLineIcons,AntDesign } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { FontAwesome5 ,Feather} from '@expo/vector-icons'; 
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../Screen/login';
import Signup from '../Screen/signup';
import Forgotpassword from '../Screen/forgotpassword';



//notifications 
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';


import * as authAction from '../Redux/action/auth';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


  const StackNavigation = () =>{

    return (
      <Stack.Navigator     
      screenOptions={{
        // title: 'My home',
        headerLeft: () => <></>,
        headerTitle: (props) => ( // App Logo
        <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',padding:'5%'}}>
          {/* {console.log(props)} */}
        
          <Image
          style={{ width: 60, height: 50 }}
          source={require('../assets/download.png')}
           resizeMode='contain'
        />
        <Text style={{color:'#0056B3',fontSize:20}}> PlaceGo</Text>
        </View>
        
      ),
        headerStyle: {
          backgroundColor: 'white',
          shadowColor: '#171717',
          shadowOffset: {width: -2, height: 4},
          shadowOpacity: 0.2,
          shadowRadius: 3,
          elevation:5
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>



      <Stack.Screen name="Login"   component={Login}  />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Forgotpassword" component={Forgotpassword} />
    </Stack.Navigator>

    )
  }
  
  const DrawerNavigation =()=> {
    return (
      
        <Drawer.Navigator initialRouteName="Dashboard">
          <Drawer.Screen name="Dashboard" component={Dashboard} options={{
            title:"Dashboard",
            drawerIcon:({focused,size}) => (
              <SimpleLineIcons name="home" size={20} color="black" />
            )
          }} />
          
          <Drawer.Screen name="SessionRequest" component={SessionRequest}  options={{
            title:"TaskRequest",
            drawerIcon:({focused,size}) => (
             <AntDesign name="menuunfold" size={20} color="black" /> 
            )
          }}  />
          <Drawer.Screen name="History" component={History} options={{
            title:"History",
            drawerIcon:({focused,size}) => (
              <MaterialIcons name="history" size={22} color="black" />
            )
          }}  />

          <Drawer.Screen name='UpcommingSession' component={UpcommingSession}
          options={{
            title:"UpcommingTask",
            drawerIcon:({focused,size}) => (
              <FontAwesome5 name="chalkboard-teacher" size={20} color="black" />
            )
          }}
          
          />
        
         
        
        
        </Drawer.Navigator>
      
    );
  }


  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });


  const MainNavigation = () =>{


    async function schedulePushNotification() {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "You've got mail! 📬",
          body: 'Here is the notification body',
          data: { data: 'goes here' },
        },
        trigger: { seconds: 2 },
      });
    }

   const data = useSelector(state => state.auth.accessToken);
   const dispatch = useDispatch();

   console.log('MAIN-->',data)


   async function registerForPushNotificationsAsync() {
    let token;
  
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
         alert(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
    //ExponentPushToken[bK1wTyGM_Opk6HMbnVSrE8]
    return token;
  }

   useEffect(() => {
   registerForPushNotificationsAsync().then(token =>{
    console.log("TOKEN-->",token);
    dispatch(authAction.setPushTokens(token));
    
  });

   const sub1 = Notifications.addNotificationReceivedListener(notification => {
    console.log("NOTIFICATION RECIEVED");
    });

    const sub2 =  Notifications.addNotificationResponseReceivedListener(response => {
     console.log("NOTIFICATION GET CLICKED")
    });

    return () => {
      sub1.remove();
      sub2.remove();
    //   Notifications.removeNotificationSubscription(notificationListener.current);
    //   Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);


  //  return <View style={{marginTop:'28%'}}><Button title='CLICK ME' onPress={schedulePushNotification}/></View>

    return  data ?<DrawerNavigation /> :<StackNavigation/>;
  }

  export default MainNavigation;