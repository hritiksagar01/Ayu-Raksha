// src/pages/UploaderPortal/UploaderDashboardPage.jsx

import React from 'react';

const UploaderDashboardPage = ({ onNavigate, translations, selectedLanguage, user }) => {
    const mockRecentUploads = [
        { id: 1, patientId: '9876-5432-1098-7654', docType: 'Blood Report', date: '2025-09-29', status: 'Pending' },
        { id: 2, patientId: '1122-3344-5566-7788', docType: 'MRI Scan', date: '2025-09-29', status: 'Pending' },
        { id: 3, patientId: '1234-5678-9012-3456', docType: 'Prescription', date: '2025-09-28', status: 'Authorized' },
        { id: 4, patientId: '5555-6666-7777-8888', docType: 'X-Ray Scan', date: '2025-09-27', status: 'Authorized' },
    ];

    const StatusBadge = ({ status }) => {
        const isPending = status === 'Pending';
        const text = isPending ? translations.statusPending[selectedLanguage] : translations.statusAuthorized[selectedLanguage];
        const classes = isPending ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800';
        return <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${classes}`}>{text}</span>;
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">{translations.uploaderWelcome[selectedLanguage]} {user.name}!</h1>

            {/* Quick Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">{translations.uploadCardTitle[selectedLanguage]}</h2>
                    <p className="text-gray-600 flex-grow">{translations.uploadCardDesc[selectedLanguage]}</p>
                    <button onClick={() => onNavigate('/uploader/upload')} className="mt-4 w-full sm:w-auto self-start inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                        {translations.uploadCardButton[selectedLanguage]}
                    </button>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">{translations.historyCardTitle[selectedLanguage]}</h2>
                    <p className="text-gray-600 flex-grow">{translations.historyCardDesc[selectedLanguage].replace('{count}', 15)}</p>
                    <button onClick={() => onNavigate('/uploader/history')} className="mt-4 w-full sm:w-auto self-start inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                        {translations.historyCardButton[selectedLanguage]}
                    </button>
                </div>
            </div>

            {/* Recent Uploads Table */}
            <div>
                <h2 className="text-xl font-semibold text-gray-700 mb-4">{translations.recentUploadsTitle[selectedLanguage]}</h2>
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{translations.patientIdHeader[selectedLanguage]}</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{translations.docTypeHeader[selectedLanguage]}</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{translations.uploadDateHeader[selectedLanguage]}</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{translations.statusHeader[selectedLanguage]}</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {mockRecentUploads.map((upload) => (
                                    <tr key={upload.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{upload.patientId}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{upload.docType}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{upload.date}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm"><StatusBadge status={upload.status} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploaderDashboardPage;