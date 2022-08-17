import { createStore } from "redux";

const initialState = { ridee: "" };

const rideeReducer = (state = initialState, action) => {
  if (action.type === "LOGIN") {
    return {
      ridee: action.payload,
    };
  }
};

const store = createStore(rideeReducer);

export default store;
