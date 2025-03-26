import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentDashboard.css';
import NavigationBarStudent from '../layouts/NavigationBarStudent.jsx';
import UpdateProfile from '../components/UpdateProfile.jsx';
import StudentDashboardFooter from '../layouts/StudentDashboardFooter.jsx';
import Motivation from '../components/Motivation.jsx';
import SearchFilter from '../components/SearchFilter.jsx';
import ListOfJobs from '../components/ListOfJobs.jsx';
import JobCard from '../components/JobCard';
import JobDetails from '../components/JobDetails';

const StudentDashboard = () => {
    const navigate = useNavigate();
    const [isProfileUpdated, setIsProfileUpdated] = useState(false);
    const [showInitialMessage, setShowInitialMessage] = useState(true);
    const [showForm, setShowForm] = useState(true);
    const [showTasks, setShowTasks] = useState(false);
    const [showPerformance, setShowPerformance] = useState(false);
    const [showCompanyInfo, setShowCompanyInfo] = useState(false);
    const [updateStatus, setUpdateStatus] = useState(null);
    const [updateMessage, setUpdateMessage] = useState('');
    const [hasAcceptedJob, setHasAcceptedJob] = useState(false);
    const [userName, setUserName] = useState({ firstName: '', middleName: '', lastName: '' });
    const [formData, setFormData] = useState({
        fullName: '',
        studentNumber: '',
        status: '',
        educationLevel: '',
        university: '',
        major: '',
        academicYear: '',
        gpa: '',
        universityEmail: '',
        phoneNumber: '',
        city: '',
        expectedGraduationDate: '',
        resume: null
    });
    const [selectedJob, setSelectedJob] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [locationQuery, setLocationQuery] = useState('');

    // Add the missing applicationStatus array
    const [applicationStatus] = useState([
        {
            id: 1,
            title: "Frontend Developer Intern",
            company: "Tech Solutions Inc.",
            location: "Toronto, ON",
            type: "Internship",
            salary: "$25/hr",
            status: "accepted",
            statusMessage: "Congratulations! Your application has been accepted.",
            nextSteps: "Please check your email for onboarding instructions.",
            appliedDate: "2024-03-15"
        },
        {
            id: 2,
            title: "Software Engineer Co-op",
            company: "Innovation Labs",
            location: "Vancouver, BC",
            type: "Co-op",
            salary: "$28/hr",
            status: "pending",
            statusMessage: "Your application is under review.",
            nextSteps: "We will contact you within 5-7 business days.",
            appliedDate: "2024-03-18"
        },
        {
            id: 3,
            title: "Full Stack Developer",
            company: "Digital Dynamics",
            location: "Montreal, QC",
            type: "Full-time",
            salary: "$75,000/year",
            status: "interview",
            statusMessage: "You have been selected for an interview!",
            nextSteps: "Schedule your interview through the email link.",
            appliedDate: "2024-03-20"
        },
        {
            id: 4,
            title: "Mobile App Developer",
            company: "App Innovate",
            location: "Ottawa, ON",
            type: "Part-time",
            salary: "$30/hr",
            status: "rejected",
            statusMessage: "Thank you for your interest.",
            nextSteps: "Feel free to apply to other positions.",
            appliedDate: "2024-03-10"
        }
    ]);

    useEffect(() => {
        const savedProfile = localStorage.getItem('studentProfile');
        if (savedProfile) {
            const parsedProfile = JSON.parse(savedProfile);
            setFormData(parsedProfile);
            setIsProfileUpdated(true);
            setShowForm(false);
        }

        // Check if user has an accepted job
        const acceptedJob = applicationStatus.find(app => app.status === 'accepted');
        setHasAcceptedJob(!!acceptedJob);
    }, [applicationStatus]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        const requiredFields = [
            'fullName', 'studentNumber', 'status', 'educationLevel',
            'university', 'major', 'academicYear', 'gpa',
            'universityEmail', 'phoneNumber', 'city', 'expectedGraduationDate'
        ];

        const missingFields = requiredFields.filter(field => !formData[field]);

        if (missingFields.length > 0) {
            alert('Please fill in all required fields');
            return;
        }

        // Save to localStorage
        localStorage.setItem('studentProfile', JSON.stringify(formData));
        setIsProfileUpdated(true);
        setUpdateMessage('Profile saved successfully!');
        setShowForm(false); // Hide the form after saving
    };

    const handleMenuItemClick = (item) => {
        if (!isProfileUpdated && item !== 'profile') {
            return;
        }

        // Reset all view states
        setShowForm(false);
        setShowTasks(false);
        setShowPerformance(false);
        setShowCompanyInfo(false);

        switch (item) {
            case 'profile':
                setShowForm(true);
                break;
            case 'tasks':
                setShowTasks(true);
                break;
            case 'performance':
                setShowPerformance(true);
                break;
            case 'company':
                setShowCompanyInfo(true);
                break;
            default:
                break;
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setFormData(prevState => ({
                ...prevState,
                [name]: files[0]
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const fillExampleData = () => {
        setFormData({
            fullName: 'John Michael Smith',
            studentNumber: '1234567890',
            status: 'student',
            educationLevel: 'undergraduate',
            university: 'uoft',
            major: 'computer_science',
            academicYear: '3',
            gpa: '3.8',
            universityEmail: 'john.smith@mail.utoronto.ca',
            phoneNumber: '(647) 123-4567',
            city: 'Toronto',
            expectedGraduationDate: '2025-04-30',
            resume: null // Since file input can't be programmatically set for security reasons
        });
    };

    const handleLogoClick = () => {
        navigate('/');
    };

    // Sample jobs data
    const jobs = [
        {
            id: 1,
            title: 'Software Engineer Intern',
            type: 'Internship',
            company: 'Tech Solutions Inc.',
            location: 'New York, NY',
            salary: '25-30',
            shortDescription: 'Join our dynamic team developing cutting-edge web applications. Work with modern technologies like React, Node.js, and AWS.',
            fullDescription: 'We are seeking a talented Software Engineer Intern to join our development team. You will work on real-world projects, collaborate with experienced developers, and gain hands-on experience with modern technologies.',
            requirements: [
                'Currently pursuing a degree in Computer Science or related field',
                'Strong understanding of web technologies and programming concepts',
                'Experience with JavaScript and modern frameworks',
                'Excellent problem-solving and analytical skills',
                'Strong communication and teamwork abilities'
            ],
            responsibilities: [
                'Develop and maintain web applications using React and Node.js',
                'Collaborate with the team on architecture and design decisions',
                'Write clean, efficient, and maintainable code',
                'Participate in code reviews and team meetings',
                'Learn and adapt to new technologies and methodologies'
            ],
            skills: ['React', 'Node.js', 'JavaScript', 'Git', 'AWS'],
            applicants: 45,
            postedTime: '2 days ago',
            deadline: 'March 30, 2024'
        },
        {
            id: 2,
            title: 'Data Science Co-op',
            type: 'Co-op',
            company: 'Analytics Pro',
            location: 'Boston, MA',
            salary: '28-35',
            shortDescription: 'Help us build machine learning models and analyze large datasets. Experience with Python and data visualization required.',
            fullDescription: 'Join our data science team to work on exciting projects involving machine learning, data analysis, and visualization. You will have the opportunity to work with real-world data and make meaningful contributions to our products.',
            requirements: [
                'Currently pursuing a degree in Data Science, Statistics, or related field',
                'Strong programming skills in Python',
                'Experience with data visualization tools',
                'Knowledge of machine learning concepts',
                'Strong analytical and mathematical skills'
            ],
            responsibilities: [
                'Develop and implement machine learning models',
                'Analyze large datasets and create visualizations',
                'Collaborate with team members on data-driven projects',
                'Present findings and insights to stakeholders',
                'Contribute to the improvement of our data pipeline'
            ],
            skills: ['Python', 'Machine Learning', 'SQL', 'Data Visualization', 'Statistics'],
            applicants: 32,
            postedTime: '5 days ago',
            deadline: 'April 15, 2024'
        },
        {
            id: 3,
            title: 'UI/UX Design Intern',
            type: 'Part-time',
            company: 'Creative Digital',
            location: 'Remote',
            salary: '22-26',
            shortDescription: 'Create beautiful and intuitive user interfaces for our mobile applications. Work closely with our design team.',
            fullDescription: 'We are looking for a creative and passionate UI/UX Design Intern to help create exceptional user experiences for our mobile applications. You will work closely with our design team and have the opportunity to see your designs come to life.',
            requirements: [
                'Currently pursuing a degree in Design, HCI, or related field',
                'Strong portfolio demonstrating UI/UX design skills',
                'Proficiency with design tools like Figma or Adobe XD',
                'Understanding of user-centered design principles',
                'Excellent attention to detail'
            ],
            responsibilities: [
                'Create user interfaces for mobile applications',
                'Conduct user research and usability testing',
                'Develop wireframes and prototypes',
                'Collaborate with developers on implementation',
                'Contribute to our design system'
            ],
            skills: ['Figma', 'UI Design', 'UX Design', 'Prototyping', 'User Research'],
            applicants: 28,
            postedTime: '1 week ago',
            deadline: 'April 5, 2024'
        },
        {
            id: 4,
            title: 'Research Assistant - Biology',
            type: 'Volunteer',
            company: 'Science Discovery Lab',
            location: 'Toronto, ON',
            salary: 'Learning Opportunity',
            shortDescription: 'Gain invaluable research experience in our state-of-the-art biology lab. Perfect for students passionate about molecular biology and genetic research.',
            fullDescription: 'Join our dynamic research team and contribute to groundbreaking studies in molecular biology. This volunteer position offers hands-on experience with advanced lab equipment and mentorship from leading scientists.',
            requirements: [
                'Currently pursuing a degree in Biology, Biochemistry, or related field',
                'Strong interest in molecular biology and genetics',
                'Basic lab experience preferred but not required',
                'Excellent attention to detail and documentation skills',
                'Ability to commit 10-15 hours per week'
            ],
            responsibilities: [
                'Assist in conducting laboratory experiments',
                'Help maintain lab equipment and inventory',
                'Document research findings and contribute to data analysis',
                'Participate in weekly team meetings and discussions',
                'Support senior researchers in ongoing projects'
            ],
            skills: ['Lab Techniques', 'Data Analysis', 'Research Methods', 'Documentation', 'Team Collaboration'],
            applicants: 15,
            postedTime: '3 days ago',
            deadline: 'April 10, 2024'
        }
    ];

    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesLocation = !locationQuery ||
            job.location.toLowerCase().includes(locationQuery.toLowerCase());

        return matchesSearch && matchesLocation;
    });

    // Sample tasks data
    const tasks = [
        {
            id: 1,
            title: 'Complete Onboarding Documents',
            priority: 'High',
            deadline: 'March 30, 2024',
            status: 'In Progress',
            description: 'Fill out and submit all required onboarding paperwork'
        },
        {
            id: 2,
            title: 'Setup Development Environment',
            priority: 'High',
            deadline: 'March 31, 2024',
            status: 'Not Started',
            description: 'Install and configure all necessary development tools'
        },
        {
            id: 3,
            title: 'Review Company Policies',
            priority: 'Medium',
            deadline: 'April 1, 2024',
            status: 'Not Started',
            description: 'Read through employee handbook and company guidelines'
        },
        {
            id: 4,
            title: 'Team Introduction Meeting',
            priority: 'Medium',
            deadline: 'April 2, 2024',
            status: 'Scheduled',
            description: 'Virtual meet and greet with the development team'
        }
    ];

    // Sample performance data
    const performanceData = {
        weeklyStats: {
            tasksCompleted: 12,
            hoursLogged: 38,
            meetingsAttended: 5,
            codeReviews: 8
        },
        achievements: [
            {
                id: 1,
                title: 'Quick Learner',
                description: 'Completed onboarding tasks ahead of schedule',
                date: 'March 25, 2024'
            },
            {
                id: 2,
                title: 'Team Player',
                description: 'Actively participated in team discussions',
                date: 'March 27, 2024'
            }
        ],
        feedback: [
            {
                id: 1,
                from: 'Team Lead',
                message: 'Great attention to detail in your work',
                date: 'March 26, 2024'
            },
            {
                id: 2,
                from: 'Mentor',
                message: 'Showing excellent progress in learning our tech stack',
                date: 'March 28, 2024'
            }
        ]
    };

    // Sample company info
    const companyInfo = {
        name: 'Tech Solutions Inc.',
        department: 'Software Development',
        team: 'Frontend Development',
        supervisor: {
            name: 'Sarah Johnson',
            title: 'Senior Frontend Lead',
            email: 'sarah.johnson@techsolutions.com'
        },
        mentor: {
            name: 'Michael Chen',
            title: 'Senior Developer',
            email: 'michael.chen@techsolutions.com'
        },
        officeLocation: '123 Tech Street, New York, NY',
        workSchedule: 'Monday - Friday, 9:00 AM - 5:00 PM EST',
        importantLinks: [
            {
                title: 'Employee Portal',
                url: '#'
            },
            {
                title: 'Development Documentation',
                url: '#'
            },
            {
                title: 'Team Calendar',
                url: '#'
            }
        ]
    };

    return (
        <div className="dashboard-wrapper">
            <nav className="dashboard-nav">
                <div className="nav-left">
                    <span
                        className="nav-logo"
                        onClick={handleLogoClick}
                        role="button"
                        aria-label="Go to home page"
                    >
                        UniVork
                    </span>
                </div>
                <div className="nav-right">
                    <div className="nav-icons">
                        <div className="nav-icon">
                            <span className="material-icons-round">mail</span>
                            <span className="badge">2</span>
                        </div>
                        <div className="nav-icon">
                            <span className="material-icons-round">notifications</span>
                            <span className="badge">3</span>
                        </div>
                        <div className="nav-icon">
                            <span className="material-icons-round">emoji_events</span>
                            <span className="badge achievement">5</span>
                        </div>
                        <div className="nav-icon profile">
                            <span className="material-icons-round">account_circle</span>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="dashboard-container">
                <div className="dashboard-sidebar">
                    <div className="sidebar-menu">
                        <div
                            className={`menu-item ${showForm ? 'active' : ''}`}
                            onClick={() => handleMenuItemClick('profile')}
                        >
                            <span className="material-icons-round">person</span>
                            {isProfileUpdated ? formData.fullName : 'Update Profile'}
                        </div>
                        {hasAcceptedJob ? (
                            <>
                                <div
                                    className={`menu-item ${!isProfileUpdated ? 'disabled' : ''} ${showTasks ? 'active' : ''}`}
                                    onClick={() => handleMenuItemClick('tasks')}
                                >
                                    <span className="material-icons-round">task</span>
                                    Tasks
                                </div>
                                <div
                                    className={`menu-item ${!isProfileUpdated ? 'disabled' : ''} ${showPerformance ? 'active' : ''}`}
                                    onClick={() => handleMenuItemClick('performance')}
                                >
                                    <span className="material-icons-round">analytics</span>
                                    Weekly Performance
                                </div>
                                <div
                                    className={`menu-item ${!isProfileUpdated ? 'disabled' : ''} ${showCompanyInfo ? 'active' : ''}`}
                                    onClick={() => handleMenuItemClick('company')}
                                >
                                    <span className="material-icons-round">business</span>
                                    Company Info
                                </div>
                            </>
                        ) : (
                            <>
                                <div
                                    className={`menu-item ${!isProfileUpdated ? 'disabled' : ''}`}
                                    onClick={() => handleMenuItemClick('jobs')}
                                >
                                    <span className="material-icons-round">work</span>
                                    Apply for Jobs
                                </div>
                                <div
                                    className={`menu-item ${!isProfileUpdated ? 'disabled' : ''}`}
                                    onClick={() => handleMenuItemClick('status')}
                                >
                                    <span className="material-icons-round">assignment</span>
                                    Application Status
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="dashboard-main">
                    {showForm && (
                        <div className="profile-section">
                            {!isProfileUpdated && (
                                <div className="warning-message">
                                    ⚠️ Update your profile to unlock the features!
                                </div>
                            )}

                            {isProfileUpdated && (
                                <div className="success-message">
                                    ✅ Your profile is complete! You can now access all features.
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="profile-form">
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isProfileUpdated}
                                        readOnly={isProfileUpdated}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Student Number</label>
                                    <input
                                        type="text"
                                        name="studentNumber"
                                        value={formData.studentNumber}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 12345678"
                                        disabled={isProfileUpdated}
                                        readOnly={isProfileUpdated}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Status</label>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isProfileUpdated}
                                    >
                                        <option value="">Select Status</option>
                                        <option value="student">Student</option>
                                        <option value="alumni">Alumni</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Education Level</label>
                                    <select
                                        name="educationLevel"
                                        value={formData.educationLevel}
                                        onChange={handleInputChange}
                                        disabled={isProfileUpdated}
                                    >
                                        <option value="">Select Education Level</option>
                                        <option value="undergraduate">Undergraduate</option>
                                        <option value="graduate">Graduate</option>
                                        <option value="phd">PhD</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>University</label>
                                    <select
                                        name="university"
                                        value={formData.university}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isProfileUpdated}
                                    >
                                        <option value="">Select University</option>
                                        <option value="uoft">University of Toronto</option>
                                        <option value="mcgill">McGill University</option>
                                        <option value="ubc">University of British Columbia</option>
                                        <option value="waterloo">University of Waterloo</option>
                                        <option value="alberta">University of Alberta</option>
                                        <option value="mcmaster">McMaster University</option>
                                        <option value="montreal">University of Montreal</option>
                                        <option value="calgary">University of Calgary</option>
                                        <option value="ottawa">University of Ottawa</option>
                                        <option value="western">Western University</option>
                                        <option value="queens">Queen's University</option>
                                        <option value="york">York University</option>
                                        <option value="ryerson">Toronto Metropolitan University</option>
                                        <option value="concordia">Concordia University</option>
                                        <option value="sfu">Simon Fraser University</option>
                                        <option value="dalhousie">Dalhousie University</option>
                                        <option value="carleton">Carleton University</option>
                                        <option value="victoria">University of Victoria</option>
                                        <option value="manitoba">University of Manitoba</option>
                                        <option value="saskatchewan">University of Saskatchewan</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Major</label>
                                    <select
                                        name="major"
                                        value={formData.major}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isProfileUpdated}
                                    >
                                        <option value="">Select Major</option>
                                        <optgroup label="Engineering & Technology">
                                            <option value="computer_science">Computer Science</option>
                                            <option value="software_eng">Software Engineering</option>
                                            <option value="electrical_eng">Electrical Engineering</option>
                                            <option value="mechanical_eng">Mechanical Engineering</option>
                                            <option value="civil_eng">Civil Engineering</option>
                                            <option value="chemical_eng">Chemical Engineering</option>
                                            <option value="industrial_eng">Industrial Engineering</option>
                                            <option value="biomedical_eng">Biomedical Engineering</option>
                                        </optgroup>
                                        <optgroup label="Business & Economics">
                                            <option value="business_admin">Business Administration</option>
                                            <option value="finance">Finance</option>
                                            <option value="accounting">Accounting</option>
                                            <option value="economics">Economics</option>
                                            <option value="marketing">Marketing</option>
                                            <option value="hr_management">Human Resources Management</option>
                                        </optgroup>
                                        <optgroup label="Sciences">
                                            <option value="biology">Biology</option>
                                            <option value="chemistry">Chemistry</option>
                                            <option value="physics">Physics</option>
                                            <option value="mathematics">Mathematics</option>
                                            <option value="statistics">Statistics</option>
                                            <option value="environmental_science">Environmental Science</option>
                                        </optgroup>
                                        <optgroup label="Health Sciences">
                                            <option value="nursing">Nursing</option>
                                            <option value="pharmacy">Pharmacy</option>
                                            <option value="psychology">Psychology</option>
                                            <option value="public_health">Public Health</option>
                                            <option value="kinesiology">Kinesiology</option>
                                        </optgroup>
                                        <optgroup label="Arts & Humanities">
                                            <option value="english">English</option>
                                            <option value="history">History</option>
                                            <option value="philosophy">Philosophy</option>
                                            <option value="communications">Communications</option>
                                            <option value="political_science">Political Science</option>
                                            <option value="sociology">Sociology</option>
                                        </optgroup>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Academic Year</label>
                                    <select
                                        name="academicYear"
                                        value={formData.academicYear}
                                        onChange={handleInputChange}
                                        disabled={isProfileUpdated}
                                    >
                                        <option value="">Select Academic Year</option>
                                        <option value="1">First Year</option>
                                        <option value="2">Second Year</option>
                                        <option value="3">Third Year</option>
                                        <option value="4">Fourth Year</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>GPA</label>
                                    <input
                                        type="text"
                                        name="gpa"
                                        value={formData.gpa}
                                        onChange={handleInputChange}
                                        placeholder="Enter your GPA"
                                        disabled={isProfileUpdated}
                                        readOnly={isProfileUpdated}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>University Email</label>
                                    <input
                                        type="email"
                                        name="universityEmail"
                                        value={formData.universityEmail}
                                        onChange={handleInputChange}
                                        placeholder="firstname@students.ca"
                                        disabled={isProfileUpdated}
                                        readOnly={isProfileUpdated}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                        placeholder="Enter your phone number"
                                        disabled={isProfileUpdated}
                                        readOnly={isProfileUpdated}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        placeholder="Enter your city"
                                        disabled={isProfileUpdated}
                                        readOnly={isProfileUpdated}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Expected Graduation Date</label>
                                    <input
                                        type="date"
                                        name="expectedGraduationDate"
                                        value={formData.expectedGraduationDate}
                                        onChange={handleInputChange}
                                        disabled={isProfileUpdated}
                                        readOnly={isProfileUpdated}
                                    />
                                </div>

                                <div className="file-upload">
                                    <input
                                        type="file"
                                        className="file-input"
                                        accept=".pdf,.doc,.docx"
                                        onChange={handleInputChange}
                                        name="resume"
                                        disabled={isProfileUpdated}
                                    />
                                    <div className="file-label">
                                        <span className="material-icons-round">upload_file</span>
                                        {formData.resume ? formData.resume.name : 'Upload your resume (optional)'}
                                    </div>
                                </div>

                                {!isProfileUpdated && (
                                    <button type="submit" className="submit-button">
                                        Save Profile
                                    </button>
                                )}
                            </form>
                        </div>
                    )}

                    {showTasks && (
                        <div className="tasks-section">
                            <h2>My Tasks</h2>
                            <div className="tasks-list">
                                {tasks.map(task => (
                                    <div key={task.id} className={`task-card priority-${task.priority.toLowerCase()}`}>
                                        <div className="task-header">
                                            <h3>{task.title}</h3>
                                            <span className={`priority-badge ${task.priority.toLowerCase()}`}>
                                                {task.priority}
                                            </span>
                                        </div>
                                        <div className="task-details">
                                            <p>{task.description}</p>
                                            <div className="task-meta">
                                                <div className="deadline">
                                                    <span className="material-icons-round">event</span>
                                                    {task.deadline}
                                                </div>
                                                <div className="status">
                                                    <span className="material-icons-round">flag</span>
                                                    {task.status}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {showPerformance && (
                        <div className="performance-section">
                            <h2>Weekly Performance</h2>
                            <div className="performance-stats">
                                <div className="stat-card">
                                    <span className="material-icons-round">task_alt</span>
                                    <h3>Tasks Completed</h3>
                                    <p>{performanceData.weeklyStats.tasksCompleted}</p>
                                </div>
                                <div className="stat-card">
                                    <span className="material-icons-round">schedule</span>
                                    <h3>Hours Logged</h3>
                                    <p>{performanceData.weeklyStats.hoursLogged}</p>
                                </div>
                                <div className="stat-card">
                                    <span className="material-icons-round">groups</span>
                                    <h3>Meetings Attended</h3>
                                    <p>{performanceData.weeklyStats.meetingsAttended}</p>
                                </div>
                                <div className="stat-card">
                                    <span className="material-icons-round">rate_review</span>
                                    <h3>Code Reviews</h3>
                                    <p>{performanceData.weeklyStats.codeReviews}</p>
                                </div>
                            </div>

                            <div className="achievements-section">
                                <h3>Achievements</h3>
                                <div className="achievements-list">
                                    {performanceData.achievements.map(achievement => (
                                        <div key={achievement.id} className="achievement-card">
                                            <div className="achievement-icon">
                                                <span className="material-icons-round">emoji_events</span>
                                            </div>
                                            <div className="achievement-content">
                                                <h4>{achievement.title}</h4>
                                                <p>{achievement.description}</p>
                                                <span className="achievement-date">{achievement.date}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="feedback-section">
                                <h3>Recent Feedback</h3>
                                <div className="feedback-list">
                                    {performanceData.feedback.map(feedback => (
                                        <div key={feedback.id} className="feedback-card">
                                            <div className="feedback-header">
                                                <span className="material-icons-round">person</span>
                                                <h4>{feedback.from}</h4>
                                                <span className="feedback-date">{feedback.date}</span>
                                            </div>
                                            <p>{feedback.message}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {showCompanyInfo && (
                        <div className="company-section">
                            <h2>Company Information</h2>
                            <div className="company-details">
                                <div className="company-header">
                                    <h3>{companyInfo.name}</h3>
                                    <p>{companyInfo.department} - {companyInfo.team}</p>
                                </div>

                                <div className="contact-cards">
                                    <div className="contact-card">
                                        <h4>Supervisor</h4>
                                        <p className="name">{companyInfo.supervisor.name}</p>
                                        <p className="title">{companyInfo.supervisor.title}</p>
                                        <p className="email">{companyInfo.supervisor.email}</p>
                                    </div>
                                    <div className="contact-card">
                                        <h4>Mentor</h4>
                                        <p className="name">{companyInfo.mentor.name}</p>
                                        <p className="title">{companyInfo.mentor.title}</p>
                                        <p className="email">{companyInfo.mentor.email}</p>
                                    </div>
                                </div>

                                <div className="info-card">
                                    <h4>Office Location</h4>
                                    <p><span className="material-icons-round">location_on</span> {companyInfo.officeLocation}</p>
                                </div>

                                <div className="info-card">
                                    <h4>Work Schedule</h4>
                                    <p><span className="material-icons-round">schedule</span> {companyInfo.workSchedule}</p>
                                </div>

                                <div className="important-links">
                                    <h4>Important Links</h4>
                                    <ul>
                                        {companyInfo.importantLinks.map((link, index) => (
                                            <li key={index}>
                                                <a href={link.url}>
                                                    <span className="material-icons-round">link</span>
                                                    {link.title}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    {!showForm && !showTasks && !showPerformance && !showCompanyInfo && (
                        <div className="applications-section">
                            <h2>Application Status</h2>
                            <div className="applications-list">
                                {applicationStatus.map(application => (
                                    <div key={application.id} className={`application-card ${application.status}`}>
                                        <div className="application-header">
                                            <h3>{application.title}</h3>
                                            <span className={`status-badge ${application.status}`}>
                                                {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                                            </span>
                                        </div>
                                        <div className="application-details">
                                            <div className="company-info">
                                                <span className="material-icons-round">business</span>
                                                {application.company}
                                            </div>
                                            <div className="location-info">
                                                <span className="material-icons-round">location_on</span>
                                                {application.location}
                                            </div>
                                            <div className="job-type">
                                                <span className="material-icons-round">work</span>
                                                {application.type}
                                            </div>
                                            <div className="salary-info">
                                                <span className="material-icons-round">attach_money</span>
                                                {application.salary}
                                            </div>
                                        </div>
                                        <div className="application-status">
                                            <p className="status-message">{application.statusMessage}</p>
                                            <p className="next-steps">{application.nextSteps}</p>
                                            <p className="applied-date">Applied on {application.appliedDate}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {showSearchFilter && showListOfJobs && (
                        <div className="jobs-section">
                            <div className="search-filters">
                                <div className="search-bar">
                                    <input
                                        type="text"
                                        placeholder="Search jobs..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <span className="material-icons-round search-icon">search</span>
                                </div>
                                <div className="search-bar">
                                    <input
                                        type="text"
                                        placeholder="Location"
                                        value={locationQuery}
                                        onChange={(e) => setLocationQuery(e.target.value)}
                                    />
                                    <span className="material-icons-round location-icon">location_on</span>
                                </div>
                            </div>

                            <div className="jobs-list">
                                {filteredJobs.map(job => (
                                    <JobCard
                                        key={job.id}
                                        job={job}
                                        onClick={() => setSelectedJob(job)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {selectedJob && (
                        <JobDetails
                            job={selectedJob}
                            onClose={() => setSelectedJob(null)}
                            onApply={() => {
                                alert('Application submitted successfully!');
                                setSelectedJob(null);
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;









