import React, { useState, useEffect } from 'react';

// In src/App.jsx

import Header from './components/common/Header.jsx';
import Footer from './components/common/Footer.jsx';
import LoadingSpinner from './components/common/LoadingSpinner.jsx';
import PatientLayout from './layouts/PatientLayout.jsx';
import DoctorLayout from './layouts/DoctorLayout.jsx';
import EntryPage from './pages/Auth/EntryPage.jsx';
import UploaderLoginPage from './pages/Auth/UploaderLoginPage.jsx';
import PatientLoginPage from './pages/Auth/PatientLoginPage.jsx';
import DoctorLoginPage from './pages/Auth/DoctorLoginPage.jsx';
import UploaderDashboardPage from './pages/UploaderPortal/UploaderDashboardPage.jsx';
import UploaderLayout from './layouts/UploaderLayout.jsx';
// Constants
import { translations } from './constants/translations';

export default function App() {
    const [initialLoading, setInitialLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('English');
    const [currentPage, setCurrentPage] = useState('/');
    const [loggedInUser, setLoggedInUser] = useState(null);

    // New state for OS and screen size
    const [osType, setOsType] = useState('unknown');
    const [screenSize, setScreenSize] = useState(window.innerWidth);

    useEffect(() => {
        // Detect OS type
        const userAgent = window.navigator.userAgent || window.navigator.vendor || window.opera;
        if (/android/i.test(userAgent)) {
            setOsType('android');
        } else if (/windows/i.test(userAgent)) {
            setOsType('windows');
        } else {
            setOsType('other');
        }

        // Handle screen resize
        const handleResize = () => {
            setScreenSize(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);

        const timer = setTimeout(() => setInitialLoading(false), 2000);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleLanguageChange = (langKey) => setSelectedLanguage(langKey);

    const handleLoginSuccess = (userType) => {
        let user;
        let landingPage;
        setIsProcessing(true);

        if (userType === 'patient') {
            user = { name: 'Hritik Sagar Srivastava', type: 'patient' };
            landingPage = '/patient/dashboard';
        } else if (userType === 'doctor') {
            user = { name: 'Anil Verma', type: 'doctor' };
            landingPage = '/doctor/dashboard';
        } else if (userType === 'uploader') {
            user = { name: 'Lab Tech', type: 'uploader' };
            landingPage = '/uploader/dashboard';
        }

        setTimeout(() => {
            setIsProcessing(false);
            setLoggedInUser(user);
            setCurrentPage(landingPage);
        }, 2500);
    };

    const handleLogout = () => {
        setLoggedInUser(null);
        setCurrentPage('/');
    };

    const handleNavigation = (page) => {
        setCurrentPage(page);
    };

    const handlePatientSearch = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setCurrentPage('/doctor/patients/mock-patient-id-1');
        }, 1500);
    };

    const handleAuthorize = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
        }, 2500);
    };
 const handleGeneratePrescription = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            // Navigate back to the patient record after 'generating'
            // In a real app, you'd get the patient ID from state
            setCurrentPage('/doctor/patients/mock-patient-id-1'); 
        }, 2500);
    };

    const renderPage = () => {
        if (loggedInUser) {
            if (loggedInUser.type === 'patient') {
                return <PatientLayout
                    onNavigate={handleNavigation}
                    currentPage={currentPage}
                    translations={translations}
                    selectedLanguage={selectedLanguage}
                    osType={osType}
                    screenSize={screenSize}
                />;
            }
            if (loggedInUser.type === 'doctor') {
                return <DoctorLayout
                    onNavigate={handleNavigation}
                    onPatientSearch={handlePatientSearch}
                    onAuthorize={handleAuthorize}
                    onGeneratePrescription={handleGeneratePrescription}
                    currentPage={currentPage}
                    translations={translations}
                    selectedLanguage={selectedLanguage}
                    user={loggedInUser}
                    osType={osType}
                    screenSize={screenSize}
                />;
            }
            if (loggedInUser.type === 'uploader') {
                return <UploaderLayout
                    onNavigate={handleNavigation}
                    currentPage={currentPage}
                    translations={translations}
                    selectedLanguage={selectedLanguage}
                    user={loggedInUser}
                    osType={osType}
                    screenSize={screenSize}
                />;
            }
        }

        switch (currentPage) {
            case '/':
                return <EntryPage
                    onNavigate={setCurrentPage}
                    translations={translations}
                    selectedLanguage={selectedLanguage}
                    osType={osType}
                    screenSize={screenSize}
                />;
            case '/uploader-login':
                return <UploaderLoginPage
                    onLoginSuccess={() => handleLoginSuccess('uploader')}
                    translations={translations}
                    selectedLanguage={selectedLanguage}
                    osType={osType}
                    screenSize={screenSize}
                />;
            case '/patient-login':
                return <PatientLoginPage
                    onLoginSuccess={() => handleLoginSuccess('patient')}
                    translations={translations}
                    selectedLanguage={selectedLanguage}
                    osType={osType}
                    screenSize={screenSize}
                />;
            case '/doctor-login':
                return <DoctorLoginPage
                    onLoginSuccess={() => handleLoginSuccess('doctor')}
                    translations={translations}
                    selectedLanguage={selectedLanguage}
                    osType={osType}
                    screenSize={screenSize}
                />;
            default:
                return <EntryPage
                    onNavigate={setCurrentPage}
                    translations={translations}
                    selectedLanguage={selectedLanguage}
                    osType={osType}
                    screenSize={screenSize}
                />;
        }
    };

    let loadingText = translations.processingText[selectedLanguage];
    if (currentPage.includes('search')) loadingText = translations.searchingText[selectedLanguage];
    if (currentPage.includes('/doctor/patients/')) loadingText = translations.authorizingText[selectedLanguage];

    return (
        <div className="bg-gray-100 h-screen font-sans flex flex-col">
            {initialLoading && <LoadingSpinner isOverlay={true} text={translations.loadingText[selectedLanguage]} />}
            {isProcessing && <LoadingSpinner isOverlay={true} text={loadingText} />}

            <Header
                selectedLanguage={selectedLanguage}
                onLanguageChange={handleLanguageChange}
                user={loggedInUser}
                onLogout={handleLogout}
                translations={translations}
            />

            <main className="flex-grow pt-16">
                {!initialLoading && renderPage()}
            </main>

            {!initialLoading && !loggedInUser && <Footer translations={translations} selectedLanguage={selectedLanguage} />}
        </div>
    );
}