import * as constants from './constants';


const defaultState = {
  wangEditValue:''
}

export default (state = defaultState, action) => {
  const {type} = action;
  let newState = JSON.parse(JSON.stringify(state));
  switch(type) {
      case constants.SET_WANGEDIT:
        newState.wangEditValue = action.value;
        break;
    default:
      return state;
  }

  return newState;
}