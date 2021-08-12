import { commonAPI } from "../src/api/api";

const SET_CATEGORIES_FLAT = "SET_CATEGORIES_FLAT";

let categoriesFlatInitialState = {};

//Action creators
const setCategoriesFlat = data => ({ type: SET_CATEGORIES_FLAT, payload: data })

//Thunk creators
export const setCategoriesFlatThunk = () => (dispatch) => {    
    commonAPI.getCategoriesFlat()
    .then(res => {
      console.log("THUNK CAT FLAT")
      dispatch(setCategoriesFlat(res.data))
    })
}

export const categoriesFlat = (state = categoriesFlatInitialState, action) => {
    switch (action.type) {
        case SET_CATEGORIES_FLAT:               
                state = action.payload
            return state;
        default:
            return state;
    }
}

