const initialState = [];

export default function testListDocsReducer(state = initialState, action) {
    if (action.type === "SET_LIST_DOCS") {
        return action.payload;
    } else {
        return state;
    }
}
