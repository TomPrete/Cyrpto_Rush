import axios from 'axios'
import history from '../history'


/****** ACTION TYPES ******/

const ADD_RETURN = 'ADD_RETURN'


/****** ACTION CREATORS ******/

const addReturns = returns => ({ type: ADD_RETURN, returns })


/****** THUNK CREATORS ******/

export const addReturnsFromTrade = () =>
  dispatch =>
    axios.post('/api/return')
      .then(res =>
        dispatch(addReturns(res.data)))
      .catch(err => console.log(err))


/****** REDUCER ******/

export default function (returns = [], action) {
  switch (action.type) {
    case ADD_RETURN:
      return [...returns, action.returns]
    default:
      return returns
  }
}
