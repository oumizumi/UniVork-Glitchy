
import React from 'react';
import './UpdateProfile.css';

const ProfileFields = ({localData, handleFormUpdate, setProfilePicture}) => { 
    const handleFileUpdate = (event) => {
        setProfilePicture(event.target.files[0]);
    }; 
     

    return (<div className="form-section">
<div className="form-group">
    <label>Profile Picture</label>
    <input type="file" name="profilePicture" onChange={handleFileUpdate} />
</div>
<div className="form-group">
    <label>First Name</label>
    <input type="text" name="firstName" value={localData.firstName} onChange={handleFormUpdate} /> 
</div>
<div className="form-group">
    <label>Middle Name</label>
    <input type="text" name="middleName" value={localData.middleName} onChange={handleFormUpdate} />
</div>
<div className="form-group">
    <label>Last Name</label>
    <input type="text" name="lastName" value={localData.lastName} onChange={handleFormUpdate} />
</div>
<div className="form-group">
    <label>Country</label>
    <select name="country" value = {localData.country} onChange={handleFormUpdate} >
    <option value = ""> </option>
        <option value = "Country1">  Country1 </option>
        <option value = "Country2">  Country2 </option>
        <option value = "Country3">  Country3 </option>
        <option value = "Country4">  Country4 </option>
    </select>
</div>
<div className="form-group">
    <label>University Name</label>
    <select name="universityName" value = {localData.universityName} onChange={handleFormUpdate} >
    <option value = ""> </option>
        <option value = "University1">  University1 </option>
        <option value = "University2">  University2 </option>
        <option value = "University3">  University3 </option>
        <option value = "University4">  University4 </option>
    </select>
</div>
        
        </div>); 
}; 

export default ProfileFields; 