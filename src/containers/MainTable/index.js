import React from 'react'
import { Container, Table, Alert } from 'reactstrap'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import TableHeadTitle from './TableHeadTitle'
import TableRow from './TableRow'
import { getDataPage, clearFilteredData, clearSubInformation } from '../../store/actions'
import { PaginationWithRoute } from './Pagination'

class MainTable extends React.Component {
  state = {
    idActiveRow: '',
    currentPageNumber: this.props.match.params.pageID
  }
  setActiveRow(id) {
    this.setState({
      idActiveRow: id
    })
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (+nextProps.match.params.pageID !== +prevState.currentPageNumber) {
      // меняем данные для новой страницы в зависимости от url
      nextProps.getDataForNewPage(nextProps.match.params.pageID, nextProps.allData)
      nextProps.clearFilteredData()
      nextProps.clearSubInformation()
      return { currentPageNumber: nextProps.match.params.pageID }
    }
    return null
  }
  componentDidMount() {
    const {
      getDataForNewPage,
      allData,
      match: {
        params: { pageID }
      }
    } = this.props
    if (!pageID) {
      getDataForNewPage(1, allData)
    } else {
      getDataForNewPage(pageID, allData)
    }
  }
  render() {
    let { data, pageCount } = this.props
    data = data.filter(value => (value ? true : false))
    const content =
      data.length > 0 ? (
        <Container>
          <Table>
            <thead>
              <tr>
                <TableHeadTitle title="id">id</TableHeadTitle>
                <TableHeadTitle title="firstName">firstName</TableHeadTitle>
                <TableHeadTitle title="lastName">lastName</TableHeadTitle>
                <TableHeadTitle title="email">email</TableHeadTitle>
                <TableHeadTitle title="phone">phone</TableHeadTitle>
              </tr>
            </thead>
            <tbody>
              {data.map(value => {
                const active = +value.id === +this.state.idActiveRow ? true : false
                return (
                  <TableRow
                    key={value.firstName + value.lastName}
                    setActiveRow={this.setActiveRow.bind(this)}
                    active={active}
                    rowData={value}
                  />
                )
              })}
            </tbody>
          </Table>
          {pageCount > 1 ? <PaginationWithRoute data={data} pageCount={pageCount} /> : ''}
        </Container>
      ) : (
        <Alert color="danger">Данные по вашему запросу не найдены</Alert>
      )
    return content
  }
}

const mapStateToProps = state => ({
  pageCount: state.pageCount,
  allData: state.allData
})

const mapDispatchToProps = dispatch => ({
  getDataForNewPage: (pageNumber, allData) => {
    dispatch(getDataPage(pageNumber, allData))
  },
  clearFilteredData: () => {
    dispatch(clearFilteredData())
  },
  clearSubInformation: () => {
    dispatch(clearSubInformation())
  }
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MainTable)
)
