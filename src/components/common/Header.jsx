import React, { useState, useEffect, useRef } from 'react';
import LogoutIcon from '../icons/LogoutIcon';

const Header = ({ selectedLanguage, onLanguageChange, user, onLogout, translations }) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const languages = { 'English': 'English', 'हिंदी': 'हिंदी (Hindi)', 'മലയാളം': 'മലയാളം (Malayalam)' };
    const displayNames = { 'English': 'English', 'हिंदी': 'Hindi', 'മലയാളം': 'Malayalam' };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setDropdownOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLanguageChange = (langKey) => {
        onLanguageChange(langKey);
        setDropdownOpen(false);
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0 bg-teal-500 rounded-full h-8 w-8 flex items-center justify-center">
                            <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <span className="text-xl font-bold text-gray-800 tracking-tight">Ayu-Raksha</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="relative" ref={dropdownRef}>
                            <button onClick={() => setDropdownOpen(!isDropdownOpen)} type="button" className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-150" id="language-menu" aria-haspopup="true" aria-expanded={isDropdownOpen}>
                                <svg className="w-5 h-5 mr-2 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m0 18a9 9 0 009-9m-9 9a9 9 0 00-9-9" /></svg>
                                <span className="hidden sm:inline">{languages[selectedLanguage]}</span>
                                <span className="inline sm:hidden">{displayNames[selectedLanguage]}</span>
                                <svg className="w-5 h-5 ml-2 -mr-1 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                            </button>
                            {isDropdownOpen && (
                                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="language-menu">
                                    <div className="py-1" role="none">
                                        {Object.entries(languages).map(([key, value]) => (
                                            <a key={key} href="#" onClick={(e) => { e.preventDefault(); handleLanguageChange(key); }} className={`block px-4 py-2 text-sm ${selectedLanguage === key ? 'font-semibold text-teal-600 bg-teal-50' : 'text-gray-700'} hover:bg-gray-100 hover:text-gray-900`} role="menuitem">{value}</a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        {user && (
                            <div className="flex items-center space-x-3">
                                <span className="hidden sm:inline text-sm font-medium text-gray-700">{(user.type === 'doctor' ? translations.welcomeDoctor[selectedLanguage] : translations.welcomePatient[selectedLanguage])} {user.name}</span>
                                <button onClick={onLogout} className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                    <LogoutIcon className="h-6 w-6" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;