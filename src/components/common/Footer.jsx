import React from 'react';

const Footer = ({ translations, selectedLanguage }) => {
    return (
        <footer className="bg-white border-t border-gray-200 p-4 z-40">
            <div className="container mx-auto text-center text-gray-600 text-sm">
                <p className="mb-2 sm:mb-0 sm:inline">{translations.copyright[selectedLanguage]}</p>
                <div className="inline-block sm:ml-4 mt-2 sm:mt-0">
                    <a href="#" className="hover:text-teal-600 transition-colors duration-200">{translations.privacyPolicy[selectedLanguage]}</a>
                    <span className="mx-2 text-gray-400">|</span>
                    <a href="#" className="hover:text-teal-600 transition-colors duration-200">{translations.termsOfService[selectedLanguage]}</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;