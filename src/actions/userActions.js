import axios from "axios";
import {USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS, USER_SIGNUP_FAIL, STUDENT_PROFILE_REQUEST, STUDENT_PROFILE_SUCCESS, STUDENT_PROFILE_FAIL, EMPLOYER_SIGNUP_REQUEST, EMPLOYER_SIGNUP_SUCCESS, EMPLOYER_SIGNUP_FAIL} from '../constants/userConstants'

const singupUser = (username, email, password, accType) => async(dispatch)=>{
    try{
        dispatch({
            type:USER_SIGNUP_REQUEST
        }); 
        const config={
            headers:{
            'Content-type':'application/json', 
            }
        };

            const {data} =  (accType[0] === "student") ? await axios.post("http://127.0.0.1:8000/api/student_account/", {
                username,
                email,
                password,
            }, config) 
            :
             await axios.post('http://127.0.0.1:8000/api/employee_account/', {
                username,
                email,
                password,
                employerProfile: { company_name: accType[1] }
            }, config);
        
        

        if (data.token) {
        localStorage.setItem('token', data.token);
        }
        localStorage.setItem('userInfo', JSON.stringify(data));  

        dispatch({
            type:USER_SIGNUP_SUCCESS,
            payload: data
        }); 
    } 
    catch(error){
        dispatch({
            type:USER_SIGNUP_FAIL,
            payload:error.response && error.response.data.detail
            ? error.response.data.detail
            :error.message
        });
    }
};

export const signupStudent = (username, email, password) => async(dispatch)=>{
    dispatch(singupUser(username, email, password, ["student"]))
};

export const signupEmployer = (username, companyName, email, password) => async(dispatch)=>{
    dispatch(singupUser(username, email, password, ["employer", companyName]))
};


export const studentProfile = (user, country, university, level, status, major, year, email, gpa, phone_number, home_address, profilePicture, studentCard, transcript) => async(dispatch)=>{
    try{
        dispatch({
            type:STUDENT_PROFILE_REQUEST
        }); 
        const formData = new FormData();
        formData.append("user", user);
        formData.append("country", country);
        formData.append("university", university);
        formData.append("level", level);
        formData.append("status", status);
        formData.append("major", major);
        formData.append("year", year);
        formData.append("email", email);
        formData.append("gpa", gpa);
        formData.append("phone_number", phone_number);
        formData.append("home_address", home_address);

        if (profilePicture) formData.append("profile_picture", profilePicture);
        if (studentCard) formData.append("student_card", studentCard);
        if (transcript) formData.append("transcript", transcript);

        const config= {headers: {Authorization: `Token ${localStorage.getItem("token")}`}};


        const {data} = await axios.put(`http://127.0.0.1:8000/api/student_update/${JSON.parse(localStorage.getItem("userInfo")).user.id}/`, formData, config);

        if (data.token) {
        localStorage.setItem('token', data.token);
        }
        if (data) {
        localStorage.setItem('studentInfo', JSON.stringify(data));  
        }

        dispatch({
            type:STUDENT_PROFILE_SUCCESS,
            payload: data
        }); 
    } 
    catch(error){
        dispatch({
            type:STUDENT_PROFILE_FAIL,
            payload:error.response && error.response.data.detail
            ? error.response.data.detail
            :error.message
        });
    }
};


