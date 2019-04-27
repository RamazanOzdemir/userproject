import {createStore ,applyMiddleware, compose,combineReducers} from 'redux';
import thunk from 'redux-thunk';
import loadingReducer from './reducers/loading';
import usersReducer from './reducers/users';
import authReducer from './reducers/auth';
import signinReducer from './reducers/signup'
import sideReducer from './reducers/side'

// reducerleri türüne göre ayır.


const rootReducer = combineReducers({
  
    loginUser : authReducer,
    isOpen : sideReducer,
    loading : loadingReducer,
    saved : signinReducer,
    users: usersReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;




export default () =>  createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));

// chrome'a şu eklentiyi ekle =>>>


// https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd

//export default () =>  createStore(rootReducer,applyMiddleware(thunk));