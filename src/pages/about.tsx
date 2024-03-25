import React, { useEffect, useState } from 'react';

// Define the About component with dark mode support
const About = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkMode(darkModeMediaQuery.matches);

        const darkModeChangeListener = (event:any) => {
            setIsDarkMode(event.matches);
        };

        darkModeMediaQuery.addEventListener('change', darkModeChangeListener);

        return () => {
            darkModeMediaQuery.removeEventListener('change', darkModeChangeListener);
        };
    }, []);

    const containerStyle = {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        color: isDarkMode ? 'white' : '#555', // White text in dark mode, gray text otherwise
    };

    const titleStyle = {
        fontSize: '2em',
        marginBottom: '10px',
    };

    const paragraphStyle = {
        fontSize: '1.2em',
        lineHeight: '1.5',
        marginBottom: '20px',
    };

    return (
        <div style={containerStyle}>
            <h1 style={{ ...titleStyle, color: isDarkMode ? 'white' : '#333' }}>Why Use This Tool?</h1>
            <p style={{ ...paragraphStyle, color: isDarkMode ? 'white' : '#555' }}>
                This tool can aid school districts in interpreting and visualizing the benefits of investing in electric school buses. Not only can electric school buses provide kids with safer, more enjoyable rides to school, but they can also help school districts save money on fuel for their buses.
            </p>
            <p style={{ ...paragraphStyle, color: isDarkMode ? 'white' : '#555' }}>
                Annual electricity costs to charge an electric school bus can be much cheaper than fueling a diesel bus. However, there are many factors that may increase or decrease the electricity bill for charging electric school buses, such as charging infrastructure, time of use, bus charge capacity, bus range, and bus route length.
            </p>
            <p style={{ ...paragraphStyle, color: isDarkMode ? 'white' : '#555' }}>
                This tool can be used to help school districts optimize electric school bus use by finding the best ways for them to save up to thousands of dollars on their school buses annually while ensuring these buses can fulfill their daily tasks.
            </p>
        </div>
    );
};

export default About;

