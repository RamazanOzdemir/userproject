import {createStore ,applyMiddleware, compose,combineReducers} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

const rootReducer = combineReducers({
    users:reducer
})
//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


//export default () =>  createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));
export default () =>  createStore(rootReducer,applyMiddleware(thunk));