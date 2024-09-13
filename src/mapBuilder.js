export function executeReducerBuilderCallback(
  builderCallback
){
  const actionsMap = {}
  const actionMatchers = []
  let defaultCaseReducer = undefined
  const builder = {
    addCase(
      typeOrActionCreator,
      reducer
    ) {
      const type =
        typeof typeOrActionCreator === 'string'
          ? typeOrActionCreator
          : typeOrActionCreator.type

      actionsMap[type] = reducer
      return builder
    }
  }
  builderCallback(builder)
  return [actionsMap]
}