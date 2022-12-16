import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import TableItem from '../components/Dashboard.js/TableItem'
import axios from 'axios'
import { useSelector } from 'react-redux'
import UpcommingSessionItem from '../components/UpcommingSessionItem'

const UpcommingSession = (props) => {

  const [sessionData , setSessionData ] = useState();
  const id = useSelector(state => state.auth.data.saveTutor.tutor_id);
  const email = useSelector(state => state.auth.data.saveTutor.email);
  // console.log(id);

  useEffect(()=>{
    // console.log("ID",id)
  axios.post('https://annular1-331607.el.r.appspot.com/d6/api/allSessions/fetchTutorSession',
  {
    tutor_id:id
  }
  )
  .then(data =>{
    
    setSessionData(data.data.upcomingSessionData);
  })
  .catch(err => console.log(err))
  },[])
  return (
    <View style={styles.dashboard}>
      <Header props={props} />
     <ScrollView showsVerticalScrollIndicator={false}>
      <View>
      <Text style={[styles.headSession,styles.table]}> Session</Text>
        <ScrollView>

         <View>
           {sessionData &&  sessionData.map(data => <UpcommingSessionItem  data = {data} email={email}/>)}
         </View>
        </ScrollView>
      
      </View>
      </ScrollView>

     
      
  

    </View>
  )
}


const styles = StyleSheet.create({

  dashboard:{
    flex:1,
    marginHorizontal:'3%'
  },
  table:{
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation:5,
    width:'100%',
    marginBottom:'5%',
    backgroundColor:'white',
    padding:10

  },
  headSession:{
    fontWeight:'400',
    fontSize:16,
    padding:10
  }

})
export default UpcommingSession;

