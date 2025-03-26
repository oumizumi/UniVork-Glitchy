import React, { useState } from 'react';
import './ListOfJobs.css';


const Job = ({jobTitle, postingDate,  jobLocation, companyName, jobDescription, onClick}) => (
   
    <div className="job-square" onClick={onClick}>
        <h3>{jobTitle}</h3>
        <p><strong>Posting Date:</strong> {postingDate}</p>
        <p><strong>Company:</strong> {companyName}</p>
        <p><strong>Location:</strong> {jobLocation}</p>
        <p><strong>Description:</strong> {jobDescription}</p>
    </div>
)

const FullDescription = ({jobTitle, companyName, jobType, numberOfHours}) => (
    <div className="job-description-column">
        <h3>{jobTitle}</h3>
        <p><strong>Company:</strong> {companyName}</p>
        <p><strong>Job Type:</strong> {jobType}</p>
        <p><strong>Number Of Hours:</strong>{numberOfHours}</p>
    </div>
)

const ListOfJobs = () => {
    const [selectedJobId, setSelectedJobId] = useState(null); 

    const jobs = [
        { id: 1, jobTitle: 'job1', postingDate: 'postingdate1', jobLocation: 'jobLocation1', companyName: 'companyName1', jobDescription: 'jobDescription'},
        { id: 2, jobTitle: 'job2', postingDate: 'postingdate2', jobLocation: 'jobLocation2', companyName: 'companyName2', jobDescription: 'jobDescription2'}
        
    ]; 

    const fullDescriptions =  [
        {id: 1, jobTitle: 'job1',  companyName: 'companyName1', jobType: 'jobType1', numberOfHours: 'numberOfHours1'}, 
        {id: 2, jobTitle: 'job2',  companyName: 'companyName2', jobType: 'jobType2', numberOfHours: 'numberOfHours2'}
    ]; 

    const selectedFullDescription = fullDescriptions.find(desc => desc.id === selectedJobId);

    return (
        <div className = "jobs-container"> 
    <div className = "list-of-jobs">

        {jobs.map(job => (
            <Job key={job.id} jobTitle={job.jobTitle} postingDate={job.postingDate} jobLocation = {job.jobLocation} companyName={job.companyName} jobDescription={job.jobDescription} onClick={() => setSelectedJobId(job.id)}
            />
        ))} 
         </div>
         <div> 
        { selectedFullDescription && (
            <FullDescription jobTitle={selectedFullDescription.jobTitle} companyName={selectedFullDescription.companyName} jobType={selectedFullDescription.jobType} numberOfHours={selectedFullDescription.numberOfHours}
            />
        )} 
        </div> 
        </div> 
    ); 
};

export default ListOfJobs; 