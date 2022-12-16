import { Alert, Modal,Button,    Pressable, Linking, StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react'
import  { useCallback } from "react";
import { TouchableOpacity } from 'react-native-gesture-handler'
import moment from "moment";
import axios from 'axios';
 import ShowedInterest from '../showIntrest/showIntrest';
 
const TableItem =props => {
 
 
    // if(props.data == undefined)
    // console.log('TABLE()',props.data)


    let deviceNo;
    if(props.data){
      
      if(props.data.sessionId.length == 10){
        deviceNo = props.data.sessionId.slice(0,1);
      }else{
        deviceNo = props.data.sessionId.slice(0,2);
      }

    }
   

    // if(props.data.sessionId.length > 10){
    //   // deviceNo = props.data.sessionId.slice(0,2);
    // }




    if(props.head){
     
        return (
            <View style={styles.tableItem} key= {props.data?props.data.sessionId:""}>
              <Text style={styles.itemText}>Session Id</Text>
              <Text style={styles.itemText}>Type</Text>
              <Text style={styles.itemText}>Subject</Text>
              <Text style={styles.itemText}>Date</Text>
              <View style={styles.itemText}><Text>Status</Text></View>
            </View>
          )
    }

    // lalan editing
  //   const [viewDetel,setViewDetel]=useState([])
 
  // const viewDetels= async()=>{
  //    setModalVisible(true)
  //   console.log("CLICKED")
  //   if (props?.data?.sessionId.length ==10){
      
  //     deviceNo = props?.data?.sessionId.slice(0,1)
  //     console.log("this is required:-",props?.data?.sessionId,"  ",props.tutor_id)
      
  // }
 
  // const tutor_show = await axios.post(
  //     `https://annular1-331607.el.r.appspot.com/d${deviceNo}/api/sessions/getTutorFormData`,
  //     {
  //     sessionId: props?.data?.sessionId,
      
  //     tutorId: props.tutor_id,
  //     });
  //     if (tutor_show.data.success || tutor_show.data.status==='interested' ) {
  //       console.log("CLICKEDddd")
  //          amount = tutor_show.data.tutor_dealt_amount;
  //          type = tutor_show.data.type; //value is either "Live Session" or "Assignment"
  //          subject = tutor_show.data.subject;
  //          date_time = tutor_show.data.date_time;
  //          tutor_deadline=tutor_show?.data?.tutor_deadline
  //          duration = tutor_show?.data?.tutor_duration;
  //          folderlink_ = tutor_show.data.folderlink;
  //          workDetails = tutor_show.data.client_comments;
  //          tutorInterested1 = tutor_show?.data?.tutorInterested; //"Array"
  //          setViewDetel([amount,type,subject,date_time,tutor_deadline,folderlink_,workDetails,tutorInterested1])
  //       }
  //   }


    
    const OpenURLButton = ({ url, children }) => {
      const handlePress = useCallback(async () => {
        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(url);
    
        if (supported) {
          // Opening the link with some app, if the URL scheme is "http" the web link should be opened
          // by some browser in the mobile
          await Linking.openURL(url);
        } else {
          Alert.alert(`Don't know how to open this URL: ${url}`);
        }
      }, [url]);
    
      return <Button title={children} onPress={handlePress} />;
    };
    //lalan editing end


    console.log("", props.data.showedInterest)
 
 
   

    if(props.session){
        return (
            <View style={styles.tableItem} key= {props.data?props.data.sessionId:""}>
              
              <Text style={styles.itemText}> {props.data?props.data.sessionId:""} </Text>
              <Text style={styles.itemText}> {props.data?props.data.type:""} </Text>
              <Text style={styles.itemText}> {props.data?props.data.subject:""} </Text>
              <Text style={styles.itemText}> {props.data?moment(props.data.deadline).format(" MMM Do YYYY, h:mm a"):""} </Text>

              
              {props.data.showedInterest && props.data.acceptRequest  ?
             <ShowedInterest reqAccp={props.data.acceptRequest}  pressAble={true} Tcolor={'white'} Bcolor={'green'} value={"Accept Session"} sessionIds={props?.data?.sessionId} tutorIds={props.data.tutor_id}  deviceNos={deviceNo}/>
              :
              props.data.showedInterest ?
              //  <TouchableOpacity  style={[styles.itemText,styles.status]}><Text style={{color:'#D3D3D3'}}>Shown Interest</Text></TouchableOpacity> : 
              <ShowedInterest pressAble={false} Tcolor={'white'} Bcolor={'rgb(189, 188, 188)'} value={"Shown Intrest"} sessionIds={props?.data?.sessionId} tutorIds={props.data.tutor_id}  deviceNos={deviceNo}/>:
               //<TouchableOpacity onPress={()=>Linking.openURL(props.data && `https://tutor-response.tutorpoint.in/d${deviceNo}/tutorForm/${props?.data?.sessionId}/${props.data.tutor_id}?accept_task=success`) } style={[styles.itemText,styles.status]}><Text style={{color:'black'}}>Show Interest</Text></TouchableOpacity>
               <ShowedInterest   pressAble={true} value={"Show Intrest"} Tcolor={'white'} Bcolor={'blue'} sessionIds={props?.data?.sessionId} tutorIds={props.data.tutor_id}  deviceNos={deviceNo}/> 
               
              
              }

              
            </View>
          )
    }

  return (
    <View style={styles.tableItem} key= {props.data?props.data.sessionId:""}>
    <Text style={styles.itemText}> {props.data?props.data.sessionId:""} </Text>
    <Text style={styles.itemText}> {props.data?props.data.type:""} </Text>
    <Text style={styles.itemText}> {props.data?props.data.subject:""} </Text>
    <Text style={styles.itemText}> {props.data?moment(props.data.deadline).format(" MMM Do YYYY, h:mm a"):""} </Text>
      <View style={[styles.itemText,styles.status]}><Text style={{ color:props.data?props.data.work_status === "Completed" ? 'green':'orange':"black"}}>{props.data?props.data.work_status:""}</Text></View>
    </View>
  )
}

export default TableItem

const styles = StyleSheet.create({
  url:{
  
    backgroundColor:'red',
    alignItems:'center',

  },
  tableItem:{
    flexDirection:'row',
    justifyContent:'space-between',
    borderBottomColor:'#D3D3D3',
    borderBottomWidth:1,
    paddingVertical:10,
    justifyContent:'center',
    textAlign:'center'
},
itemText:{
    margin:10,
    paddingHorizontal:10,
    paddingVertical:3,
    width:110,
    textAlign:'center',
    marginHorizontal:'auto'
},
    status:{
        borderRadius:20,
        borderColor:'#D3D3D3',
        // borderWidth:1
    },
  



    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
     
    },
    modalView: {
      margin: 10,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
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
    }
    
})