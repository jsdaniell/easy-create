const initialState = {
    list: [],
    selected: null
};

export default function useCaseGroupsReducer(state = initialState, action) {
    if (action.type === "SET_USE_GROUPS_STATE") {
        return action.payload;
    } else {
        return state;
    }
}
