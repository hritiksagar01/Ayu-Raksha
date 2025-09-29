import React, { useState } from 'react';
import { callGeminiAPI } from '../../api/geminiAPI';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import SparklesIcon from '../../components/icons/SparklesIcon';
import DownloadIcon from '../../components/icons/DownloadIcon';

const PatientReportDetailPage = ({ currentPage, allMockRecords, translations, selectedLanguage }) => {
    const reportId = currentPage.split('/').pop();
    const report = allMockRecords.find(r => r.id === reportId);
    const [aiSummary, setAiSummary] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const recordTypes = {
        'Prescription': translations.filterTypePrescription[selectedLanguage],
        'Blood Report': translations.filterTypeBloodReport[selectedLanguage],
        'Scan': translations.filterTypeScan[selectedLanguage],
        'Consultation': translations.filterTypeConsultation[selectedLanguage],
    };

    const handleGenerateSummary = async () => {
        setIsGenerating(true);
        setAiSummary('');
        const prompt = `Take the following medical report findings and explain them in simple, easy-to-understand language for a patient. Do not give medical advice. Explain what the terms mean and the overall result in a reassuring tone. Keep it under 60 words. The response should be in ${selectedLanguage}. Findings: "${report.findings}"`;
        const response = await callGeminiAPI(prompt);
        setAiSummary(response);
        setIsGenerating(false);
    };

    if (!report) { return (<div className="p-8 text-center"><h1 className="text-2xl font-bold text-red-600">{translations.reportNotFound[selectedLanguage]}</h1></div>); }

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">{translations.reportDetailTitle[selectedLanguage]}</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-6 pb-6 border-b border-gray-200"> <div><p className="text-sm text-gray-500">{translations.reportTypeLabel[selectedLanguage]}</p><p className="font-semibold text-gray-800">{recordTypes[report.type]}</p></div> <div><p className="text-sm text-gray-500">{translations.reportDateLabel[selectedLanguage]}</p><p className="font-semibold text-gray-800">{new Date(report.date).toLocaleDateString()}</p></div> <div><p className="text-sm text-gray-500">{translations.reportDoctorLabel[selectedLanguage]}</p><p className="font-semibold text-gray-800">{report.doctor}</p></div> <div><p className="text-sm text-gray-500">{translations.reportClinicLabel[selectedLanguage]}</p><p className="font-semibold text-gray-800">{report.clinic}</p></div> </div>
                <div className="mb-6"> <h2 className="text-xl font-semibold text-gray-700 mb-2">{translations.keyFindingsHeading[selectedLanguage]}</h2> <p className="text-gray-600 bg-gray-50 p-4 rounded-md">{report.findings}</p> </div>
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-lg font-semibold text-indigo-700 flex items-center">
                            <SparklesIcon className="h-5 w-5 mr-2 text-indigo-500" /> {translations.aiSummaryHeading[selectedLanguage]}
                        </h2>
                        {!aiSummary && !isGenerating && (
                            <button onClick={handleGenerateSummary} className="px-3 py-1 text-sm font-medium text-indigo-700 bg-indigo-100 rounded-md hover:bg-indigo-200 transition-colors">
                                {translations.generateSummaryBtn[selectedLanguage]}
                            </button>
                        )}
                    </div>
                    <div className="min-h-[80px] text-indigo-800 bg-indigo-50 p-4 rounded-md border-l-4 border-indigo-400">
                        {isGenerating && <LoadingSpinner text={translations.generatingText[selectedLanguage]} />}
                        {!isGenerating && aiSummary && <p>{aiSummary}</p>}
                    </div>
                </div>
                <div className="mb-6"> <div className="w-full h-96 bg-gray-200 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center"> <p className="text-gray-500 font-semibold">{translations.viewerPlaceholder[selectedLanguage]}</p> </div> </div>
                <div className="text-center"> <button className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700"> <DownloadIcon className="h-5 w-5 mr-2" /> {translations.downloadButton[selectedLanguage]} </button> </div>
            </div>
        </div>
    );
};

export default PatientReportDetailPage;