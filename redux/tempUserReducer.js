import { commonAPI } from "../src/api/api";

const SET_TEMP_USER = "SET_TEMP_USER";

let tempUserInitialState = {};

//Action creators
const setTempUser = user => ({ type: SET_TEMP_USER, payload: user })

//Thunk creators
export const setTempUserThunk = (id) => (dispatch) => {    
    commonAPI.getUserInfo(id)
    .then(res => {
      console.log("THUNK USER")
      dispatch(setTempUser(res.data))
    })
}


export const tempUser = (state = tempUserInitialState, action) => {
    switch (action.type) {
        case SET_TEMP_USER:             
                state = action.payload
                console.log("OKI TEMP USER")
            return state;
        default:
            return state;
    }
}