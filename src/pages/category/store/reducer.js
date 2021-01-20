import * as constants from './constants';


const defaultState = {
  categoryList:[],
  SecondaryCategoryList:[]
}

export default (state = defaultState, action) => {
  const {type} = action;
  let newState = JSON.parse(JSON.stringify(state));

  switch(type) {
    case constants.GET_CATEGORY:
      newState.categoryList = action.list;
      break;
    case constants.GET_SECONDARY_CATEGORY:
      newState.SecondaryCategoryList = action.list;
      break;
    default:
      return state;
  }

  return newState;
}