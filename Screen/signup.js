import { Button, Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Dimensions , KeyboardAvoidingView} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {useSelector } from 'react-redux';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const Signup= ({navigation}) => {
  
  const [email ,setEmail] =useState('');
  const [name ,setName] =useState('');
  const [password ,setPassword] =useState('');
  const [resetPassword ,setResetPassword] =useState('');
  
  const data = useSelector(state => state.auth.data);
  // console.log(data)
  
  const onSignUp = () =>{
    console.log(
      name,email,password,resetPassword
    )
  }

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
      <Text style={styles.header}>Sign In</Text> 
     </View>
     <View style={styles.inputBox}>
     <View>
        <Text style={{padding:10}}>Name</Text>
        <TextInput 
          value={name} 
          onChangeText={(val)=>setName(val)}
          placeholder='Enter your name'
          keyboardType='email-address'
          style={styles.input} />
      </View>
      <View>
        <Text style={{padding:10}}>Email Adress</Text>
        <TextInput
        value={email}
         onChangeText={val => setEmail(val)}
         placeholder='Enter your email' 
         keyboardType='email-address' 
         style={styles.input} />
      </View>
      <View>
        <Text style={{padding:10}}>Password</Text>
        <TextInput 
        value={password}
        onChangeText={val => setPassword(val)}
        placeholder='********'
        secureTextEntry={true} 
        style={styles.input} />
      </View>
      <View>
        <Text style={{padding:10}}>Confirm Password</Text>
        <TextInput 
        value={resetPassword}
        onChangeText={val => setResetPassword(val)}
        placeholder='*******'
        secureTextEntry={true}  
        style={styles.input} />
      </View>
      

      <View style={{flexDirection:'row' , justifyContent:'space-between',alignItems:'center',margin:'5%'}}>
       <TouchableOpacity onPress={onSignUp}  style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
       </TouchableOpacity>
       {/* <TouchableOpacity >
        <Text style={styles.forgot}>Forgot Password?</Text>
       </TouchableOpacity> */}
      </View>
      {/* By clicking Sign Up, you agree to our */}
      


      <View style={{flexDirection:'row',marginHorizontal:'5%'}}>
      <Text style={{color:'#677294'}}>Already have a account? </Text>
     <TouchableOpacity onPress={()=>navigation.navigate('Login')} >
      <Text style={styles.forgot}>Sign In</Text>
     </TouchableOpacity>
      </View>
      
    </View>
    </View>
   
    </ScrollView>
    // {/* // </KeyboardAvoidingView> */}
  )
}

export default  Signup;

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
    width:120,
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