import React, { useState } from 'react';
import './UpdateProfile.css';
import ProfileFields from './ProfileFields.jsx';
import StatusFields from  './StatusFields.jsx';
import { useDispatch, useSelector} from "react-redux"; 
import { studentProfile} from "../actions/userActions"; 

const UpdateProfile = ({onAdminResponse, formData, clearInitialMessage, isProfileUpdated}) => { 
    const [localData, setLocalData] = useState({...formData }); 
    const [ifStudent, setIfStudent]= useState(false); 
    const [profilePicture, setProfilePicture] = useState(null);
    const [studentCard, setStudentCard] = useState(null);
    const [transcript, setTranscript] = useState(null);
    
    const dispatch = useDispatch();

    const profileUpdate = useSelector((state)=>state.profileUpdate || {});
      const {error = null,loading = false, studentProfileInfo= null}=profileUpdate;
    



    const handleFormUpdate = (event) => {
        const {name, value } = event.target;
        setLocalData({...localData, [name]:value}); 
        if (name === "studyStatus") {
            setIfStudent(value === "student");
        }
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        onAdminResponse(localData);  
        clearInitialMessage(); 
        dispatch(
            studentProfile(
            `${localData.first_name} ${localData.middle_name} ${localData.last_name}`.trim(), // Merge names
            localData.country,
            localData.universityName,
            localData.levelOfStudy,
            localData.studyStatus,
            localData.universityMajor,
            localData.yearOfStudy, 
            localData.universityEmail, 
            localData.gpa, 
            localData.phoneNumber, 
            localData.homeAddress, 
            profilePicture,
            studentCard,
            transcript 
            )
        );
        };

    return (<div className="form-container">
         <form onSubmit={handleSubmit} >
            <ProfileFields localData={localData} handleFormUpdate={handleFormUpdate} setProfilePicture={setProfilePicture} /> 
    {!isProfileUpdated && <StatusFields localData={localData} setLocalData={setLocalData} handleFormUpdate={handleFormUpdate}  ifStudent = {ifStudent} setStudentCard={setStudentCard} setTranscript={setTranscript}/> }
    <div className="form-group">
    {loading && <p>Loading...</p>}
        {error && <p className="error-message">{error}</p>}
<button type="submit">Submit</button>
</div>
    
    </form> </div>); 
}; 

export default UpdateProfile; 