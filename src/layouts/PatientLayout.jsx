import React from 'react';
import DashboardIcon from '../components/icons/DashboardIcon';
import TimelineIcon from '../components/icons/TimelineIcon';
import ChatbotIcon from '../components/icons/ChatbotIcon';
import SearchDoctorIcon from '../components/icons/SearchDoctorIcon';
import AlertsIcon from '../components/icons/AlertsIcon';

import PatientReportDetailPage from '../pages/PatientPortal/PatientReportDetailPage';
import PatientDoctorProfilePage from '../pages/PatientPortal/PatientDoctorProfilePage';
import PatientDashboardPage from '../pages/PatientPortal/PatientDashboardPage';
import PatientHealthTimelinePage from '../pages/PatientPortal/PatientHealthTimelinePage';
import PatientChatbotPage from '../pages/PatientPortal/PatientChatbotPage';
import PatientFindDoctorsPage from '../pages/PatientPortal/PatientFindDoctorsPage';
import PatientAlertsPage from '../pages/PatientPortal/PatientAlertsPage';
import { allMockRecords, allMockDoctors, mockAlerts } from '../constants/mockData';

const PatientLayout = ({ onNavigate, currentPage, translations, selectedLanguage }) => {
    const navItems = [
        { page: '/patient/dashboard', label: translations.navDashboard[selectedLanguage], icon: <DashboardIcon /> },
        { page: '/patient/timeline', label: translations.navTimeline[selectedLanguage], icon: <TimelineIcon /> },
        { page: '/patient/chatbot', label: translations.navChatbot[selectedLanguage], icon: <ChatbotIcon /> },
        { page: '/patient/search-doctors', label: translations.navFindDoctors[selectedLanguage], icon: <SearchDoctorIcon /> },
        { page: '/patient/alerts', label: translations.navAlerts[selectedLanguage], icon: <AlertsIcon /> },
    ];

    const renderContent = () => {
        if (/^\/patient\/reports\//.test(currentPage)) {
            return <PatientReportDetailPage currentPage={currentPage} allMockRecords={allMockRecords} translations={translations} selectedLanguage={selectedLanguage} />;
        }
        if (/^\/patient\/doctors\//.test(currentPage)) {
            return <PatientDoctorProfilePage currentPage={currentPage} allMockDoctors={allMockDoctors} translations={translations} selectedLanguage={selectedLanguage} />;
        }

        switch (currentPage) {
            case '/patient/dashboard': return <PatientDashboardPage onNavigate={onNavigate} translations={translations} selectedLanguage={selectedLanguage} />;
            case '/patient/timeline': return <PatientHealthTimelinePage onNavigate={onNavigate} translations={translations} selectedLanguage={selectedLanguage} allMockRecords={allMockRecords} />;
            case '/patient/chatbot': return <PatientChatbotPage translations={translations} selectedLanguage={selectedLanguage} />;
            case '/patient/search-doctors': return <PatientFindDoctorsPage onNavigate={onNavigate} translations={translations} selectedLanguage={selectedLanguage} allMockDoctors={allMockDoctors} />;
            case '/patient/alerts': return <PatientAlertsPage translations={translations} selectedLanguage={selectedLanguage} mockAlerts={mockAlerts} />;
            default: return <PatientDashboardPage onNavigate={onNavigate} translations={translations} selectedLanguage={selectedLanguage} />;
        }
    };

    return (
        <div className="flex h-full">
            <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
                <nav className="flex-1 px-2 py-4 space-y-1">
                    {navItems.map(item => (
                        <a key={item.page} href="#" onClick={(e) => { e.preventDefault(); onNavigate(item.page); }} className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${currentPage.startsWith(item.page) ? 'bg-teal-100 text-teal-700' : 'text-gray-600 hover:bg-gray-100'}`}>
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
                    <a key={item.page} href="#" onClick={(e) => { e.preventDefault(); onNavigate(item.page); }} className={`flex flex-col items-center justify-center p-2 w-full transition-colors duration-150 ${currentPage.startsWith(item.page) ? 'text-teal-600' : 'text-gray-500 hover:text-teal-600'}`}>
                        {React.cloneElement(item.icon, { className: "h-6 w-6 mb-1" })}
                        <span className="text-xs text-center">{item.label.split(' ')[0]}</span>
                    </a>
                ))}
            </nav>
        </div>
    );
};

export default PatientLayout;