import { createStore, applyMiddleware, combineReducers, compose } from "redux"
import {thunk} from "redux-thunk"

// let obj = {} let obj = new Object() 这两种模式的是纯的对象
function isPlainObject(value) {
  if (typeof value !== 'object' || value === null) {
    return false
  }
  // let obj = new Object() let obj = {}
  return Object.getPrototypeOf(value) === Object.prototype
}
export function configureStore(options = {}) {
  // preloadedState 初始值
  let { reducer, middleware = [thunk], preloadedState } = options
  let rootReducer;
  if (typeof reducer === 'function') {
    rootReducer = reducer
  } else {
    rootReducer = combineReducers(reducer)
  }

  // 这个分支后面讲
  // else if (isPlainObject(reducer)) {
  //   rootReducer = combineReducers(reducer)
  // }
  // debugger
  // const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  // return createStore(rootReducer, preloadedState, composeEnhancers(applyMiddleware(...middleware)))
  // const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  return createStore(rootReducer, preloadedState, applyMiddleware(...middleware))
}