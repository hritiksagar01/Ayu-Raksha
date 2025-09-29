import React, { useState } from 'react';
import PlaceholderPage from '../../../components/common/PlaceholderPage';
import AlertTriangleIcon from '../../../components/icons/AlertTriangleIcon';
import OverviewTab from './OverviewTab';
import RiskAssessmentTab from './RiskAssessmentTab';

const DoctorPatientRecordPage = ({ patientId, onNavigate, onAuthorize, translations, selectedLanguage }) => {
    const mockPatientData = {
        'mock-patient-id-1': {
            name: 'Krishna Kumar',
            id: '1234-5678-9012-3456',
            demographics: { age: 32, sex: 'Male', bloodGroup: 'O+', address: 'Varanasi, Uttar Pradesh (Previous), now in Kochi, Kerala' },
            vitals: { bp: '120/80 mmHg', hr: '72 bpm', temp: '98.6°F' },
            allergies: ['Pollen', 'Dust Mites'],
            medications: ['Loratadine (as needed)'],
            conditions: ['Seasonal Allergies']
        }
    };

    const patient = mockPatientData[patientId];
    const [activeTab, setActiveTab] = useState('overview');

    const tabs = [
        { id: 'overview', label: translations.tabOverview[selectedLanguage] },
        { id: 'timeline', label: translations.navTimeline[selectedLanguage] },
        { id: 'reports', label: translations.tabReports[selectedLanguage] },
        { id: 'prescriptions', label: translations.tabPrescriptions[selectedLanguage] },
        { id: 'notes', label: translations.tabConsultations[selectedLanguage] },
        { id: 'risk', label: translations.tabRisk[selectedLanguage] },
    ];

    if (!patient) return <PlaceholderPage title="Patient Not Found" />;

    const renderTabContent = () => {
        switch (activeTab) {
            case 'overview': return <OverviewTab patient={patient} translations={translations} selectedLanguage={selectedLanguage} />;
            case 'risk': return <RiskAssessmentTab onAuthorize={onAuthorize} translations={translations} selectedLanguage={selectedLanguage} />;
            default: return <div className="p-6 bg-white rounded-b-lg shadow-md"><PlaceholderPage title={tabs.find(t => t.id === activeTab).label} /></div>;
        }
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{patient.name}</h1>
                    <p className="text-sm text-gray-500">Ayu-Raksha ID: {patient.id}</p>
                </div>
                <button className="hidden sm:inline-flex items-center px-4 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-red-50 hover:bg-red-100">
                    <AlertTriangleIcon className="h-5 w-5 mr-2" />
                    {translations.emergencyAccess[selectedLanguage]}
                </button>
            </div>

            <div>
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-4 overflow-x-auto" aria-label="Tabs">
                        {tabs.map(tab => (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm focus:outline-none ${activeTab === tab.id ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>
                <div className="mt-2">{renderTabContent()}</div>
            </div>
        </div>
    );
};

export default DoctorPatientRecordPage;