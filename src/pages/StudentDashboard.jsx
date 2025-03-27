import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentDashboard.css';
import UpdateProfile from '../components/UpdateProfile.jsx';
import StudentDashboardFooter from '../layouts/StudentDashboardFooter.jsx';
import SearchFilter from '../components/SearchFilter.jsx';
import ListOfJobs from '../components/ListOfJobs.jsx';
import JobCard from '../components/JobCard';
import JobDetails from '../components/JobDetails';

const StudentDashboard = () => {
    const navigate = useNavigate();
    const [language, setLanguage] = useState('EN');
    const [isProfileUpdated, setIsProfileUpdated] = useState(false);
    const [showInitialMessage, setShowInitialMessage] = useState(true);
    const [showForm, setShowForm] = useState(true);
    const [showTasks, setShowTasks] = useState(false);
    const [showPerformance, setShowPerformance] = useState(false);
    const [showCompanyInfo, setShowCompanyInfo] = useState(false);
    const [showJobs, setShowJobs] = useState(false);
    const [showApplications, setShowApplications] = useState(false);
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
        country: '',
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
        // Check if user is authenticated
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        // Make sure isAuthenticated flag is set
        localStorage.setItem('isAuthenticated', 'true');

        // Check if this is a new sign up (no profile yet)
        const savedProfile = localStorage.getItem('studentProfile');
        if (savedProfile) {
            // If profile exists and is complete, mark as updated
            const parsedProfile = JSON.parse(savedProfile);
            setFormData(parsedProfile);

            // Check if profile is complete with required fields
            const requiredFields = [
                'fullName', 'studentNumber', 'status', 'educationLevel',
                'university', 'major', 'academicYear', 'gpa',
                'universityEmail', 'phoneNumber', 'country', 'city', 'expectedGraduationDate'
            ];

            const isComplete = requiredFields.every(field => parsedProfile[field] && parsedProfile[field].trim() !== '');

            setIsProfileUpdated(isComplete);

            // Always show the profile form first if not completed
            setShowForm(true);

            console.log("Profile loaded:", parsedProfile);
            console.log("Profile is complete:", isComplete);
        } else {
            // If no profile, create a minimal one with empty values to fill
            // This ensures we're in "phase 1" - profile setup
            const minimalProfile = {
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
                country: '',
                city: '',
                expectedGraduationDate: '',
                resume: null
            };
            // Don't save the empty profile to localStorage yet
            setFormData(minimalProfile);
            setIsProfileUpdated(false);
            setShowForm(true);
            console.log("New profile setup needed");
        }

        // Check if user has an accepted job
        const acceptedJob = applicationStatus.find(app => app.status === 'accepted');
        setHasAcceptedJob(!!acceptedJob);

        // Show initial message for new users
        setShowInitialMessage(!isProfileUpdated);
    }, [applicationStatus, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        const requiredFields = [
            'fullName', 'studentNumber', 'status', 'educationLevel',
            'university', 'major', 'academicYear', 'gpa',
            'universityEmail', 'phoneNumber', 'country', 'city', 'expectedGraduationDate'
        ];

        const missingFields = requiredFields.filter(field => !formData[field]);

        if (missingFields.length > 0) {
            alert('Please fill in all required fields');
            return;
        }

        // Save to localStorage
        localStorage.setItem('studentProfile', JSON.stringify(formData));

        // Set profile as updated - this unlocks the other menu items
        setIsProfileUpdated(true);

        // Show success message
        setUpdateMessage('Profile saved successfully! You can now access job listings and applications.');
        setUpdateStatus('success');

        // Show notification for 3 seconds
        setTimeout(() => {
            setUpdateStatus(null);
            setUpdateMessage('');
        }, 3000);

        console.log("Profile saved successfully");
    };

    const handleMenuItemClick = (item) => {
        // Only allow navigation to other pages if profile is updated,
        // except for the profile page itself
        if (!isProfileUpdated && item !== 'profile') {
            // Notify the user they need to complete profile first
            alert('Please complete your profile first to access this feature');
            return;
        }

        // Reset all view states
        setShowForm(false);
        setShowTasks(false);
        setShowPerformance(false);
        setShowCompanyInfo(false);
        setShowJobs(false);
        setShowApplications(false);

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
            case 'jobs':
                setShowJobs(true);
                break;
            case 'status':
                setShowApplications(true);
                break;
            default:
                break;
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === 'file' && files.length > 0) {
            setFormData({
                ...formData,
                [name]: files[0]
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
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
        <div className="dashboard-container">
            <header className="signup-header">
                <div>
                    <div className="signup-logo" onClick={() => navigate('/')}>
                        UniVork
                    </div>
                </div>
                <div className="header-icons">
                    <span className="material-icons-round">email</span>
                    <span className="material-icons-round">notifications</span>
                    <span className="material-icons-round">emoji_events</span>
                    <span className="material-icons-round">account_circle</span>
                </div>
            </header>

            <div className="dashboard-content">
                <aside className="dashboard-sidebar">
                    <div className="sidebar-item active">
                        <span className="material-icons-round">person</span>
                        <span>update profile</span>
                    </div>
                    <div className="sidebar-item disabled">
                        <span className="material-icons-round">work</span>
                        <span>apply for jobs</span>
                    </div>
                    <div className="sidebar-item disabled">
                        <span className="material-icons-round">description</span>
                        <span>application status</span>
                    </div>
                </aside>

                <main className="dashboard-main">
                    <div className="profile-form-container">
                        <div className="alert-box">
                            <span className="material-icons-round">warning</span>
                            <span>Update your profile to unlock the features!</span>
                        </div>

                        <div className="form-section">
                            <h2>Update your profile to unlock the features</h2>

                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Student Number</label>
                                    <input
                                        type="text"
                                        name="studentNumber"
                                        value={formData.studentNumber}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="e.g. 12345678"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Status</label>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleInputChange}
                                        required
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
                                        required
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
                                    >
                                        <option value="">Select University</option>
                                        <option value="uoft">University of Toronto</option>
                                        <option value="yorku">York University</option>
                                        <option value="ryerson">Toronto Metropolitan University</option>
                                        <option value="waterloo">University of Waterloo</option>
                                        <option value="mcgill">McGill University</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Major</label>
                                    <select
                                        name="major"
                                        value={formData.major}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select Major</option>
                                        <option value="computer_science">Computer Science</option>
                                        <option value="engineering">Engineering</option>
                                        <option value="business">Business</option>
                                        <option value="arts">Arts</option>
                                        <option value="science">Science</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Academic Year</label>
                                    <select
                                        name="academicYear"
                                        value={formData.academicYear}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select Academic Year</option>
                                        <option value="1">1st Year</option>
                                        <option value="2">2nd Year</option>
                                        <option value="3">3rd Year</option>
                                        <option value="4">4th Year</option>
                                        <option value="5+">5+ Year</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>GPA</label>
                                    <input
                                        type="text"
                                        name="gpa"
                                        value={formData.gpa}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="e.g. 3.5"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>University Email</label>
                                    <input
                                        type="email"
                                        name="universityEmail"
                                        value={formData.universityEmail}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="e.g. johndoe@uottawa.ca"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="e.g. 416-123-4567"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Country</label>
                                    <input
                                        type="text"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="e.g. Canada"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="e.g. Toronto"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Expected Graduation Date</label>
                                    <input
                                        type="date"
                                        name="expectedGraduationDate"
                                        value={formData.expectedGraduationDate}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="MM/DD/YYYY"
                                    />
                                    <small className="date-format-hint">Format: MM/DD/YYYY</small>
                                </div>

                                <div className="form-group">
                                    <label>Resume</label>
                                    <div className="resume-upload-container">
                                        <input
                                            type="file"
                                            name="resume"
                                            id="resume-upload"
                                            onChange={handleInputChange}
                                            accept=".pdf,.doc,.docx"
                                            className="resume-input"
                                        />
                                        <label htmlFor="resume-upload" className="resume-upload-label">
                                            <span className="material-icons-round upload-icon">cloud_upload</span>
                                            <span className="upload-text">{formData.resume ? formData.resume.name : 'Add Resume'}</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="form-actions">
                                    <button type="submit" className="submit-button">
                                        <span className="material-icons-round">save</span> Save Profile
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default StudentDashboard;









