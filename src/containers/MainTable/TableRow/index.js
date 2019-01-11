import React from 'react'
import { connect } from 'react-redux'

import TableColumn from '../TableColumn'
import helpers from '../../../helpers'
import { getSubInformation } from '../../../store/actions'
import styled from './Row.module.css'

const TableRow = ({ rowData, subInformation, setActiveRow, active, data }) => {
  rowData = helpers.objectToArray(rowData)
  const handlerClick = () => {
    data = data.filter(value => (value ? true : false))
    subInformation(rowData[0], data)
    setActiveRow(rowData[0])
  }
  return (
    <tr
      className={active ? `${styled.cursorStyle} ${styled.activeRow}` : `${styled.cursorStyle}`}
      onClick={handlerClick}
    >
      {rowData.map((value, index) => (
        <TableColumn key={value + Math.random() * 100} columnData={value} />
      ))}
    </tr>
  )
}

const mapStateToProps = state => ({
  data: state.data
})

const mapDispatchToProps = dispatch => ({
  subInformation: (id, data) => {
    dispatch(getSubInformation(id, data))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableRow)
