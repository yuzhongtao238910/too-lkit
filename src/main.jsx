// import React from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'

// const root = createRoot(document.getElementById('root'))

// root.render(
//   <App />
// )
// 内置了thunk
// import { configureStore, createAction, createReducer, createSlice } from "@reduxjs/toolkit"
import { configureStore, createAction, createReducer, createSlice } from "./toolkit"
// import { createReducer } from "./createReducer"
// import { createStore } from "redux"
import {thunk} from "redux-thunk"
import logger from "redux-logger"

const ADD = "ADD"
const MINUS = "MINUS"
// function add() {
//   return {
//     type: ADD
//   }
// }
// function minus() {
//   return {
//     type: MINUS
//   }
// }

const add = createAction("ADD")
// console.dir(add)
const minus = createAction("MINUS", (amount) => {
  // 这个函数其实就是预处理对象，
  return {
    payload: amount * 10
  }
})

// function reducer(state = {number: 0}, action) {
//   switch (action.type) {
//     case ADD:
//       return {
//         number: state.number + 1
//       }
//     case MINUS:
//       return {
//         number: state.number - action.payload || 1
//       }
//     default:
//       return state
//   }
// }
// debugger
const counterSlice = createSlice({
  name: "counter", // 类似于namespace
  initialState: {number: 0},
  reducers: {
    add: (state, action) => ({number: state.number + 1}),
    minus: (state, action) => ({number: state.number - 1})
  }
})
const numSlice = createSlice({
  name: "number", // 类似于namespace
  initialState: {num: 0},
  reducers: {
    add: (state, action) => ({num: state.num + 1}),
    minus: (state, action) => ({num: state.num - 1})
  }
})

const { actions: counterActions, reducer: reducerCounter} = counterSlice
const { actions: numActions, reducer: reducerNum} = numSlice
// console.log(actions)

// const reducer = createReducer({number: 0}, (builder) => {
//   builder
//     .addCase(add.type, (state, action) => {
//       // state.number += 1
//       return {
//         number: state.number + 1
//       }
//     })
//     .addCase(minus.type, (state, action) => {
//       return {
//         number: state.number - 1
//       }
//     })
// })

// const reducer = createReducer({number: 0}, {
//   [add.type]: (state, action) => ({number: state.number + 1}),
//   [minus.type]: (state, action) => ({number: state.number - 1})
// })



const store = configureStore({
  reducer: {
    reducerCounter,
    reducerNum
  },
  // 中间件
  // middleware: (getDefaultMiddleware) => {
    
  //   setTimeout(() => {
  //     console.log(getDefaultMiddleware())
  //   }, 1000)
  //   return getDefaultMiddleware().concat([logger, thunk])
  // },
  // 初始值
  // preloadedState: {number: 11}
})
// const store = createStore(reducer)
const val = document.getElementById("value")
const addBtn = document.getElementById("add")
const minusBtn = document.getElementById("minus")
const asyncAddBtn = document.getElementById("async-add")

function render() {
  console.log(store.getState())
  val.innerHTML = `${store.getState().reducerCounter.number} - ${store.getState().reducerNum.num}`
}
render()

store.subscribe(render)
addBtn.onclick = () => {
  store.dispatch(counterActions.add())
}
minusBtn.onclick = () => {
  // debugger
  store.dispatch(counterActions.minus(3))
}
// toolkit内置了thunk
asyncAddBtn.onclick = () => {
  store.dispatch(function(dispatch, getState) {
    setTimeout(() => {
      dispatch(counterActions.add())
    }, 1000)
  })
}


add1.onclick = () => {
  store.dispatch(numActions.add())
}
minus1.onclick = () => {
  store.dispatch(numActions.minus())
}

function MyObject(name, age) {
  this.name = name
  this.age = age
}  
const myObject = new MyObject("apple", 11);  
for (let key in myObject) {
  // console.log(key)
}
// console.log(myObject, typeof myObject)