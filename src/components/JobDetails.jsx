import React from 'react';
import './JobDetails.css';

const JobDetails = ({ job, onClose, onApply }) => {
    if (!job) return null;

    return (
        <div className="job-details-overlay" onClick={onClose}>
            <div className="job-details-modal" onClick={e => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>
                    <span className="material-icons-round">close</span>
                </button>

                <div className="job-details-content">
                    <div className="job-details-header">
                        <h2>{job.title}</h2>
                        <span className="job-type">{job.type}</span>
                    </div>

                    <div className="company-info">
                        <h3>{job.company}</h3>
                        <div className="job-meta">
                            <span className="location">
                                <span className="material-icons-round">location_on</span>
                                {job.location}
                            </span>
                            <span className="salary">
                                <span className="material-icons-round">attach_money</span>
                                {job.salary}
                            </span>
                            <span className="posted">
                                <span className="material-icons-round">schedule</span>
                                Posted {job.postedTime}
                            </span>
                        </div>
                    </div>

                    <div className="job-section">
                        <h3>Job Description</h3>
                        <p>{job.description}</p>
                    </div>

                    <div className="job-section">
                        <h3>Requirements</h3>
                        <ul>
                            {job.requirements.map((req, index) => (
                                <li key={index}>{req}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="job-section">
                        <h3>Responsibilities</h3>
                        <ul>
                            {job.responsibilities.map((resp, index) => (
                                <li key={index}>{resp}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="job-section">
                        <h3>Required Skills</h3>
                        <div className="skills-list">
                            {job.skills.map((skill, index) => (
                                <span key={index} className="skill-tag">{skill}</span>
                            ))}
                        </div>
                    </div>

                    <div className="job-section">
                        <h3>Application Statistics</h3>
                        <div className="stats-grid">
                            <div className="stat-item">
                                <span className="material-icons-round">people</span>
                                <div className="stat-info">
                                    <span className="stat-value">{job.applicants}</span>
                                    <span className="stat-label">Applicants</span>
                                </div>
                            </div>
                            <div className="stat-item">
                                <span className="material-icons-round">visibility</span>
                                <div className="stat-info">
                                    <span className="stat-value">{job.views}</span>
                                    <span className="stat-label">Views</span>
                                </div>
                            </div>
                            <div className="stat-item">
                                <span className="material-icons-round">schedule</span>
                                <div className="stat-info">
                                    <span className="stat-value">{job.daysLeft}</span>
                                    <span className="stat-label">Days Left</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button className="apply-button" onClick={onApply}>
                        <span className="material-icons-round">send</span>
                        Apply Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JobDetails; 