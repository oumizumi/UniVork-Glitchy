import {createStore, combineReducers, applyMiddleware} from 'redux';
import { thunk } from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {userSignupReducers, studentProfileReducers,  employerSignupReducers} from './reducers/userReducers';


const rootReducer = combineReducers({
    userSignup:userSignupReducers,
    studentProfile: studentProfileReducers, 
    employerSignup: employerSignupReducers, 
}); 

const initialState={};
const middleware=[thunk]; 
//The store which gives universal state for the application
const store = createStore(rootReducer,initialState,composeWithDevTools(applyMiddleware(...middleware))); 

export default store; 