// src/layouts/DoctorLayout.jsx

import React from 'react';
import DashboardIcon from '../components/icons/DashboardIcon';
import SearchIcon from '../components/icons/SearchIcon';
import UserCircleIcon from '../components/icons/UserCircleIcon';
import DoctorDashboardPage from '../pages/DoctorPortal/DoctorDashboardPage';
import DoctorPatientSearchPage from '../pages/DoctorPortal/DoctorPatientSearchPage';
import DoctorPatientRecordPage from '../pages/DoctorPortal/DoctorPatientRecordPage/DoctorPatientRecordPage';
import PlaceholderPage from '../components/common/PlaceholderPage';
import PrescribePage from '../pages/DoctorPortal/PrescribePage';
import DoctorProfilePage from '../pages/DoctorPortal/DoctorProfilePage';

const DoctorLayout = ({ onNavigate, onPatientSearch, onAuthorize, onGeneratePrescription, currentPage, translations, selectedLanguage, user }) => {
    const navItems = [
        { page: '/doctor/dashboard', label: translations.navDashboard[selectedLanguage], icon: <DashboardIcon /> },
        { page: '/doctor/patient-search', label: translations.navPatientSearch[selectedLanguage], icon: <SearchIcon /> },
        { page: '/doctor/profile', label: translations.navMyProfile[selectedLanguage], icon: <UserCircleIcon /> },
    ];

    // MOCK DATA - In a real app, this would be fetched based on patientId
    const mockPatientData = {
        'mock-patient-id-1': { name: 'Krishna Kumar' },
        'mock-patient-id-2': { name: 'Sunita Sharma' },
        'mock-patient-id-3': { name: 'Rohan Gupta' },
    };

    const renderContent = () => {
        const patientRecordRegex = /^\/doctor\/patients\/(mock-patient-id-\d+)$/;
        const prescribeRegex = /^\/doctor\/patients\/(mock-patient-id-\d+)\/prescribe/;

        if (prescribeRegex.test(currentPage)) {
            const patientId = currentPage.match(prescribeRegex)[1];
            const patient = mockPatientData[patientId];
            return <PrescribePage
                patient={patient}
                onGenerate={onGeneratePrescription}
                onCancel={() => onNavigate(`/doctor/patients/${patientId}`)}
                translations={translations}
                selectedLanguage={selectedLanguage}
            />;
        }

        if (patientRecordRegex.test(currentPage)) {
            const patientId = currentPage.match(patientRecordRegex)[1];
            return <DoctorPatientRecordPage patientId={patientId} onNavigate={onNavigate} onAuthorize={onAuthorize} translations={translations} selectedLanguage={selectedLanguage} />;
        }
        
        if (currentPage === '/doctor/authorizations') {
            return <PlaceholderPage title="Authorization Queue" />;
        }

        switch (currentPage) {
            case '/doctor/dashboard':
                return <DoctorDashboardPage onNavigate={onNavigate} translations={translations} selectedLanguage={selectedLanguage} user={user} />;
            case '/doctor/patient-search':
                return <DoctorPatientSearchPage onSearch={onPatientSearch} translations={translations} selectedLanguage={selectedLanguage} />;
            case '/doctor/profile':
                return <DoctorProfilePage user={user} translations={translations} selectedLanguage={selectedLanguage} />;
            default:
                return <DoctorDashboardPage onNavigate={onNavigate} translations={translations} selectedLanguage={selectedLanguage} user={user} />;
        }
    };

    return (
        <div className="flex h-full">
            <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
                <nav className="flex-1 px-2 py-4 space-y-1">
                    {navItems.map(item => (
                        <a key={item.page} href="#" onClick={(e) => { e.preventDefault(); onNavigate(item.page); }} className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${currentPage.startsWith(item.page) ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}>
                            {React.cloneElement(item.icon, { className: "h-6 w-6 mr-3" })}
                            <span>{item.label}</span>
                        </a>
                    ))}
                </nav>
            </aside>
            <div className="flex-1 overflow-y-auto pb-20 md:pb-0">
                {renderContent()}
            </div>
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around">
                {navItems.map(item => (
                    <a key={item.page} href="#" onClick={(e) => { e.preventDefault(); onNavigate(item.page); }} className={`flex flex-col items-center justify-center p-2 w-full transition-colors duration-150 ${currentPage.startsWith(item.page) ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-600'}`}>
                        {React.cloneElement(item.icon, { className: "h-6 w-6 mb-1" })}
                        <span className="text-xs text-center">{item.label}</span>
                    </a>
                ))}
            </nav>
        </div>
    );
};

export default DoctorLayout;