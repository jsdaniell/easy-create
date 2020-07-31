const initialState = {
  listProcedures: [
    {
      id: "list-0",
      content: ``,
      sublist: []
    }
  ]
};

export default function useCaseReducer(state = initialState, action) {
  if (action.type === "SET_TEST_CASE_MODAL_REDUCER") {
    return action.payload;
  } else {
    return state;
  }
}
