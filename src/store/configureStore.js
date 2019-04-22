import {createStore ,applyMiddleware, compose,combineReducers} from 'redux';
import thunk from 'redux-thunk';
import loadingReducer from './reducers/loading';
import usersReducer from './reducers/users';


// reducerleri türüne göre ayır.
import reducer from './reducer';

const rootReducer = combineReducers({
  //  users : reducer,
    status : reducer, //what the hell :) hepsi reducer ise neden hepsi farklı
    loginUser : reducer,
    isOpen : reducer,
    loading : loadingReducer,

    users: usersReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;




export default () =>  createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));

// chrome'a şu eklentiyi ekle =>>>


// https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd

//export default () =>  createStore(rootReducer,applyMiddleware(thunk));