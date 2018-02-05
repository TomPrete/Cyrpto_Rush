import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Router } from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import { Main, Login, Signup, UserHome, Home } from './components'
import store, { me, getCoinbaseBtcPrice, getCoinbaseEthPrice, getKrakenBtcPrice, getKrakenEthPrice, addReturnsFromTrade  } from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    console.log('mounted')
    function refreshCoinbaseData() {
      const coinbaseBTCThunk = getCoinbaseBtcPrice()
      const coinbaseETHThunk = getCoinbaseEthPrice()
      store.dispatch(coinbaseBTCThunk)
      store.dispatch(coinbaseETHThunk)
      setTimeout(refreshCoinbaseData, 30000)
    }
    function refreshKrakenData() {
      const krakentBTCThunk = getKrakenBtcPrice()
      const kreakenETHThunk = getKrakenEthPrice()
      store.dispatch(krakentBTCThunk)
      store.dispatch(kreakenETHThunk)
      setTimeout(refreshKrakenData, 10000);
    }
    refreshCoinbaseData()
    refreshKrakenData(); // execute function
  }

  render() {
    const { isLoggedIn } = this.props

    return (
      <Router history={history}>
        <Main>
          <Switch>

            <Route
              component={Home}
              exact
              path="/"
            />


            {/* Routes placed here are available to all visitors */}
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            {
              isLoggedIn &&
              <Switch>
                {/* Routes placed here are only available after logging in */}
                <Route path="/" component={UserHome} />
              </Switch>
            }
            {/* Displays our Login component as a fallback */}
            <Route component={Login} />
          </Switch>
        </Main>
      </Router>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
