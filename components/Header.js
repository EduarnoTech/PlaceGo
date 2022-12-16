import { Dimensions, StyleSheet, Text, View ,Modal ,Pressable,Alert,TouchableOpacity, Button} from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import { FontAwesome5} from '@expo/vector-icons'; 
import { useSelector ,useDispatch } from 'react-redux';
import { useState } from 'react';

import * as authAction from '../Redux/action/auth'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { useEffect } from 'react';
import { useCallback } from 'react';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const Header = (props) => {
  
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleNotications, setModalVisibleNotifications] = useState(false);
  const tutorData = useSelector(state => state.auth.data.saveTutor); 
  const [notifications ,setNotifications] = useState([]);
  const [notificationCounter ,setNotificationCounter] = useState(0);

  // const notifications = tutorData.notificationStack
  const tutorId = tutorData.tutor_id;

  // console.log("HEAD-->",tutorData.notificationStack[0])

  const dispatch = useDispatch();

  


  const clearAllHandler = async() =>{

  const delAllNotification = await axios.get(`https://drifting-console.el.r.appspot.com/api/tutorWeb/delete_all_app_notification/${tutorId}`)
   
  setNotificationCounter(0);
    if (delAllNotification.data.success){
      alert("Notification deleted!")
      setNotifications([]);
    }

  }

  const DeletNotificationHandler = useCallback(async(id) =>{
    const delNotification = await axios.post(`https://drifting-console.el.r.appspot.com/api/tutorWeb/delete_app_notification/${tutorId}`,{
      uid : id
    })
      
    setNotificationCounter(prev => prev - 1);
    if (delNotification.data.success){
      alert("Notification deleted!")
    }
  }
  ,[])


   const readNotificationHandler = useCallback(async() => {

    const changeStatusNotification = await axios.get(`https://drifting-console.el.r.appspot.com/api/tutorWeb/change_notification_status/${tutorId}`)
  
      if (changeStatusNotification.data.success){
        alert("Notification Status changed!!")
      }
    }
   ,[])
  

  useEffect(()=>{

    axios.get(`https://drifting-console.el.r.appspot.com/api/tutorweb/getDetails/${tutorId}`)
    .then(resData=>{
    setNotifications(resData.data.notificationStack);
    setNotificationCounter(resData.data.notificationStack);
    // console.log("NOTI-->");
    })

  },[notificationCounter])

  

 

  return (
   
    <SafeAreaView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleNotications}
      >
        <View style={styles.centeredView}>
          
          <ScrollView showsVerticalScrollIndicator={false} style={styles.modalView}>
          <Pressable  style={{alignItems:'flex-end'}} onPress={() => setModalVisibleNotifications(false)}><Text style={{color:'red',fontSize:18,fontWeight:'500'}}>Cancel</Text></Pressable>
            <Text style={{fontSize:17 , fontWeight:'600' , marginVertical:'5%'}}>Notifications</Text>
            {notifications.map(notification => <TouchableOpacity onPress={()=> readNotificationHandler()} style={{flexDirection:'row' ,marginTop:'2%',paddingBottom:'5%',borderBottomColor:'grey'}}>
              <View style={{width:windowWidth * .70}}>
                <Text style={{color : notification.read ? ' #000080':'black'}}>{notification.title}</Text>
              </View>
              <TouchableOpacity style={{flexDirection:'row-reverse' , marginRight:'5%'}} onPress={()=>DeletNotificationHandler(notification.uid)}>
              <AntDesign name="delete" size={24} color="red" />
              </TouchableOpacity>
            </TouchableOpacity>)}
            <View style={{marginVertical:'2%'}}>
              <Button title='CLEAR ALL' color="red" onPress={() => clearAllHandler()}/>
            </View>
            
          </ScrollView>
         
        </View>
      </Modal>


   <View style={[styles.card, styles.shadowProp,styles.main]}>
    <Modal
        animationType="slide"
        style={{
          margin:0,
          justifyContent:null,
          alignItems:null
        }}
        onPressOut={() => setModalVisible(false)}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
           
            <Pressable  style={{alignItems:'flex-end'}} onPress={() => setModalVisible(false)}><Text style={{color:'red',fontSize:18}}>Cancel</Text></Pressable>

         
                <View style={{flexDirection:'row' ,marginVertical:'2%'}}>
                 <Text style={{marginHorizontal:windowWidth * 0.01,width:windowWidth * 0.3}}>Subject</Text>  
                 <Text style={{marginHorizontal:windowWidth * 0.01,width:80}}>Total marks</Text>   
                 <Text style={{marginHorizontal:windowWidth * 0.01,width:50}}>marks</Text>
                 <Text style={{marginHorizontal:windowWidth * 0.01,width:50}}>status</Text>
                </View>
             {tutorData && tutorData.tutor_exam.map(exam =>{
              return (
                <View>
                <View key={exam.exam_id} style={{flexDirection:'row' ,margin:'2%'}} >
                 <Text style={{marginHorizontal:windowWidth * 0.01,width:windowWidth * 0.3}}>{exam.subject}</Text>  
                 <Text style={{marginHorizontal:windowWidth * 0.01,width:80}}>{exam.passing_marks}</Text>   
                 <Text style={{marginHorizontal:windowWidth * 0.01,width:50}}>{exam.marks}</Text>
                 <Text style={{marginHorizontal:windowWidth * 0.01,width:50 , color:exam.status==='pass'?'green':'red'}}>{exam.status}</Text>
                </View>
                </View>
                )
             })}
            
          </View>
        </View>
      </Modal>
    <TouchableOpacity onPress={()=>props.props.navigation.openDrawer()
} style={[styles.icon,styles.hamer]}>
    <Feather name="menu" size={24} color="black" />
    </TouchableOpacity>

    <View style ={styles.user}>
    
    <View style={styles.name}>
        <Text style={styles.nameUser}>Hi, {tutorData.name}</Text>
    </View>

    <TouchableOpacity  onPress={()=>setModalVisible(true)} style={styles.icon}>
    <FontAwesome5 name="book-reader" size={24} color="black" />
    </TouchableOpacity>

    <TouchableOpacity  style={styles.icon} onPress={()=>setModalVisibleNotifications(true)}>
    <Ionicons name="notifications" size={24} color="black" />
    </TouchableOpacity>
    
    <TouchableOpacity style={styles.icon} onPress={() => dispatch( authAction.setTokens({
      accessToken:null,
      refreshToken:null
    }))}>
    <AntDesign name="logout" size={24} color="black" />
    </TouchableOpacity>
    
    </View>
    
    </View>
    </SafeAreaView>
  )
}

