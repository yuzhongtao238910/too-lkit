import { executeReducerBuilderCallback } from "./mapBuilder.js"
import {produce} from "immer"
// freezeDraftable
// isDraft
// isDraftable
// createNextState
// function freezeDraftable(val) {
//   return isDraftable(val) ? createNextState(val, () => {}) : val
// }
export function createReducer(
  initialState,
  mapOrBuilderCallback
) {

  let [actionsMap, finalActionMatchers, finalDefaultCaseReducer] =
    executeReducerBuilderCallback(mapOrBuilderCallback)

  // Ensure the initial state gets frozen either way (if draftable)
  let getInitialState
  // if (isStateFunction(initialState)) {
  //   getInitialState = () => freezeDraftable(initialState())
  // } else {
  //   const frozenInitialState = freezeDraftable(initialState)
    
  // }
  getInitialState = () => initialState
  function reducer(state = getInitialState(), action){
    let caseReducers = [
      actionsMap[action.type]
    ]
    // console.log(actionsMap, action, caseReducers)
    // debugger

    return caseReducers.reduce((previousState, caseReducer) => {
      if (caseReducer) {
        // return produce(previousState, (draft) => {
        //   return caseReducer(draft, action)
        // })
        return caseReducer(previousState, action)
      }

      return previousState
    }, state)
  }

  reducer.getInitialState = getInitialState

  return reducer
}