import * as actionTypes from '../actions/actionTypes'
// import { loadBigData } from '../actions'

const initialState = {
  allData: null,
  data: null,
  sorted: null,
  subInformation: {
    showSubInformation: false,
    dataSubInformation: null
  },
  filtredData: null,
  pageCount: 1
}

const loadData = (state, action) => {
  return { ...state, ...action.payload }
}

const sortData = (state, action) => {
  // const newData = action.payload.data.map(value => value)
  // return { ...state, data: newData, sorted: action.payload.sorted }
  return { ...state, ...action.payload }
}

const getSubInformation = (state, action) => {
  return { ...state, ...action.payload }
}

const getFilterData = (state, action) => {
  return { ...state, ...action.payload }
}

const clearFilteredData = (state, action) => {
  return { ...state, ...action.payload, sorted: null }
}

const getDataNewPage = (state, action) => {
  return { ...state, ...action.payload }
}

const clearSubInformation = (state, action) => {
  return { ...state, ...action.payload }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_SMALL_DATA:
      return loadData(state, action)
    case actionTypes.LOAD_BIG_DATA:
      return loadData(state, action)
    case actionTypes.SORT_DATA:
      return sortData(state, action)
    case actionTypes.GET_SUB_INFORMATION:
      return getSubInformation(state, action)
    case actionTypes.FILTERED_DATA:
      return getFilterData(state, action)
    case actionTypes.CLEAR_FILTERED_DATA:
      return clearFilteredData(state, action)
    case actionTypes.GET_DATA_PAGE:
      return getDataNewPage(state, action)
    case actionTypes.CLEAR_SUB_INFORMATION:
      return clearSubInformation(state, action)
    default:
      return state
  }
}

export default reducer
