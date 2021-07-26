import {combineReducers} from 'redux'

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

const reducers = combineReducers({all})

export default reducers;