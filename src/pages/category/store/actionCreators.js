import * as constants from './constants';
import axios from '@/utils/api'
const getFirstCategory = (list) => ({
  type: constants.GET_CATEGORY,
  list,
});
const getSecondaryCategory = (list) => ({
  type: constants.GET_SECONDARY_CATEGORY,
  list
});
export const getCategoryList = () => {
  return (dispatch) => {
    axios.category.getCategoryList().then(res => {
      dispatch(getFirstCategory(res.data))
  })
  }
}
export const getSecondaryCateList = () => {
  return (dispatch) => {
    axios.category.getSecondaryList().then(res => {
      dispatch(getSecondaryCategory(res.data))
  })
  }
}