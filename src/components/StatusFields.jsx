import React, {useEffect} from 'react';
import './UpdateProfile.css';

const StatusFields = ({localData, setLocalData, handleFormUpdate, ifStudent, setStudentCard, setTranscript}) => { 
    useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userData")) || {};
    

    if (!localData.universityEmail && storedUserData.email) {
        setLocalData((prevData) => ({
          ...prevData,
          universityEmail: storedUserData.email,
        }));
      }
    }, []); 

    return (<div className="form-section">
<div className="form-group">
                    <label>University Email</label>
                    <input type="email" name="universityEmail" value = {localData.universityEmail} onChange={handleFormUpdate}/>
                </div>
                <div className="form-group">
                    <label>University Major</label>
                    <select name="universityMajor" value = {localData.universityMajor} onChange={handleFormUpdate} >
                    <option value = ""> </option>
                        <option value = "UniversityMajor1">  UniversityMajor1 </option>
                        <option value = "UniversityMajor2">  UniversityMajor2 </option>
                        <option value = "UniversityMajor3">  UniversityMajor3 </option>
                        <option value = "UniversityMajor4">  UniversityMajor4 </option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Level of Study</label>
                    <select name="levelOfStudy" value = {localData.levelOfStudy} onChange={handleFormUpdate} >
                    <option value = ""> </option>
                        <option value = "levelOfStudy1">  LevelOfStudy1 </option>
                        <option value = "levelOfStudy2">  LevelOfStudy2 </option>
                        <option value = "levelOfStudy3">  LevelOfStudy3 </option>
                        <option value = "levelOfStudy4">  LevelOfStudy4 </option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Status of Your Study</label>
                    <select name="studyStatus" value = {localData.studyStatus} onChange={handleFormUpdate} >
                    <option value = ""> </option>
                        <option value = "student">   Student </option>
                        <option value = "alumni">  Alumni </option>
                    </select>
                </div>
                {ifStudent && (
                <div className="form-group">
                
            
                    <label>Year of Study (if student)</label>
                    <select name="yearOfStudy" value = {localData.yearOfStudy} onChange={handleFormUpdate} >
                    <option value = ""> </option>
                        <option value = "yearOfStudy1"> First Year </option>
                        <option value = "yearOfStudy2">  Second Year </option>
                        <option value = "yearOfStudy3">  Third Year </option>
                        <option value = "yearOfStudy4AndAbove">  Fourth Year and above </option>
                    </select>
                </div>
                )
                }
                <div className="form-group">
                    <label>GPA</label>
                    <input type="number" name="gpa" value = {localData.gpa} onChange={handleFormUpdate} min="0.00" max="4.00" step="0.01" />
                </div>
                <div className="form-group">
                    <label>Picture of Student Card</label>
                    <input type="file" name="studentCard" onChange={(e) => setStudentCard(e.target.files[0])}  />
                </div>
                <div className="form-group">
                    <label>Upload Transcripts</label>
                    <input type="file" name="transcript" onChange={(e) => setTranscript(e.target.files[0])}  />
                </div>
                <div className= "form-group">
                    <label>Phone Number</label>
                    <input type="text" name="phoneNumber" value = {localData.phoneNumber} onChange={handleFormUpdate} />
                </div>
                <div className= "form-group">
                    <label>Home Address</label>
                    <input type="text" name="homeAddress" value = {localData.homeAddress} onChange={handleFormUpdate}/>
                </div> </div> );
    
            }; 
export default StatusFields; 