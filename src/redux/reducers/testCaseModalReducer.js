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
    if (
      localStorage.getItem("persist:root") &&
      typeof JSON.parse(
        JSON.parse(localStorage.getItem("persist:root")).testCaseModalReducer
      ) === "object"
    ) {
      return JSON.parse(
        JSON.parse(localStorage.getItem("persist:root")).testCaseModalReducer
      );
    }
    return state;
  }
}
