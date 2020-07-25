const initialState = {
    list: [],
    selected: null
};

export default function testListDocsReducer(state = initialState, action) {
    if (action.type === "SET_TEST_GROUPS_STATE") {
        return action.payload;
    } else {
        return state;
    }
}