export default Header

const styles = StyleSheet.create({

    main:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
  
    card: {
      backgroundColor: 'white',
      borderRadius: 0,
      paddingVertical: 20,
      paddingHorizontal: 10,
      width: '100%',
      marginVertical: 10,
    },
    shadowProp: {
      shadowColor: '#171717',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation:5
    },

    name:{
        borderWidth:1,
        paddingHorizontal:10,
        paddingVertical:5,
        borderRadius:25,
        borderColor: '#9499a1',
        marginHorizontal:'3%'

    },
    nameUser:{
        opacity:.7
    },

    icon:{
      marginLeft:20
    },
    user:{
        flexDirection:'row',
        justifyContent:'flex-end',
        flex:1
    },
    hamer:{
       marginLeft:'10%'
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
      paddingBottom:22
    
    }
    ,
    modalView: {
     
      marginVertical:20,
   
      width:windowWidth * 0.95,
      backgroundColor: "white",
      borderRadius: 20,
      padding: windowHeight * 0.02,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
      fontSize:20
    },
    add:{color:'#5048E5' ,fontSize:20 , borderWidth:1 , borderColor:'#5048E5' ,paddingHorizontal:'5%' ,paddingVertical:'1%' ,marginVertical:'5%' ,borderRadius:10}
  
  
   
  });
  