import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import testCaseModalReducer from "./testCaseReducers/testCaseModalReducer";
import userUidReducer from "./testCaseReducers/userUidReducer";
import testListDocsReducer from "./testCaseReducers/testListDocsReducer";
import testGroupsReducer from "./testCaseReducers/testGroupsReducer";
import dataGeneratorReducer from "./dataGenerator/dataGeneratorReducer";
import selectedEmojiReducer from "./emojis/selectedEmojiReducer";
import useCaseReducer from "./useCaseReducers/useCaseReducer";
import useCaseGroupsReducer from "./useCaseReducers/useCaseGroupsReducer";
import useCaseListDocsReducer from "./useCaseReducers/useCaseListDocsReducer";

const rootPersistConfig = {
  key: "root",
  storage: storage
};

const rootReducer = combineReducers({
  testCaseModalReducer,
  userUidReducer,
  testListDocsReducer,
  testGroupsReducer,
  dataGeneratorReducer,
  selectedEmojiReducer,
  useCaseReducer,
  useCaseGroupsReducer,
  useCaseListDocsReducer
});

export default persistReducer(rootPersistConfig, rootReducer);
