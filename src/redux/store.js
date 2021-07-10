import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { session } from "./slice";

const rootReducer = combineReducers({
  session,
});

const middleWares = [thunk];

const composeEnhancers =
  (process.env.NODE_ENV !== "production" &&
    typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

// const persistConfig = {
//   key: "root",
//   storage,
// };
const persistConfig = {
  key: "session",
  storage,
  whitelist: ["session"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const rootMiddleWares = applyMiddleware(...middleWares);

export const store = createStore(
  persistedReducer,
  composeEnhancers(rootMiddleWares)
);
export const persistor = persistStore(store);
