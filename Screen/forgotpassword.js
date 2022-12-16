import { Button, Image, ScrollView, StyleSheet, Text, TextInput, View ,ActivityIndicator} from 'react-native'
import React, { useState } from 'react'
import { Dimensions , KeyboardAvoidingView} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;




const Forgotpassword = ({ navigation}) => {


 const [email,setEmail] = useState('');
 const [loading,setLoading] = useState(false);


  const resetUserPassword = async () => {
    if (password === cpassword) {
      try {
        const data = {
          clientId: params.clientId,
          password: password,
        };
        const res = await axios.post(
          `https://drifting-console.el.r.appspot.com/api/sessions/resetPassword`,
          data
        );
        console.log(res.data)
        if (res.data.success) {
          alert('Password Changed Successfully! Login with new password.');
          history.push('/SignIn');
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      alert('Password Mismatch');
    }
  };

  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === "ios" ? "padding" : "height"}
    //   style={styles.container}
    // >
    <ScrollView>
    <View style={{justifyContent:'center',marginHorizontal:'2%',backgroundColor:'white',paddingBottom:windowHeight * 0.02}} >
      <Image source={{uri:'https://thetutorlancer.com/static/media/login.3717c358e790aef2d5bb.png'}} style={{width:windowHeight*.5,height:windowHeight*.5 , resizeMode:'contain'}} />
      {/* <Button onPress={()=>props.navigation.navigate('Signup')}  title="Go to signUp"/> */}
     
     <View style={styles.loginBox}>
      <Text style={styles.header}>Reset Password</Text> 
     </View>
     <View style={styles.inputBox}>
      <View>
        <Text style={{padding:10}}>Email Adress</Text>
        <TextInput placeholder='Enter your email' keyboardType='email-address' style={styles.input} />
      </View>
      
      <View style={{flexDirection:'row' , justifyContent:'space-between',alignItems:'center',margin:'1%'}}>
       <TouchableOpacity  style={styles.button}>
        <Text style={styles.buttonText}>Reset Password</Text>
       </TouchableOpacity>
      </View>

   <View style={{flexDirection:'row',marginHorizontal:'5%'}}>
      <Text style={{color:'#677294'}}>Don't have a account? </Text>
     <TouchableOpacity onPress={()=> navigation.navigate('Signup')}>
      <Text style={styles.forgot}>Sign Up</Text>
     </TouchableOpacity>
      </View>
      
    </View>
    </View>
   
    </ScrollView>
    // {/* // </KeyboardAvoidingView> */}
  )
}

export default Forgotpassword

const styles = StyleSheet.create({
  header:{
    fontWeight:'500',
    fontSize:20,
  },
  loginBox:{
   margin:'5%'
  },
  input: {
    paddingHorizontal:windowWidth * 0.05,
    paddingVertical:windowHeight * 0.015,
    backgroundColor:'#E8F0FE',
    borderRadius: 5,
    textAlignVertical: "top",
    marginTop: '1%',
    fontSize:15
  },
  inputBox:{
    marginHorizontal:windowWidth * 0.02,
    marginVertical:windowHeight * 0.01
  },
  button:{
    backgroundColor:'#5E2CED',
    width:200,
    height:50,
    borderRadius:5,
    justifyContent:'center',
    alignItems:'center',
    marginVertical:'5%'

  },
  buttonText:{
    color:'white',
    fontWeight:'500'
  },
  forgot:{
    color:'#007BFF'
  }

})