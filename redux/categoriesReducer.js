import { commonAPI } from "../src/api/api";

const SET_CATEGORIES = "SET_CATEGORIES";

let categoriesInitialState = {};

//Action creators
export const setCategories = data => ({ type: SET_CATEGORIES, payload: data })

//Thunk creators
export const setCategoriesThunk = () => (dispatch) => {    
    commonAPI.getCategories()
    .then(res => {
      dispatch(setCategories(res.data))
    })
}

export const categories = (state = categoriesInitialState, action) => {
    switch (action.type) {
        case SET_CATEGORIES:               
                state = action.payload
            return state;
        default:
            return state;
    }
}

