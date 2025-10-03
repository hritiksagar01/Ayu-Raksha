import React from 'react';
import UserIcon from '../../components/icons/UserIcon';
import BriefcaseIcon from '../../components/icons/BriefcaseIcon';
import UploadIcon from '../../components/icons/UploadIcon';

const EntryPage = ({ onNavigate, translations, selectedLanguage }) => {
    return (
 <div className="w-full min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-10">
  <div className="w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-3xl xl:max-w-5xl p-8 space-y-8 bg-white rounded-xl shadow-lg text-center">
                <div className="mb-6"><img src="https://placehold.co/600x300/14b8a6/FFFFFF?text=Ayu-Raksha+Health" alt="Integrated Health" className="rounded-lg mx-auto" /></div>
                <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">{translations.entryTitle[selectedLanguage]}</h1>
                <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">{translations.entrySlogan[selectedLanguage]}</p>
                <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button onClick={() => onNavigate('/patient-login')} className="w-full flex items-center justify-center py-4 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-transform transform hover:scale-105"><UserIcon className="h-6 w-6 mr-2" />{translations.entryPatientButton[selectedLanguage]}</button>
                    <button onClick={() => onNavigate('/doctor-login')} className="w-full flex items-center justify-center py-4 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105"><BriefcaseIcon className="h-6 w-6 mr-2" />{translations.entryDoctorButton[selectedLanguage]}</button>
                    <button onClick={() => onNavigate('/uploader-login')} className="w-full flex items-center justify-center py-4 px-4 border border-gray-300 text-lg font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-transform transform hover:scale-105"><UploadIcon className="h-6 w-6 mr-2" />{translations.entryUploaderButton[selectedLanguage]}</button>
                </div>
                <div className="mt-8 pt-6 border-t border-gray-200"><a href="#" className="font-medium text-teal-600 hover:text-teal-500 mx-4">{translations.abxfvdsfsdfsdfdsfdsoutUsLink[selectedLanguage]}</a><a href="#" className="font-medium text-teal-600 hover:text-teal-500 mx-4">{translations.contactUsLink[selectedLanguage]}</a></div>
            </div>
        </div>
    );
};

export default EntryPage;