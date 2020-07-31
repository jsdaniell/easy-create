const initialState = {
  title: "",
  actor: "",
  id: "",
  scenario:'',

  listProcedures: [
    {
      id: "list-0",
      content: ``,
      sublist: []
    }
  ],
  preconditions: [],
  postcondition: ""
};

export default function useCaseReducer(state = initialState, action) {
  if (action.type === "SET_USE_CASE_MODAL_REDUCER") {
    return action.payload;
  } else {
    return state;
  }
}
