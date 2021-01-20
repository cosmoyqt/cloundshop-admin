import { combineReducers } from 'redux';
import categoryReducer from '../pages/category/store/reducer'; // 引用组件中的子reducer
import productsReducer from '../pages/products/store/reducer'; // 引用组件中的子reducer


const reducer = combineReducers({
  category:categoryReducer,
  products:productsReducer,
})
export default reducer;