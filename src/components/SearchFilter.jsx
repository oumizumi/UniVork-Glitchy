import React, { useState } from 'react';
import './SearchFilter.css';

const SearchFilter = () => {
    const [location, setLocation] = useState('');
    const [jobType, setJobType] = useState('');
    const [jobSchedule, setJobSchedule] = useState('');

    const handleSearch = () => {
        console.log({ location, jobType, jobSchedule });
    }; 

    return (
        <div className = "search-filter">
            <div className = "filters">
                <input type="text" placeholder="Search for jobs" className="search-input" value={location} onChange={(e) => setLocation(e.target.value)}
                />
                    <input type="text" placeholder="Location" className="search-input" value={location} onChange={(e) => setLocation(e.target.value)}
                    />
                    <select className="filter-dropdown" value={jobType} onChange={(e) => setJobType(e.target.value)}
                    >
                        <option value="">Job Type</option> <option value="paid">Paid</option> <option value="unpaid"> Unpaid </option>
                    </select>
                    <select className="filter-dropdown" value={jobSchedule} onChange={(e) => setJobSchedule(e.target.value)}
                    >
                        <option value= ""> Job Schedule </option> <option value="fulltime"> Full-time </option> <option value="parttime"> Part-time</option>
                    </select>
                    
                <button onClick={handleSearch} className="search-button">
                    Search
                </button>

            </div>
        </div>
    )
}; 

export default SearchFilter; 
