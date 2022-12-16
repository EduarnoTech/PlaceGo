import { LOGIN, SIGNUP,SET_TOKEN ,SET_PUSH_TOKEN} from "../action/auth";

const initailValue = {
    data:null,
    accessToken:null,
    refreshToken:null,
    pushToken:null
  };


  export default (state = initailValue, action) => {
    // console.log('CANDIDATE' ,action.data);
    switch (action.type) {
      case LOGIN:
        return {
          ...state,
          data : action.data,
        }

       case SET_TOKEN:
        console.log("CHANGE_TOKEN_DATA" , action.data)
        return{
         ...state,
         accessToken:action.data.accessToken,
         refreshToken:action.data.refreshToken
         }

      case SET_PUSH_TOKEN:
        console.log("CHANGE_PUSH_TOKEN_DATA" , action.data)

        return{
          ...state,
          pushToken:action.data
        }


      default:
        return state;
    }
  };