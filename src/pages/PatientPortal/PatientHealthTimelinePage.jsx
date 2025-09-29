import React, { useState, useEffect } from 'react';
import PrescriptionIcon from '../../components/icons/PrescriptionIcon';
import BloodReportIcon from '../../components/icons/BloodReportIcon';
import ScanIcon from '../../components/icons/ScanIcon';
import ConsultationIcon from '../../components/icons/ConsultationIcon';

const PatientHealthTimelinePage = ({ onNavigate, translations, selectedLanguage, allMockRecords }) => {
    const recordTypes = { 'Prescription': translations.filterTypePrescription[selectedLanguage], 'Blood Report': translations.filterTypeBloodReport[selectedLanguage], 'Scan': translations.filterTypeScan[selectedLanguage], 'Consultation': translations.filterTypeConsultation[selectedLanguage], };
    const [filteredRecords, setFilteredRecords] = useState(allMockRecords);
    const [filterType, setFilterType] = useState('All');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    useEffect(() => {
        let records = [...allMockRecords];
        if (filterType !== 'All') {
            records = records.filter(record => record.type === filterType);
        }
        if (fromDate) {
            records = records.filter(record => new Date(record.date) >= new Date(fromDate));
        }
        if (toDate) {
            records = records.filter(record => new Date(record.date) <= new Date(toDate));
        }
        setFilteredRecords(records);
    }, [filterType, fromDate, toDate, allMockRecords]);

    const getRecordIcon = (type) => {
        switch (type) {
            case 'Prescription': return <PrescriptionIcon className="h-8 w-8 text-white" />;
            case 'Blood Report': return <BloodReportIcon className="h-8 w-8 text-white" />;
            case 'Scan': return <ScanIcon className="h-8 w-8 text-white" />;
            case 'Consultation': return <ConsultationIcon className="h-8 w-8 text-white" />;
            default: return null;
        }
    };

    const getIconBgColor = (type) => {
        switch (type) {
            case 'Prescription': return 'bg-blue-500';
            case 'Blood Report': return 'bg-red-500';
            case 'Scan': return 'bg-purple-500';
            case 'Consultation': return 'bg-green-500';
            default: return 'bg-gray-500';
        }
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">{translations.timelineTitle[selectedLanguage]}</h1>
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div> <label htmlFor="filter-type" className="block text-sm font-medium text-gray-700">{translations.filterByTypeLabel[selectedLanguage]}</label> <select id="filter-type" value={filterType} onChange={(e) => setFilterType(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"> <option value="All">{translations.filterTypeAll[selectedLanguage]}</option> <option value="Prescription">{recordTypes['Prescription']}</option> <option value="Blood Report">{recordTypes['Blood Report']}</option> <option value="Scan">{recordTypes['Scan']}</option> <option value="Consultation">{recordTypes['Consultation']}</option> </select> </div>
                    <div> <label htmlFor="from-date" className="block text-sm font-medium text-gray-700">{translations.fromDateLabel[selectedLanguage]}</label> <input type="date" id="from-date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="mt-1 block w-full pl-3 pr-2 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md" /> </div>
                    <div> <label htmlFor="to-date" className="block text-sm font-medium text-gray-700">{translations.toDateLabel[selectedLanguage]}</label> <input type="date" id="to-date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="mt-1 block w-full pl-3 pr-2 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md" /> </div>
                </div>
            </div>
            <div className="space-y-4">
                {filteredRecords.length > 0 ? filteredRecords.map(record => (<div key={record.id} onClick={() => onNavigate(`/patient/reports/${record.id}`)} className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4 cursor-pointer hover:shadow-lg transition-shadow duration-200"> <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${getIconBgColor(record.type)}`}> {getRecordIcon(record.type)} </div> <div className="flex-grow"> <p className="font-semibold text-gray-800">{recordTypes[record.type]} - {new Date(record.date).toLocaleDateString()}</p> <p className="text-sm text-gray-600">{translations.consultingDoctorLabel[selectedLanguage]} {record.doctor}</p> </div> <div className="flex-shrink-0"> <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${record.status === 'Normal' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}> {record.status === 'Normal' ? translations.statusNormal[selectedLanguage] : translations.statusReviewed[selectedLanguage]} </span> </div> </div>)) : (<div className="text-center py-10 bg-white rounded-lg shadow-md"> <p className="text-gray-500">{translations.noRecordsFound[selectedLanguage]}</p> </div>)}
            </div>
        </div>
    );
};

export default PatientHealthTimelinePage;