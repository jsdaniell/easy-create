const initialState = null;

export default function userUidReducer(state = initialState, action) {
    if (action.type === "SET_USER_UID") {
        return action.payload;
    } else {
        return state;
    }
}
