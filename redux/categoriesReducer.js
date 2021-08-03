import { commonAPI } from "../src/api/api";

const SET_CATEGORIES = "SET_CATEGORIES";

let categoriesInitialState = {};

//Action creators
export const setCategories = data => ({ type: SET_CATEGORIES, payload: data })

//Thunk creators
export const setCategoriesThunk = () => (dispatch) => {    
    commonAPI.getCategories()
    .then(res => {
      console.log("THUNK")
      dispatch(setCategories(res.data))
    })
}


export const categories = (state = categoriesInitialState, action) => {
    switch (action.type) {
        case SET_CATEGORIES:
               let categories = action.payload
               console.log("DATA DATA3")
            //  let dd = JSON.stringify(data)
              //  console.log( categories )
                state = action.payload
                console.log("OKI")

            // console.log(data)
            return state;
        default:
            return state;
    }
}

