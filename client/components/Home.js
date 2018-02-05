import React, { Component } from 'react'
import { connect } from 'react-redux'
import store, { addReturnsFromTrade } from '../store'
import Graph from './graph'

/**** COMPONENT ****/

export class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dollar: [],
      returns: [],
      trade: 0
    }
    this.submit = this.submit.bind(this)
  }

  submit(evt) {
    evt.preventDefault()
    var newArr = this.state.returns.slice();
    newArr.push(evt.target.value)
    this.setState({
      trade: evt.target.value,
      returns: newArr
    })
    this.props.addReturnsFromTrade(this.state.trade)
  }

  render() {

    const bitcoinCB = this.props.coinbaseBTC.data
    const ethereumCB = this.props.coinbaseETH.data
    const bitcoinKR = this.props.krakenBTC.result
    const etherKR = this.props.krakenETH.result

    var ethPriceCB = () => {
      if (this.props && this.props.coinbaseETH && ethereumCB) {
        return Number(ethereumCB.amount).toFixed(2)
      } else {
        return 0
      }
    }

    var btcPriceCB = () => {
      if (this.props && this.props.coinbaseBTC && bitcoinCB) {
        return Number(bitcoinCB.amount).toFixed(2)
      } else {
        return 'DONT BE STUPID..STUPID!'
      }
    }

    var btcPriceKR = () => {
      if (this.props && this.props.krakenBTC && bitcoinKR && bitcoinKR.XXBTZUSD) {
        return Number(bitcoinKR.XXBTZUSD.a[0]).toFixed(2)
      } else {
        return 'DONT BE STUPID...STUPID!'
      }
    }

    var ethPriceKR = () => {
      if (this.props && this.props.krakenETH && etherKR && etherKR.XETHZUSD) {
        return Number(etherKR.XETHZUSD.a[0]).toFixed(2)
      } else {
        return 'DONT BE STUPID...STUPID!'
      }
    }

    const ethBtcCB = (ethPriceCB() / btcPriceCB()).toFixed(8)
    const ethBtcKR = (ethPriceKR() / btcPriceKR()).toFixed(8)

    const returnDec = () => {
      if (ethBtcKR && ethBtcCB > ethBtcKR) {
        return (((ethBtcCB / ethBtcKR) * ethPriceCB()) / ethPriceCB() - 1 ) * 100
       }
       else {
         return (((ethBtcKR / ethBtcCB) * ethPriceKR()) / ethPriceKR() - 1) * 100
    }
  }
  const dollarReturn = () => {
    if (ethBtcKR && ethBtcCB > ethBtcKR) {
      return ((ethBtcCB - ethBtcKR) * btcPriceKR())
    } else {
      return ((ethBtcKR - ethBtcCB) * btcPriceCB())
    }
  }

  const dollarReturnTrade = dollarReturn().toFixed(2)
  const returnPercentageTrade = returnDec().toFixed(2)

    return (
      <div>
        <div className="ui grid" id="grid">
          <div className="center six wide column card" id="coinbase" >
            <img src="coinbase-white.png" id="coinbase"/>
            <p> Bitcoin Price: ${btcPriceCB()} </p>
            <p> Ether Price: ${ethPriceCB()} </p>
            <p className="base">{ethBtcCB} BTC / ETH</p>
          </div>
          <div className="two wide column">
            <div className="ui vertical divider">
              &
          </div>
          </div>
          <div className="center six wide column card" id="krakencard">
          <img src="kraken_img.png" id="kraken" />
            <p>Bitcoin Price: ${btcPriceKR()}</p>
            <p>Ether Price: ${ethPriceKR()}</p>
            <p className="base">{ethBtcKR} BTC / ETH</p>
          </div>
        </div>
        <div id="trade-button">
        <button onClick={this.submit} form="trade-submit" value={returnPercentageTrade} className="red massive fluid ui button" disabled={dollarReturnTrade < 1 }>Execute Trade</button>
        </div>
        <div className="dollar-display">
         <h2>${
          dollarReturnTrade
         }    or    {
          returnPercentageTrade
         }%
         </h2>

        </div>
        <Graph returns={this.state.returns} />
      </div>

    )
  }
}


/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    coinbaseBTC: state.btc,
    coinbaseETH: state.eth,
    krakenBTC: state.krakenBTC,
    krakenETH: state.krakenETH

  }
}

const mapDispatch = { addReturnsFromTrade }

export default connect(mapState, mapDispatch)(Home)

