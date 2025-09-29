import React, { useState } from 'react';
import AlertTriangleIcon from '../../components/icons/AlertTriangleIcon';
import InfoIcon from '../../components/icons/InfoIcon';
import BellIcon from '../../components/icons/BellIcon';
import ChevronDownIcon from '../../components/icons/ChevronDownIcon';

const PatientAlertsPage = ({ translations, selectedLanguage, mockAlerts }) => {
    const [expandedId, setExpandedId] = useState(null);

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const getAlertTypeStyles = (type) => {
        switch (type) {
            case 'High Risk': return {
                label: translations.alertTypeHighRisk[selectedLanguage],
                bgColor: 'bg-red-50',
                borderColor: 'border-red-500',
                textColor: 'text-red-800',
                icon: <AlertTriangleIcon className="h-6 w-6 text-red-600" />
            };
            case 'Guidance': return {
                label: translations.alertTypeGuidance[selectedLanguage],
                bgColor: 'bg-yellow-50',
                borderColor: 'border-yellow-500',
                textColor: 'text-yellow-800',
                icon: <InfoIcon className="h-6 w-6 text-yellow-600" />
            };
            case 'Advisory':
            default: return {
                label: translations.alertTypeAdvisory[selectedLanguage],
                bgColor: 'bg-blue-50',
                borderColor: 'border-blue-500',
                textColor: 'text-blue-800',
                icon: <BellIcon className="h-6 w-6 text-blue-600" />
            };
        }
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">{translations.alertsPageTitle[selectedLanguage]}</h1>
            <div className="space-y-4">
                {mockAlerts.map(alert => {
                    const styles = getAlertTypeStyles(alert.type);
                    const isExpanded = expandedId === alert.id;
                    return (
                        <div key={alert.id} className={`rounded-lg shadow-md border-l-4 ${styles.borderColor} ${styles.bgColor} overflow-hidden`}>
                            <div className="p-4 cursor-pointer" onClick={() => toggleExpand(alert.id)}>
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 mr-4 mt-1">{styles.icon}</div>
                                    <div className="flex-grow">
                                        <div className="flex justify-between items-center">
                                            <p className={`text-sm font-bold ${styles.textColor}`}>{styles.label}</p>
                                            <ChevronDownIcon className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${isExpanded ? 'transform rotate-180' : ''}`} />
                                        </div>
                                        <h2 className="text-lg font-semibold text-gray-900 mt-1">{alert.title[selectedLanguage]}</h2>
                                        <p className="text-xs text-gray-500 mt-1">{new Date(alert.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                        {!isExpanded && <p className="text-sm text-gray-700 mt-2">{alert.summary[selectedLanguage]}</p>}
                                    </div>
                                </div>
                            </div>
                            {isExpanded && (
                                <div className="px-4 pb-4 ml-14 border-t border-gray-200">
                                    <p className="text-sm text-gray-700 mt-3 leading-relaxed">{alert.details[selectedLanguage]}</p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PatientAlertsPage;