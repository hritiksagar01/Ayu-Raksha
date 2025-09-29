// src/pages/UploaderPortal/UploaderHistoryPage.jsx

import React from 'react';

// Mock data for the upload history
const mockUploads = [
    { id: 1, patientName: 'Krishna Kumar', patientId: '1234********5678', reportType: 'reportTypeBlood', uploadDate: '28/09/2025', status: 'completed' },
    { id: 2, patientName: 'Priya Sharma', patientId: '9876********5432', reportType: 'reportTypeXRay', uploadDate: '27/09/2025', status: 'completed' },
    { id: 3, patientName: 'Amit Singh', patientId: '1122********7788', reportType: 'reportTypeMRI', uploadDate: '25/09/2025', status: 'processing' },
    { id: 4, patientName: 'Anjali Menon', patientId: '2233********8899', reportType: 'reportTypePrescription', uploadDate: '24/09/2025', status: 'completed' },
    { id: 5, patientName: 'Rohan Gupta', patientId: '3344********9900', reportType: 'reportTypePathology', uploadDate: '22/09/2025', status: 'error' },
    { id: 6, patientName: 'Meera Iyer', patientId: '4455********0011', reportType: 'reportTypeBlood', uploadDate: '20/09/2025', status: 'completed' },
];

const UploaderHistoryPage = ({ translations, selectedLanguage }) => {
    
    // Helper function to get the color-coded class for each status
    const getStatusClass = (status) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'processing':
                return 'bg-yellow-100 text-yellow-800';
            case 'error':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // Helper function to get the translated status text
    const getStatusText = (status) => {
        const key = `status${status.charAt(0).toUpperCase() + status.slice(1)}`;
        return translations[key]?.[selectedLanguage] || status;
    };

    return (
        <div className="container mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
                {translations.historyPageTitle[selectedLanguage]}
            </h1>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    {/* On large screens, this is a table. On small screens, it's a list of blocks. */}
                    <table className="min-w-full divide-y divide-gray-200">
                        {/* Table Head: Hidden on mobile, visible on medium screens and up */}
                        <thead className="bg-gray-50 hidden md:table-header-group">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{translations.headerPatientName[selectedLanguage]}</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{translations.headerPatientId[selectedLanguage]}</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{translations.headerReportType[selectedLanguage]}</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{translations.headerUploadDate[selectedLanguage]}</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{translations.headerStatus[selectedLanguage]}</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{translations.headerAction[selectedLanguage]}</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {mockUploads.map((upload) => (
                                <tr key={upload.id} className="block md:table-row border-b md:border-none p-4 md:p-0">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 block md:table-cell" data-label={translations.headerPatientName[selectedLanguage]}>{upload.patientName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 block md:table-cell" data-label={translations.headerPatientId[selectedLanguage]}>{upload.patientId}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 block md:table-cell" data-label={translations.headerReportType[selectedLanguage]}>{translations[upload.reportType][selectedLanguage]}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 block md:table-cell" data-label={translations.headerUploadDate[selectedLanguage]}>{upload.uploadDate}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm block md:table-cell" data-label={translations.headerStatus[selectedLanguage]}>
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(upload.status)}`}>
                                            {getStatusText(upload.status)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium block md:table-cell" data-label={translations.headerAction[selectedLanguage]}>
                                        <button className="text-teal-600 hover:text-teal-900">{translations.actionViewMeta[selectedLanguage]}</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UploaderHistoryPage;