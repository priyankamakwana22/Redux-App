import { combineReducers, legacy_createStore as createStore } from "redux";
import placeReducer from "../reducer/placeReducer";

const rootReducer = combineReducers({
    places : placeReducer
})

const configureStore = () => {
    return createStore(rootReducer);
}

export default configureStore;