import axios from 'axios'
import history from '../history'


/****** ACTION TYPES ******/

const GET_KRAKEN_ETH = 'GET_KRAKEN_ETH'


/****** ACTION CREATORS ******/

const getKrakenEth = krakenETH => ({ type: GET_KRAKEN_ETH, krakenETH })


/****** THUNK CREATORS ******/

export const getKrakenEthPrice = () =>
  dispatch =>
    axios.get('/api/kraken/eth-usd')
      .then(res =>
        dispatch(getKrakenEth(res.data)))
      .catch(err => console.log(err))


/****** REDUCER ******/

export default function (krakenETH = {}, action) {
  switch (action.type) {
    case GET_KRAKEN_ETH:
      return action.krakenETH
    default:
      return krakenETH
  }
}
