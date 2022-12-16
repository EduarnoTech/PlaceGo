import React, { useState ,useEffect} from "react";
import {SafeAreaView,ScrollView, Alert, Modal,Linking, StyleSheet, Text, Pressable, View } from "react-native";
import { color, set } from "react-native-reanimated";
import PrimaryButton from "./PrimaryButton";
import axios from "axios";
import { Entypo } from '@expo/vector-icons';
const IntrestModal = ({modalVisible,setModalVisible,data,sessionIds,tutorIds,deviceNos,reqAccp}) => {
 
const [popUp2Vissablity,setPopUp2Vissablity]=useState(false)
  const [ask,setAsk]=useState(false)
//Linking
const link=async()=>{
  const supported = await Linking.canOpenURL(data.folderlink_);
 
    if(supported){ await Linking.openURL(data.folderlink_);}
    else {Alert.alert("Link not supported")}
  
}
//after accepting the session
const payload = {
  status: 'accepted'
};
const Accept=async()=>{
  const resp = await axios.put(`https://annular1-331607.el.r.appspot.com/d${deviceNos}/api/sessions/assigned-tutor-acceptance-status/${sessionIds}/${tutorIds}`, payload, {
    headers: ''
  })
   if(resp)console.log("responce saved")
   else{ console.log("API doesnot called");return;}
   setModalVisible(!modalVisible)
}



//after clicking on intrest buttom
const intrested=async()=>{
 
let deviceNo=deviceNos

const resultTutor= await axios.post( `https://annular1-331607.el.r.appspot.com/d${deviceNo}/api/sessions/storeTutorResponse`,
{
  sessionId: sessionIds,  
  tutorId:tutorIds
})

console.log("result",resultTutor.data)
}
 
//first popUp function 


  const popUp1=
    <Modal
            
        animationType="slide"
        transparent={true}
        visible={ask}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={[styles.centeredView]}>
          <View style={styles.modalView}>
            <Text style={{fontSize:20}}>Are you sure?</Text>
          <View style={[styles.intrest,styles.intrestBorder,{width:'55%'}]}>
            <PrimaryButton styleT={{color:'white'}} styleP={{backgroundColor:"hotpink"}} onPress={() => setPopUp2Vissablity(!popUp2Vissablity)}> No </PrimaryButton>
            <PrimaryButton styleT={{color:'white'}} styleP={{backgroundColor:"green"}} onPress={()=>{intrested();setPopUp2Vissablity(!popUp2Vissablity);setModalVisible(!modalVisible)}}> Yes </PrimaryButton>
            </View>
          </View>
        </View>
      </Modal>
   const popUp2=
   <Modal
           
       animationType="slide"
       transparent={true}
       visible={popUp2Vissablity}
       onRequestClose={() => {
         Alert.alert("Modal has been closed.");
         setModalVisible(!modalVisible);
       }}
     >
       <View style={[styles.centeredView]}>
         <View style={styles.modalView}>
           <Text style={{fontSize:20}}>Are you sure?</Text>
         <View style={[styles.intrest,styles.intrestBorder,{width:'55%'}]}>
           <PrimaryButton styleT={{color:'white'}} styleP={{backgroundColor:"hotpink"}} onPress={() =>setPopUp2Vissablity(!popUp2Vissablity)}> No </PrimaryButton>
           <PrimaryButton styleT={{color:'white'}} styleP={{backgroundColor:"green"}} onPress={()=>{Accept();setPopUp2Vissablity(!popUp2Vissablity)}}> Yes </PrimaryButton>
           </View>
         </View>
       </View>
     </Modal>

     //timer 
     const [date_time4,setData_time4]=useState()
     const calculateTimeLeft = () => {
       let year = new Date().getFullYear();
       let difference = +new Date(date_time4) - +Date.now();
       let timeLeft = {};
       if (difference > 0) {
         timeLeft = {
           Days: Math.floor(difference / (1000 * 60 * 60 * 24)),
           Hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
           Min: Math.floor((difference / 1000 / 60) % 60),
           Sec: Math.floor((difference / 1000) % 60),
         };
       }
     
       return timeLeft;
     };
     const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
     

     useEffect(() => {
      setData_time4(data.tutor_deadline)
      const timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);
       
      return () => clearTimeout(timer);
    },[timeLeft]);


  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.intrest}>
          <Text></Text>
        <Pressable onPress={() => setModalVisible(!modalVisible)}  ><Entypo name="circle-with-cross" size={24} color="red" /></Pressable>
            </View>
            <View style={[styles.intrest]}>
            <Text style={ {color:'gray',fontWeight:'bold',fontSize:17}}>deadline:-</Text>
            <Text style={{color:'gray',fontWeight:'bold'} }>{data.tutor_deadline}</Text>
            </View>
            <PrimaryButton styleP={{backgroundColor:'blue'}} >{timeLeft.Days}Day {timeLeft.Hours}Hr {timeLeft.Min}Min {timeLeft.Sec}Sec</PrimaryButton>
           <View style={[styles.intrest,{fontSize:50}]}>
            <Text style={{fontSize:20,color:'gray',fontWeight:'bold'}}>Session ID :-</Text>
            <Text style={{fontSize:20,color:'gray'}}>{data.sessionId}</Text>
            </View>
            <View style={[styles.intrest]}>
            <Text style={[{color:'blue',fontWeight:'bold',fontSize:16},styles.type]}>{data.type}</Text>
              <Text></Text> 

            </View>
             <View style={[styles.intrestBorder,{maxHeight:'50%',width:'100%'}]}>
          <ScrollView>
            <Text style={{color:'gray',fontWeight:'bold',fontSize:15}}>Work Detels</Text>
            <Text style={{color:'gray'}}>{data.workDetails}</Text>
          </ScrollView>
          </View>

          <View style={[styles.intrest,styles.intrestBorder]}>
            <Text style={{fontWeight:'500',color:"gray",width:'80%'}}>G-DRIVE LINK :-</Text>
            <Pressable  android_ripple={{color:'black'}} onPress={link}><Text style={{color:'blue',borderBottomWidth:1,borderBottomColor:'blue'}}>Question Folder</Text></Pressable>
          </View>


            <View style={[styles.intrest,styles.intrestBorder]}>
              <Text style={{fontWeight:'bold',color:'black'}} >AMOUNT</Text>
              <Text style={{fontSize:17,fontWeight:'bold'}}>{data.amount} INR</Text>
            </View>
           
           
           {/* if requestt is accepted or not accepted  */}
           {(reqAccp)?<View style={[styles.intrest,styles.intrestBorder]}>
            <PrimaryButton styleT={{color:'white'}} styleP={{backgroundColor:"hotpink"}} onPress={() => setModalVisible(!modalVisible)}> Reject </PrimaryButton>
            <PrimaryButton styleT={{color:'white'}} styleP={{backgroundColor:"green"}} onPress={()=>setPopUp2Vissablity(true)}> Accept </PrimaryButton>
            </View>:
            <View style={[styles.intrest,styles.intrestBorder]}>
            <PrimaryButton styleT={{color:'white'}} styleP={{backgroundColor:"hotpink"}} onPress={() => setModalVisible(!modalVisible)}> Not Intrest </PrimaryButton>
            <PrimaryButton styleT={{color:'white'}} styleP={{backgroundColor:"green"}} onPress={()=>setAsk(true)}> Intrested </PrimaryButton>
            </View>}

            
            {popUp1}
            {popUp2}
          
          </View>
        </View>
      </Modal>
      
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    
  },
  modalView: {
    width:'100%',
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    paddingTop:10,
    alignItems: "center",
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
    textAlign: "center"
  },
  intrest:{
    flexDirection:'row',
    justifyContent:'space-between',
    flexWrap:'wrap',
    width:'100%',
  },
  intrestBorder:{
    borderTopWidth:1,
    borderColor:'gray',
   
    paddingTop:10,
    marginTop:10
  },
   
});

export default IntrestModal;