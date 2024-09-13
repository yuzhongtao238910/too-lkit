import { createAction } from "./createAction.jsx"
import { createReducer} from "./createReducer.jsx"
export function createSlice(options) {
  const {name, initialState, reducers} = options
  let actions = {}
  const prefixReducers = {}
  /*
    name 区分不同的分片
  */
  // [add, minus]
  Object.keys(reducers).forEach(key => {
    let type = getType(name, key)
    actions[key] = createAction(type) // actionCreator // counter/add
    prefixReducers[type] = reducers[key]
  })
  let reducer = createReducer(initialState, prefixReducers)
  return {
    actions,
    reducer
  }
}
function getType(slice, actionKey) {
  return slice + "/" + actionKey
}