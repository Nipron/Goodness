import { commonAPI } from "../src/api/api";

const SET_TEMP_IMAGE = "SET_TEMP_IMAGE";

let tempImageInitialState = {};

//Action creators
export const setTempImage = data => ({ type: SET_TEMP_IMAGE, payload: data })

/*//Thunk creators
export const setCategoriesThunk = () => (dispatch) => {    
    commonAPI.getCategories()
    .then(res => {
      console.log("THUNK")
      dispatch(setCategories(res.data))
    })
}*/


export const tempImage = (state = tempImageInitialState, action) => {
    switch (action.type) {
        case SET_TEMP_IMAGE:
             //  let categories = action.payload
               console.log("PIC PIC")
            //  let dd = JSON.stringify(data)
           //     console.log( action.payload )
                state = action.payload
                console.log("OKI PIC")

            // console.log(data)
            return state;
        default:
            return state;
    }
}