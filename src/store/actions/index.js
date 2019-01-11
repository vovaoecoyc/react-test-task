import * as actionTypes from './actionTypes'
import constants from '../../constants'

const getSmallData = dispatch => {
  fetch(constants.smallDataUrl)
    .then(response => {
      return response.json()
    })
    .then(data => {
      console.log(data)
      const pageCount = data.length > constants.pageSize ? Math.ceil(data.length / constants.pageSize) : 1
      const pageData = []
      const limitRecords = data.length > constants.pageSize ? constants.pageSize : data.length
      for (let i = 0; i < limitRecords; ++i) {
        pageData.push(data[i])
      }
      dispatch({ type: actionTypes.LOAD_SMALL_DATA, payload: { allData: data, data: pageData, pageCount: pageCount } })
    })
    .catch(error => {
      console.log(error)
    })
}

const getBigData = dispatch => {
  fetch(constants.bigDataUrl)
    .then(response => {
      return response.json()
    })
    .then(data => {
      console.log(data)
      const pageCount = data.length > constants.pageSize ? Math.ceil(data.length / constants.pageSize) : 1
      const pageData = []
      const limitRecords = data.length > constants.pageSize ? constants.pageSize : data.length
      for (let i = 0; i < limitRecords; ++i) {
        pageData.push(data[i])
      }
      dispatch({ type: actionTypes.LOAD_BIG_DATA, payload: { allData: data, data: pageData, pageCount: pageCount } })
    })
    .catch(error => {
      console.log(error)
    })
}

export const loadSmallData = () => dispatch => {
  getSmallData(dispatch)
}

export const loadBigData = () => dispatch => {
  getBigData(dispatch)
}

export const startAction = () => {
  return { type: actionTypes.START_ACTION }
}

export const finishAction = () => {
  return { type: actionTypes.FINISH_ACTION }
}

export const sortData = (sortDirection, data, fieldSort, isFiltredData = false) => {
  const sortedData = data.sort((a, b) => {
    if (+a[fieldSort] && +b[fieldSort]) {
      if (sortDirection === 'asc') {
        if (+a[fieldSort] < +b[fieldSort]) {
          return -1
        }
        if (+a[fieldSort] > +b[fieldSort]) {
          return 1
        }
      } else {
        if (+a[fieldSort] < +b[fieldSort]) {
          return 1
        }
        if (+a[fieldSort] > +b[fieldSort]) {
          return -1
        }
      }
    } else {
      if (sortDirection === 'asc') {
        if (a[fieldSort] < b[fieldSort]) {
          return -1
        }
        if (a[fieldSort] > b[fieldSort]) {
          return 1
        }
      } else {
        if (a[fieldSort] < b[fieldSort]) {
          return 1
        }
        if (a[fieldSort] > b[fieldSort]) {
          return -1
        }
      }
    }
  })
  const direction = sortDirection !== null ? (sortDirection === 'asc' ? 'desc' : 'asc') : 'asc'
  const sorted = {
    isSorted: true,
    sortDirection: direction,
    fieldSort: fieldSort
  }
  const payload = isFiltredData
    ? {
        filtredData: sortedData,
        sorted: sorted
      }
    : {
        data: sortedData,
        sorted: sorted
      }
  return { type: actionTypes.SORT_DATA, payload: payload }
}

export const getSubInformation = (id, data) => {
  const dataSubInformation = data.filter(value => {
    return value.id === id
  })
  const subInformation = { dataSubInformation: dataSubInformation[0], showSubInformation: true }
  return {
    type: actionTypes.GET_SUB_INFORMATION,
    payload: { subInformation: subInformation }
  }
}

export const getFilterData = (filterString, data) => {
  const filtredData = data.filter(value => {
    let matches = []
    for (let i in value) {
      if (
        i !== 'description' &&
        String(value[i])
          .toLowerCase()
          .indexOf(filterString.toLowerCase()) !== -1
      ) {
        matches.push(value[i])
      }
    }

    if (matches.length > 0) {
      return true
    }
    return false
  })
  return { type: actionTypes.FILTERED_DATA, payload: { filtredData: filtredData } }
}

export const clearFilteredData = () => {
  return { type: actionTypes.CLEAR_FILTERED_DATA, payload: { filtredData: null } }
}

export const clearSubInformation = () => {
  return {
    type: actionTypes.CLEAR_SUB_INFORMATION,
    payload: { subInformation: { showSubInformation: false, dataSubInformation: null } }
  }
}

export const getDataPage = (pageNumber, allData) => {
  const offset = constants.pageSize * (pageNumber - 1)
  let data = []
  // if (allData.length <= constants.pageSize) {
  //   data = allData
  // } else {
  for (let i = offset; i < offset + constants.pageSize; ++i) {
    data.push(allData[i])
  }
  // }
  return { type: actionTypes.GET_DATA_PAGE, payload: { data: data } }
}
