const initialState = [];

export default function useCaseListDocsReducer(state = initialState, action) {
  if (action.type === "SET_USE_CASE_LIST_DOCS") {
    return action.payload;
  } else {
    return state;
  }
}
