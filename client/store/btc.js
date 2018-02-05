import axios from 'axios'
import history from '../history'


/****** ACTION TYPES ******/

const GET_BTC = 'GET_BTC'


/****** ACTION CREATORS ******/

const getCoinbaseBtc = coinbaseBTC => ({ type: GET_BTC, coinbaseBTC })


/****** THUNK CREATORS ******/

export const getCoinbaseBtcPrice = () =>
  dispatch =>
    axios.get('/api/coinbase/btc-usd')
      .then(res =>
        dispatch(getCoinbaseBtc(res.data)))
      .catch(err => console.log(err))


/****** REDUCER ******/

export default function (coinbaseBTC = {}, action) {
  switch (action.type) {
    case GET_BTC:
      return action.coinbaseBTC
    default:
      return coinbaseBTC
  }
}
