import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import rootReducer from './reducers';
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'hulmers',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);



export { store, persistor };