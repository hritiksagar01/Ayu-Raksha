// src/layouts/UploaderLayout.jsx

import React from 'react';
import DashboardIcon from '../components/icons/DashboardIcon';
import UploadIcon from '../components/icons/UploadIcon';
import TimelineIcon from '../components/icons/TimelineIcon';
import UploaderDashboardPage from '../pages/UploaderPortal/UploaderDashboardPage';
import UploaderUploadPage from '../pages/UploaderPortal/UploaderUploadPage';

// --- IMPORT THE NEW HISTORY PAGE ---
import UploaderHistoryPage from '../pages/UploaderPortal/UploaderHistoryPage';


const UploaderLayout = ({ onNavigate, currentPage, translations, selectedLanguage, user }) => {
    const navItems = [
        { page: '/uploader/dashboard', label: translations.navDashboard[selectedLanguage], icon: <DashboardIcon /> },
        { page: '/uploader/upload', label: translations.navUploadNew[selectedLanguage], icon: <UploadIcon /> },
        { page: '/uploader/history', label: translations.navHistory[selectedLanguage], icon: <TimelineIcon /> },
    ];

    const renderContent = () => {
        switch (currentPage) {
            case '/uploader/dashboard':
                return <UploaderDashboardPage onNavigate={onNavigate} translations={translations} selectedLanguage={selectedLanguage} user={user} />;
            
            case '/uploader/upload':
                return <UploaderUploadPage onNavigate={onNavigate} translations={translations} selectedLanguage={selectedLanguage} user={user} />;
            
            // --- UPDATED THIS CASE ---
            case '/uploader/history':
                return <UploaderHistoryPage translations={translations} selectedLanguage={selectedLanguage} />;
            
            default:
                return <UploaderDashboardPage onNavigate={onNavigate} translations={translations} selectedLanguage={selectedLanguage} user={user} />;
        }
    };

    return (
        <div className="flex h-full">
            <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
                <nav className="flex-1 px-2 py-4 space-y-1">
                    {navItems.map(item => (
                        <a key={item.page} href="#" onClick={(e) => { e.preventDefault(); onNavigate(item.page); }} className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${currentPage.startsWith(item.page) ? 'bg-gray-200 text-gray-800' : 'text-gray-600 hover:bg-gray-100'}`}>
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
                    <a key={item.page} href="#" onClick={(e) => { e.preventDefault(); onNavigate(item.page); }} className={`flex flex-col items-center justify-center p-2 w-full transition-colors duration-150 ${currentPage.startsWith(item.page) ? 'text-gray-700' : 'text-gray-500 hover:text-gray-700'}`}>
                        {React.cloneElement(item.icon, { className: "h-6 w-6 mb-1" })}
                        <span className="text-xs text-center">{item.label}</span>
                    </a>
                ))}
            </nav>
        </div>
    );
};

export default UploaderLayout;