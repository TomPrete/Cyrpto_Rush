import axios from 'axios'
import history from '../history'


/****** ACTION TYPES ******/

const GET_KRAKEN_BTC = 'GET_KRAKEN_BTC'


/****** ACTION CREATORS ******/

const getKrakenBtc = krakenBTC => ({ type: GET_KRAKEN_BTC, krakenBTC })


/****** THUNK CREATORS ******/

export const getKrakenBtcPrice = () =>
  dispatch =>
    axios.get('/api/kraken/btc-usd')
      .then(res =>
        dispatch(getKrakenBtc(res.data)))
      .catch(err => console.log(err))


/****** REDUCER ******/

export default function (krakenBTC = {}, action) {
  switch (action.type) {
    case GET_KRAKEN_BTC:
      return action.krakenBTC
    default:
      return krakenBTC
  }
}
