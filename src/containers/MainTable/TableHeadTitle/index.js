import React from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleUp, faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons'

import styles from './HeadTitle.module.css'
import { sortData } from '../../../store/actions'

class TableHeadTitle extends React.Component {
  constructor(props) {
    super(props)
    const { title } = this.props
    this.state = {
      fieldName: title
    }
  }
  handlerClick = () => {
    let { data, filtredData } = this.props
    let newData = data.map(value => value)
    let isFiltredData = false
    if (filtredData !== null) {
      isFiltredData = true
      newData.length = 0
      newData = filtredData.map(value => value)
    }
    const sortDirection = this.props.sorted ? this.props.sorted.sortDirection : 'asc'
    this.props.sortData(sortDirection, newData, this.state.fieldName, isFiltredData)
  }
  render() {
    let sortIcon = ''
    if (this.props.sorted !== null) {
      sortIcon =
        this.state.fieldName === this.props.sorted.fieldSort ? (
          this.props.sorted.sortDirection === 'asc' ? (
            <FontAwesomeIcon icon={faAngleDoubleDown} />
          ) : (
            <FontAwesomeIcon icon={faAngleDoubleUp} />
          )
        ) : (
          ''
        )
    }
    return (
      <th className={`${styles.cursorStyle}`} onClick={this.handlerClick}>
        <div className="row justify-content-center">
          <div className="d-flex">{this.props.children}</div>
          <div className="d-flex align-items-center ml-2">{sortIcon}</div>
        </div>
      </th>
    )
  }
}

const mapStateToProps = state => ({
  data: state.data,
  filtredData: state.filtredData,
  sorted: state.sorted
})

const mapDispatchToProps = dispatch => ({
  sortData: (sortDirection, data, fieldSort, isFiltredData) => {
    dispatch(sortData(sortDirection, data, fieldSort, isFiltredData))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableHeadTitle)
