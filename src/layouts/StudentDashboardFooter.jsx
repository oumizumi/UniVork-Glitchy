import React, { useState, useEffect } from 'react';
import './StudentDashboardFooter.css';

const StudentDashboardFooter = () => {
    const [isFooterVisible, setFooterVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight;
            const scrollTop = document.documentElement.scrollTop;
            const clientHeight = document.documentElement.clientHeight;

            // Footer visible if user scrolls close to the bottom
            const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
            setFooterVisible(isAtBottom);
        };

        window.addEventListener('scroll', handleScroll);

        // Initial check in case content is short
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={`footer-container ${isFooterVisible ? '' : 'hidden'}`}>
            <p className="footer-text1">© 2024 UniVork</p>
            <p className="footer-text2">All rights reserved.</p>
        </div>
    );
};

export default StudentDashboardFooter;
