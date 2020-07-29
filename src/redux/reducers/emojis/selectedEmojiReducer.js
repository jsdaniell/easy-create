const initialState = {
  selectedEmoji: {
    id: "partying_face",
    name: "Face with Party Horn and Party Hat",
    short_names: ["partying_face"],
    colons: ":partying_face:",
    emoticons: [],
    unified: "1f973",
    skin: null,
    native: "🥳"
  },
  selectedLanguage: "javascript"
};

export default function selectedEmojiReducer(state = initialState, action) {
  if (action.type === "SET_SELECTED_EMOJI") {
    return action.payload;
  } else {
    return state;
  }
}
