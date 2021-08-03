import {combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { categories } from './categoriesReducer'
import { tempImage } from './tempImageRducer'

const UPDATE_ALL = "UPDATE_ALL"


let allInitialState = {}


export const updateAll = data => {
    return ({ type: UPDATE_ALL, payload: data })
}

export const all = (state = allInitialState, action) => {
    switch (action.type) {
        case UPDATE_ALL:
            state = JSON.parse(action.payload)
            return state;
        default:
            return state;
    }
}

const reducers = combineReducers({all, categories, tempImage})

export default reducers;