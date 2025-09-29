import React from 'react';

const PatientDashboardPage = ({ onNavigate, translations, selectedLanguage }) => {
    const patientName = "Krishna Kumar";
    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">{translations.welcomePatient[selectedLanguage]} {patientName}!</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md col-span-1 lg:col-span-2">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">{translations.latestUpdateTitle[selectedLanguage]}</h2>
                    <div className="bg-gray-50 p-4 rounded-md">
                        <p className="text-gray-800">{translations.latestUpdateContent[selectedLanguage]}</p>
                    </div>
                    <button onClick={() => onNavigate('/patient/reports/mock-id-1')} className="mt-4 w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700">
                        {translations.viewDetailsButton[selectedLanguage]}
                    </button>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">{translations.alertsTitle[selectedLanguage]}</h2>
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                        <p className="text-red-800">{translations.alertsContent[selectedLanguage]}</p>
                    </div>
                    <button onClick={() => onNavigate('/patient/alerts')} className="mt-4 w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700">
                        {translations.viewAlertsButton[selectedLanguage]}
                    </button>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md col-span-1 lg:col-span-3">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">{translations.aiAssistantTitle[selectedLanguage]}</h2>
                    <p className="text-gray-600 mb-4">{translations.aiAssistantContent[selectedLanguage]}</p>
                    <button onClick={() => onNavigate('/patient/chatbot')} className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                        {translations.startChatButton[selectedLanguage]}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PatientDashboardPage;