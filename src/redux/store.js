import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { itemsReducer } from './reducers/itemsReducer';

const rootReducer = combineReducers({
    textpadphoto: itemsReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))