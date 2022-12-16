import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
// import HistoryItem from '../components/Dashboard.js/HistoryItem'
import HistoryItem from '../components/HistoryItem'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { ActivityIndicator } from 'react-native-paper'


const History = (props) => {
  const [sessionData , setSessionData ] = useState();
  const id = useSelector(state => state.auth.data.saveTutor.tutor_id);
  const [refreshing , setRefreshing] = useState(false);
  const[loading , setLoading] = useState(false);
  

  const onRefresh = React.useCallback(() => {
    setLoading(true);
    axios.post('https://annular1-331607.el.r.appspot.com/d6/api/allSessions/fetchTutorSession',
    {
      tutor_id:id
    }
    )
    .then(data =>{
      // console.log("SESSION-DATA--->",data.data.sessionData);
      setSessionData(data.data.sessionData);
    })
    .catch(err => console.log(err))
    .finally(e =>{ setRefreshing(false); setLoading(false)});
  }, []);


  useEffect(()=>{
    console.log("ID",id)
    onRefresh();
  },[])


  return (
    <View style={styles.dashboard}>
      <Header props={props} />
     <ScrollView 
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
     showsVerticalScrollIndicator={false}>
      <View style={styles.table}>
      <Text style={styles.headSession}>History</Text>
        {loading ? <ActivityIndicator style={{marginVertical:'100%'}} size="large" color='black'/>
        :
         <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
         <View>
           <HistoryItem  head={true}/>
           {sessionData && sessionData.map(data => <HistoryItem  session ={true} data ={data}/>)}
         </View>
        </ScrollView>}
      
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
    fontSize:20,
    padding:10
  }

})
export default History;

