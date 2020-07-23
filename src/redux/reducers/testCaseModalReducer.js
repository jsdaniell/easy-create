const initialState = {
  title: "",
  id: "",
  environment: "",
  priority: "",
  name: "",
  actor: "",
  preconditions: [],
  procedures: [],
  postcondition: ""
};

export default function testCaseModalReducer(state = initialState, action) {
  if (action.type === "SET_TEST_CASE_MODAL_REDUCER") {
    return action.payload;
  } else {
    return state;
  }
}
