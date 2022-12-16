import { RefreshControl, ScrollView, StyleSheet, Text, View ,ActivityIndicator} from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import TableItem from '../components/Dashboard.js/TableItem'
import axios from 'axios'
import { useSelector } from 'react-redux'

const SessionRequest = (props) => {

  const [sessionData , setSessionData ] = useState();
  const id = useSelector(state => state.auth.data.saveTutor.tutor_id);
  const [refreshing, setRefreshing] = useState(false);
  const[loading ,setLoading] = useState(false);


  const onRefresh = React.useCallback(() => {
    setLoading(true);
    axios.post('https://annular1-331607.el.r.appspot.com/d6/api/allSessions/fetchNotifiedSession',
    {
      tutor_id:id
    }
    )
    .then(data =>{
      console.log("SESSION-DATA--->",data.data.notifiedData);
      setSessionData(data.data.notifiedData);
    })
    .catch(err => console.log(err))
    .finally(e =>{setRefreshing(false) , setLoading(false)});
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
      <Text style={styles.headSession}>Latest Session</Text>
       {!loading ? <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
         <View>
           <TableItem  head={true}/>
           {sessionData && sessionData.map(data =>  <TableItem tutor_id={id} session ={true} data={data}/>)}
         </View>
        </ScrollView> : <ActivityIndicator style={{marginVertical:'100%'}} size="large" color='black'/>}
      
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
export default SessionRequest;

