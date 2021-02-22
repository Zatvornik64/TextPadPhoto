import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { recipeReducer } from './reducers/recipeReducer';

const rootReducer = combineReducers({
    cooking: recipeReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))