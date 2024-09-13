export function createReducer(initialState, reducers) {
  return function(state = initialState, action) {
  	console.log(reducers)
    let reducer = reducers[action.type]
    
    if (reducer) {
      return reducer(state, action)
    }
    return state 
  }
}