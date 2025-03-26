import React from 'react';
import './JobCard.css';

const JobCard = ({ job, onClick }) => {
    return (
        <div className="job-card" onClick={onClick}>
            <h3 className="job-title">{job.title}</h3>
            <span className="job-type">{job.type}</span>
            <div className="job-company">{job.company}</div>
            <div className="job-meta">
                <div>
                    <span className="material-icons-round location-icon">location_on</span>
                    {job.location}
                </div>
                <div>
                    <span className="material-icons-round salary-icon">attach_money</span>
                    ${job.salary}/hr
                </div>
            </div>
            <p className="job-description">{job.shortDescription}</p>
            <div className="job-footer">
                <div className="job-applicants">
                    <span className="material-icons-round">group</span>
                    {job.applicants} applicants
                </div>
                <div className="posted-time">Posted {job.postedTime}</div>
            </div>
        </div>
    );
};

export default JobCard; 