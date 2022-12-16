import React,{useState} from "react";
import axios from "axios";
import { View,Text} from "react-native";
 import IntrestModal from "./IntrestModal";
import PrimaryButton from "./PrimaryButton";



// sessionId: 2040911014,
      
    //   tutorId: EDUT1470,

  
          

const ShowedInterest=({sessionIds,tutorIds,deviceNos,value,Tcolor,Bcolor,pressAble,reqAccp})=>{
 
    const [assDetels,setAssDetels]=useState({
        amount:"Not found",
        type:"Not found",
        date_time:"Not found",
        tutor_deadline:"Not found",
        duration:"Not found",
        folderlink_:"Not found",
        workDetails:"Not found",
        tutorInterested1:{}
    })
 

    const [modalVisible, setModalVisible] = useState(false);
const deviceNo=deviceNos
    //api calling
    const viewDetel=async()=>{
        
// PROJ 
//
        const tutor_show = await axios.post(
            `https://annular1-331607.el.r.appspot.com/d${deviceNo}/api/sessions/getTutorFormData`,
            {
            sessionId:sessionIds,
            tutorId: tutorIds,
            });
            if (tutor_show.data.success || tutor_show.data.status==='interested' ) {
            //   console.log("CLICKEDddd")
                  let SI='LIVE'
                  if(tutor_show.data.type==="Project"){SI="PROJ"}
                  else{if(tutor_show.data.type==="Assignment"){SI="ASSII"}}
                 setAssDetels({
                     amount:tutor_show.data.tutor_dealt_amount,
                     type : tutor_show.data.type,
                     subject:tutor_show.data.subject,
                     date_time : tutor_show.data.date_time,
                     tutor_deadline:tutor_show?.data?.tutor_deadline,
                     duration : tutor_show?.data?.tutor_duration,
                     folderlink_ : tutor_show.data.folderlink,
                     workDetails : tutor_show.data.client_comments,
                     sessionId:SI+sessionIds
                    //  tutorInterested1 : tutor_show?.data?.tutorInterested
                    })
 
                const tutorInterested1 = tutor_show?.data?.tutorInterested; //"Array"
                  
              }
               
          }
        
          
          
          
          

    return(

        <View>
            {/* this button is like "Show Intrest" button after clicking thi a module should be open */}
            <PrimaryButton styleP={{backgroundColor:Bcolor}} styleT={{color:Tcolor}} onPress={()=>{
               if(pressAble){ viewDetel();
                setModalVisible(true)}
                }}>{value}</PrimaryButton>

             <IntrestModal   reqAccp={reqAccp} data={assDetels} modalVisible={modalVisible} setModalVisible={setModalVisible} sessionIds={sessionIds} tutorIds={tutorIds}  deviceNos={deviceNos}/>
        </View>
    )
}

export default ShowedInterest