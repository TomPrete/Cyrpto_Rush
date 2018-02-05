

   export var ethPriceCB = () => {
      if (this.props && this.props.coinbaseETH && ethereumCB) {
        return Number(ethereumCB.amount).toFixed(2)
      } else {
        return 0
      }
    }

    export var btcPriceCB = () => {
      if (this.props && this.props.coinbaseBTC && bitcoinCB) {
        return Number(bitcoinCB.amount).toFixed(2)
      } else {
        return 'DONT BE STUPID..STUPID!'
      }
    }

    export var btcPriceKR = () => {
      if (this.props && this.props.krakenBTC && bitcoinKR && bitcoinKR.XXBTZUSD) {
        return Number(bitcoinKR.XXBTZUSD.a[0]).toFixed(2)
      } else {
        return 'DONT BE STUPID...STUPID!'
      }
    }

    export var ethPriceKR = () => {
      if (this.props && this.props.krakenETH && etherKR && etherKR.XETHZUSD) {
        return Number(etherKR.XETHZUSD.a[0]).toFixed(2)
      } else {
        return 'DONT BE STUPID...STUPID!'
      }
    }

    export const ethBtcCB = (ethPriceCB() / btcPriceCB()).toFixed(8)
    export const ethBtcKR = (ethPriceKR() / btcPriceKR()).toFixed(8)

    exportconst returnDec = () => {
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
