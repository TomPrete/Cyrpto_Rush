import React, { Component } from 'react'
import { connect } from 'react-redux'
import store, { getCoinbaseBtcPrice } from '../store'
import { Line } from 'react-chartjs-2'



/*** COMPONENT ***/
export default class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = { data: this.getData() };
  }

  componentDidMount() {
    this.setStateInterval = window.setInterval(() => {
      this.setState({ data: this.getData() });
    }, 3000);
  }

  componentWillUnmount() {
    window.clearInterval(this.setStateInterval);
  }

  getData() {
    const dataInput = this.props.returns
    const labels = []
    for (var i = 1; i <= dataInput.length; i++) {
      labels.push(i)
    }
    const chartData = {labels: labels, datasets: [{label: '% per trade', data: dataInput, backgroundColor: [
      'rgb(66, 196, 141)']}]}
    return chartData
  }


  render() {

    console.log("PROPS: ", this.props.returns)
    console.log("STATE: ", this.state.data)

    return (
      <div className='chart'>
      <Line
          data={this.state.data}
          options={{
            title:{
              display: 'Arbitrage',
              text: 'Percentage return per trade',
              fontSize: 25
            },
            // legend:{
            //   display: this.props.displayLegend,
            //   position: this.props.legendPosition
            // }
          }}
        />
        <canvas id="line-chart" width="800" height="450" />
      </div>
    );
  }
}



/**
 * CONTAINER
 */
// const mapState = (state) => {
//   return {
//     coinbaseBTC: state.btc,
//     coinbaseETH: state.eth,
//     krakenBTC: state.krakenBTC,
//     krakenETH: state.krakenETH

//   }
// }

// const mapDispatch = { getCoinbaseBtcPrice }

// export default connect(mapState, mapDispatch)(Graph)

/**
 * PROP TYPES
 */
