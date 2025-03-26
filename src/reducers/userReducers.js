import {
    USER_SIGNUP_REQUEST, 
    USER_SIGNUP_SUCCESS, 
    USER_SIGNUP_FAIL, 
    STUDENT_PROFILE_REQUEST,
    STUDENT_PROFILE_SUCCESS,
    STUDENT_PROFILE_FAIL,
    EMPLOYER_SIGNUP_REQUEST,
    EMPLOYER_SIGNUP_SUCCESS,
    EMPLOYER_SIGNUP_FAIL
} from "../constants/userConstants";

const initialState = {
    loading: false,
    userInfo: null, 
    error: null, 
}; 

//Updates redux store based on requested action
export const userSignupReducers =(state= initialState,action)=>{
    switch(action.type) {
        case USER_SIGNUP_REQUEST:
        return { ...state, loading:true}; 
        case USER_SIGNUP_SUCCESS:
        return { ...state, loading:false,userInfo:action.payload}; 
        case USER_SIGNUP_FAIL:
        return { ...state, loading:false,error:action.payload}; 

        default:
            return state 
    }
}

export const studentProfileReducers=(state= initialState,action)=>{
    switch(action.type) {
        case STUDENT_PROFILE_REQUEST:
        return { ...state, loading:true}; 
        case STUDENT_PROFILE_SUCCESS:
        return { ...state, loading:false,userInfo:action.payload}; 
        case STUDENT_PROFILE_FAIL:
        return { ...state, loading:false,error:action.payload}; 

        default:
            return state 
    }
}

export const employerSignupReducers = (state = initialState, action) => {
    switch(action.type) {
        case EMPLOYER_SIGNUP_REQUEST:
            return { ...state, loading: true }; 
        case EMPLOYER_SIGNUP_SUCCESS:
            return { ...state, loading: false, employerInfo: action.payload }; 
        case EMPLOYER_SIGNUP_FAIL:
            return { ...state, loading: false, error: action.payload }; 
        default:
            return state;
    }
};