import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'reactstrap'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import './App.css'

import 'bootstrap/dist/css/bootstrap.css'
import MainTable from './containers/MainTable'
import ModalDataSelect from './containers/ModalDataSelect'
import { loadSmallData, loadBigData } from './store/actions'
import Spinner from './components/Spinner'
import SubInfo from './containers/SubInfo'
import Filter from './containers/Filter'

class App extends Component {
  state = {
    firstLoad: true
  }
  selectDataCallback = selectData => {
    const { loadSmallData, loadBigData } = this.props
    selectData === 0 ? loadSmallData() : loadBigData()
    this.setState((prevState, curProps) => ({
      firstLoad: !prevState.firstLoad
    }))
  }
  render() {
    let { data, filtredData } = this.props
    let newData = data !== null ? data.map(value => value) : null
    newData = newData !== null ? newData.filter(value => (value ? true : false)) : newData
    if (filtredData !== null) {
      newData.length = 0
      newData = filtredData.map(value => value)
    }
    const content = this.state.firstLoad ? (
      <ModalDataSelect showModal={this.state.firstLoad} selectDataCallback={this.selectDataCallback} />
    ) : newData ? (
      <Container>
        <Row className="justify-content-around">
          <Col md={6}>
            <h3 className="text-center mt-3 mb-3">React table app</h3>
          </Col>
          <Col className="m-auto" md={4}>
            <Filter />
          </Col>
        </Row>
        <Switch>
          <Route path="/page/:pageID" render={props => <MainTable {...props} data={newData} />} />
          <Redirect to="/page/1" />
        </Switch>
        {this.props.showSubInformation ? <SubInfo /> : ''}
      </Container>
    ) : (
      <Spinner />
    )
    return content
  }
}

const mapDispatchToProps = dispatch => ({
  loadSmallData: () => {
    dispatch(loadSmallData())
  },
  loadBigData: () => {
    dispatch(loadBigData())
  }
})

const mapStateToProps = state => ({
  data: state.data,
  filtredData: state.filtredData,
  showSubInformation: state.subInformation.showSubInformation
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
)
