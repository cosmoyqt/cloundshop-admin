import * as constants from './constants';
// import axios from '@/utils/api'

const setWangEdit = (value) => ({
  type: constants.SET_WANGEDIT,
  value
});
export const setWangEditValue = (value) => {
  return (dispatch) => {
      dispatch(setWangEdit(value))
  }
}