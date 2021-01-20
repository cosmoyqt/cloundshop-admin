import React, { useState, useEffect } from 'react';
import E from 'wangeditor'
import { setWangEditValue } from '@/pages/products/store/actionCreators'
import { useSelector, useDispatch } from 'react-redux'

let editor = null
function Wangeditor(props) {
  const dispatch = useDispatch();
  const [count,setCount] = useState(1);
  const wangeditValue = useSelector(state =>state.products.wangEditValue);
  if(!!wangeditValue && count === 1){
    editor.txt.html(wangeditValue);
    setCount(2);
  }
  useEffect(() => {
    // 注：class写法需要在componentDidMount 创建编辑器
    editor = new E("#div1")
    editor.config.onchange = (newHtml) => {
      dispatch(setWangEditValue(newHtml))
    }
    /**一定要创建 */
    editor.create()
    return () => {
      // 组件销毁时销毁编辑器  注：class写法需要在componentWillUnmount中调用
      editor.destroy()
    }
  }, [])

  return (
    <div>
      <div id="div1"></div>
    </div>
  );
}

export default Wangeditor;