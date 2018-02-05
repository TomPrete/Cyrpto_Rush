import axios from 'axios'
import history from '../history'


 /****** ACTION TYPES ******/

const GET_ETH = 'GET_ETH'


/****** ACTION CREATORS ******/

const getCoinbaseEth = coinbaseETH => ({type: GET_ETH, coinbaseETH})


/****** THUNK CREATORS ******/

export const getCoinbaseEthPrice = () =>
  dispatch =>
    axios.get('/api/coinbase/eth-usd')
      .then(res =>
        dispatch(getCoinbaseEth(res.data)))
      .catch(err => console.log(err))


/****** REDUCER ******/

export default function (coinbaseETH = {}, action) {
  switch (action.type) {
    case GET_ETH:
      return action.coinbaseETH
    default:
      return coinbaseETH
  }
}
