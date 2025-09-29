import React from 'react';

const DoctorDashboardPage = ({ onNavigate, translations, selectedLanguage, user }) => {
    const recentPatients = [
        { id: 'mock-patient-id-1', name: 'Krishna Kumar', ayuId: '1234-5678-9012-3456' },
        { id: 'mock-patient-id-2', name: 'Sunita Sharma', ayuId: '9876-5432-1098-7654' },
        { id: 'mock-patient-id-3', name: 'Rohan Gupta', ayuId: '1122-3344-5566-7788' },
    ];

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">{translations.welcomeDoctor[selectedLanguage]} {user.name}!</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Find Patient Card */}
                <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">{translations.findPatientCardTitle[selectedLanguage]}</h2>
                    <p className="text-gray-600 flex-grow">{translations.findPatientCardContent[selectedLanguage]}</p>
                    <button onClick={() => onNavigate('/doctor/patient-search')} className="mt-4 w-full sm:w-auto self-start inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                        {translations.findPatientCardButton[selectedLanguage]}
                    </button>
                </div>

                {/* Recent Patients Card */}
                <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-2">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">{translations.recentPatientsCardTitle[selectedLanguage]}</h2>
                    <div className="space-y-3">
                        {recentPatients.map(patient => (
                            <a href="#" key={patient.id} onClick={(e) => { e.preventDefault(); onNavigate(`/doctor/patients/${patient.id}`) }} className="block p-3 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors duration-150">
                                <p className="font-semibold text-gray-800">{patient.name}</p>
                                <p className="text-sm text-gray-500">ID: {patient.ayuId}</p>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Pending Actions Card */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">{translations.pendingActionsCardTitle[selectedLanguage]}</h2>
                    <p className="text-2xl font-bold text-indigo-600">{translations.pendingActionsCardContent[selectedLanguage]}</p>
                    <button onClick={() => onNavigate('/doctor/authorizations')} className="mt-4 w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                        {translations.viewButton[selectedLanguage]}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DoctorDashboardPage;