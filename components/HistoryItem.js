import { StyleSheet, Text, View} from 'react-native'
import React from 'react'
import Checkbox from 'expo-checkbox';
import moment from "moment";
import { TouchableOpacity } from 'react-native-gesture-handler'

const HistoryItem=props => {

  // console.log(props.data?props.data.type:'')
    
    if(props.head){
     
        return (
            <View style={styles.tableItem} key={new Date() * 1000}>
              <Text style={styles.itemText}>Session Id</Text>
              <Text style={styles.itemText}>Type</Text>
              <Text style={styles.itemText}>Subject</Text>
              <Text style={styles.itemText}>Date</Text>
              <Text style={styles.itemText}>Amount</Text>
              <View style={styles.itemText}><Text>Status</Text></View>
            </View>
          )
    }

  
        return (
            <View style={styles.tableItem} key={props.data.sessionId}>
              <View style={[styles.itemText,{flexDirection:'row',justifyContent:'space-around'}]}>
              <Checkbox
               value={props.data.work_status === "Completed"}
              />
                <Text> {props.data?props.data.sessionId:""}</Text>
                </View>
              <Text style={styles.itemText}>{props.data?props.data.type:""}</Text>
              <Text style={styles.itemText}>{props.data?props.data.subject:""}</Text>
              <Text style={styles.itemText}>{props.data?moment(props.data.deadline).format(" MMM Do YYYY, h:mm a"):""}</Text>
              <Text style={styles.itemText}>{props.data?props.data.tutor_dealt_amount? "₹" + (+props.data.tutor_dealt_amount/100):'--':'--'}</Text>
              <View style={[styles.itemText]}><Text style={{ color:props.data?props.data.work_status === "Completed" || props.data.work_status === "solution sent" ? 'green':'orange':"black"}}>{props.data?props.data.work_status:""}</Text></View>
            </View>
          )
        }



export default HistoryItem;

const styles = StyleSheet.create({
    tableItem:{
        flexDirection:'row',
        justifyContent:'space-between',
        borderBottomColor:'#D3D3D3',
        borderBottomWidth:1,
        paddingVertical:10
    },
    itemText:{
        margin:10,
        paddingHorizontal:10,
        paddingVertical:3,
        width:150,
    },
    status:{
        borderRadius:20,
        borderColor:'#D3D3D3',
        borderWidth:1
    }
    ,
    checkbox: {
        alignSelf: "center",
      },
})