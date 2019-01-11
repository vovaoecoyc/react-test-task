import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Input, Button } from 'reactstrap'

import { getFilterData, clearFilteredData } from '../../store/actions'

class Filter extends React.Component {
  state = {
    filterValue: ''
  }
  handlerClick = () => {
    let { data, filtredData, getFilterData } = this.props
    if (this.state.filterValue === '') {
      this.props.clearFilteredData()
    } else {
      let newData = data.map(value => value)
      if (filtredData !== null) {
        newData.length = 0
        newData = filtredData.map(value => value)
      }
      getFilterData(this.state.filterValue, newData)
    }
  }
  handlerChange = e => {
    let value = e.target.value
    this.setState((prevState, curProps) => ({
      filterValue: value
    }))
  }
  render() {
    return (
      <Row>
        <Col md={8}>
          <Input onChange={this.handlerChange} type="text" />
        </Col>
        <Col md={4}>
          <Button onClick={this.handlerClick} color="primary">
            Найти
          </Button>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = state => ({
  data: state.data,
  filtredData: state.filtredData
})

const mapDispatchToProps = dispatch => ({
  getFilterData: (filterString, data) => {
    dispatch(getFilterData(filterString, data))
  },
  clearFilteredData: () => {
    dispatch(clearFilteredData())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter)
