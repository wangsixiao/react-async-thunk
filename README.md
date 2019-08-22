
本项目使用react-scripts启动项目，使用redux-thunk实现异步获取数据。

clone项目后，启动命令

```
npm install
npm run start
```

功能比较简单：初始状态state:{}，state: loading: true,name: ''
loading为true时，页面使用蒙层，使用setTimeout延迟数据的获取模拟异步，3秒后蒙层消失，显示name值

触发dispatch，获取异步数据
```js
componentDidMount() {
    const { dispatch } = this.props
    // 触发action
    dispatch(fetchPosts('asd'))
  }
```
action.js

> 默认情况下，store.dispatch只能是对象，使用redux-thunk修改dispatch接受函数作为参数

获取数据之前，dispatch FETCH_START，设置loading为true，显示蒙层
获取到数据后，dispatch FETCH_END，设置loading为false，蒙层消失，并且传值，显示传递的name值
```js
export const fetchPosts = (value) => {
  return dispatch => {
    dispatch({ type: 'FETCH_START'})
    return setTimeout(() => {
      dispatch({ type: 'FETCH_END', value })
    },3000)
  }
}

```
store.js
```js
// 获取异步数据之前操作
const startHandle = (state, action) => {
  return {...state, loading: true}
}
// 数据获取后操作
const endHandle = (state, action) => {
  return {...state,loading: false, name: action.value}
}

// action creator
export const reducers = (state={}, action) => {
  switch (action.type){
    case 'FETCH_START':
      return startHandle(state, action)
    case 'FETCH_END':
      return endHandle(state, action)
    default: 
      return state
  }
}
```


