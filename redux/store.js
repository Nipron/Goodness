import { combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { categories } from './categoriesReducer'
import { categoriesFlat } from './categoriesFlatReducer'
import { tempImage } from './tempImageRducer'
import { tempUser } from './tempUserReducer'
import { messages } from './messagesReducer'
import { userAPI } from '../src/api/api'

import _ from "lodash"

const UPDATE_ALL = "UPDATE_ALL"


let allInitialState = {}


export const updateAll = data => {
    return ({ type: UPDATE_ALL, payload: data })
}

//Thunk creators
export const updateProfileThunk = (res) => async dispatch => {
    const response = await userAPI.dashboard()
 /*   if (res) {
        console.log("КОЛ-ВО ЗАКАЗОВ - РЕДАКС VH", res.orders.length)
    }
    console.log("КОЛ-ВО ЗАКАЗОВ - РЕДАКС", response.orders.length)*/
    dispatch(updateAll(response))
}

export const all = (state = allInitialState, action) => {
    switch (action.type) {
        case UPDATE_ALL:
            //  state = _.cloneDeep(JSON.parse(action.payload))
            state = Object.assign({}, { ...action.payload })
            //     state = JSON.parse(action.payload)
            return state;
        default:
            return state;
    }
}

const reducers = combineReducers({ all, categories, categoriesFlat, tempImage, tempUser, messages })

export default reducers;