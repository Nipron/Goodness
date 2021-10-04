import { messageAPI } from '../src/api/api'

const SET_MESSAGES = 'SET_MESSAGES'

let messagesInitialState = []

//Action creators
const setMessages = data => ({ type: SET_MESSAGES, payload: data })

//Thunk creators
export const setMessagesThunk = () => async dispatch => {
  const res = await messageAPI.getMessages()
  dispatch(setMessages(res)) 

}

export const messages = (state = messagesInitialState, action) => {
  switch (action.type) {
    case SET_MESSAGES:
      state = action.payload
      return state
    default:
      return state
  }
}
