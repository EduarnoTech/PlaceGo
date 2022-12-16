export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const SET_TOKEN = "SET_TOKEN"
export const SET_PUSH_TOKEN = "SET_PUSH_TOKEN"

export const login = data => {
    // console.log(data);
  return  {
      type: LOGIN,
      data : data
    }
  
};

export const setTokens = data =>{
  console.log('TOKEN-DATA-SET->' ,{
    accessToken:data.accessToken,
    refreshToken:data.refreshToken
  })
  return {
    type:SET_TOKEN,
    data:{
      accessToken:data.accessToken,
      refreshToken:data.refreshToken
    }
  }
}

export const setPushTokens = pushToken =>{
  console.log('PUSH-TOKEN-DATA-SET->' ,pushToken)
  return {
    type:SET_PUSH_TOKEN,
    data:pushToken
  }
}