import React, { useState } from 'react';
import SparklesIcon from '../../../components/icons/SparklesIcon';

const RiskAssessmentTab = ({ onAuthorize, translations, selectedLanguage }) => {
    const [recommendations, setRecommendations] = useState({ rdt: true, bloodPanel: false, pft: true });

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setRecommendations(prev => ({ ...prev, [name]: checked }));
    };

    return (
        <div className="bg-white p-6 rounded-b-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center"><SparklesIcon className="h-6 w-6 mr-2 text-indigo-500" />{translations.aiInsights[selectedLanguage]}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Location Risks */}
                <div className="lg:col-span-1 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700">{translations.locationRisks[selectedLanguage]}</h3>
                    <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-md">
                        <p className="font-bold text-red-800">High Malaria Risk</p>
                        <p className="text-sm text-red-700">Patient's previous state: Bihar.</p>
                    </div>
                    <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-md">
                        <p className="font-bold text-yellow-800">Increased Respiratory Issues</p>
                        <p className="text-sm text-yellow-700">New urban environment in Kochi.</p>
                    </div>
                </div>
                {/* Screening Recommendations */}
                <div className="lg:col-span-1">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">{translations.screeningRecs[selectedLanguage]}</h3>
                    <div className="space-y-3">
                        <label className="flex items-start p-3 bg-gray-50 rounded-md hover:bg-gray-100 cursor-pointer">
                            <input type="checkbox" name="rdt" checked={recommendations.rdt} onChange={handleCheckboxChange} className="mt-1 h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
                            <span className="ml-3 text-sm text-gray-800">Suggest Malaria Rapid Diagnostic Test (RDT) due to recent travel.</span>
                        </label>
                        <label className="flex items-start p-3 bg-gray-50 rounded-md hover:bg-gray-100 cursor-pointer">
                            <input type="checkbox" name="pft" checked={recommendations.pft} onChange={handleCheckboxChange} className="mt-1 h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
                            <span className="ml-3 text-sm text-gray-800">Consider pulmonary function tests (PFTs) for new environmental exposure.</span>
                        </label>
                        <label className="flex items-start p-3 bg-gray-50 rounded-md hover:bg-gray-100 cursor-pointer">
                            <input type="checkbox" name="bloodPanel" checked={recommendations.bloodPanel} onChange={handleCheckboxChange} className="mt-1 h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
                            <span className="ml-3 text-sm text-gray-800">Recommend a full blood panel for baseline health check.</span>
                        </label>
                    </div>
                </div>
                {/* Adaptation Guidance */}
                <div className="lg:col-span-1">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">{translations.adaptationGuidance[selectedLanguage]}</h3>
                    <div className="space-y-3 text-sm text-gray-700">
                        <p className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded-md">Educate patient on mosquito bite prevention (nets, repellents).</p>
                        <p className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded-md">Recommend specific dietary adjustments for the humid climate of Kerala.</p>
                        <p className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded-md">Advise on using boiled or filtered water to prevent waterborne illnesses.</p>
                    </div>
                </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200 text-right">
                <button onClick={onAuthorize} className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                    {translations.authorizeButton[selectedLanguage]}
                </button>
            </div>
        </div>
    );
};

export default RiskAssessmentTab;