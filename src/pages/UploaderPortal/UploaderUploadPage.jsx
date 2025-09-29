// src/pages/UploaderPortal/UploaderUploadPage.jsx

import React, { useState, useEffect, useRef } from 'react';
import Spinner from '../../components/common/Spinner';
import SuccessIcon from '../../components/icons/SuccessIcon';
import UploadIcon from '../../components/icons/UploadIcon';
import QrCodeIcon from '../../components/icons/QrCodeIcon';

const UploaderUploadPage = ({ onNavigate, translations, selectedLanguage, user }) => {
    const [formData, setFormData] = useState({
        patientId: '',
        patientName: '',
        patientAge: '',
        patientSex: '',
        patientLocation: '',
        reportDate: '',
        hospitalName: '',
        doctorName: '',
        reportType: '',
    });

    const [verificationStatus, setVerificationStatus] = useState({ message: '', type: '' });
    const [fileName, setFileName] = useState('');
    const [aiStatus, setAiStatus] = useState(''); // 'processing', 'complete'
    const [isDragActive, setIsDragActive] = useState(false);
    const fileInputRef = useRef(null);
    
    // In a real application, this data would come from a server API call.
    const patientDatabase = {
        "1234567890123456": { name: 'Krishna Kumar', age: 45, sex: 'Male' },
        "9876543210987654": { name: 'Priya Sharma', age: 32, sex: 'Female' },
        "1122334455667788": { name: 'Amit Singh', age: 68, sex: 'Male' }
    };

    const handleVerifyId = () => {
        const id = formData.patientId;
        if (id.length !== 16 || !/^\d+$/.test(id)) {
            setVerificationStatus({ message: translations.verifyIdPrompt[selectedLanguage], type: 'error' });
            return;
        }

        const patient = patientDatabase[id];
        if (patient) {
            setFormData(prev => ({ ...prev, patientName: patient.name, patientAge: patient.age, patientSex: patient.sex }));
            setVerificationStatus({ message: `${translations.patientVerifiedMsg[selectedLanguage]} ${patient.name}`, type: 'success' });
        } else {
            setFormData(prev => ({ ...prev, patientName: '', patientAge: '', patientSex: '' }));
            setVerificationStatus({ message: translations.patientNotFoundMsg[selectedLanguage], type: 'error' });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileSelect = (files) => {
        if (files && files.length > 0) {
            setFileName(files[0].name);
        }
    };

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
        handleFileSelect(e.dataTransfer.files);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.patientName) {
            alert(translations.verifyFirstMsg[selectedLanguage]);
            return;
        }

        setAiStatus('processing');
        
        setTimeout(() => {
            setAiStatus('complete');
            setTimeout(() => {
                onNavigate('/uploader/dashboard'); 
            }, 2000);
        }, 3000);
    };

    return (
        <div className="container mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">{translations.uploadPageTitle[selectedLanguage]}</h1>
            
            <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-lg shadow-md space-y-6">
                
                {/* Patient ID Verification */}
                <div className="flex items-end space-x-2">
                    <div className="flex-grow">
                        <label htmlFor="patientId" className="block text-sm font-medium text-gray-700 mb-1">{translations.patientIdLabel[selectedLanguage]}</label>
                        <input type="text" id="patientId" name="patientId" value={formData.patientId} onChange={handleInputChange} className="form-input" placeholder={translations.patientIdPlaceholder[selectedLanguage]} maxLength="16" required />
                    </div>
                    <button type="button" onClick={handleVerifyId} className="btn-secondary h-11 px-6">{translations.verifyButton[selectedLanguage]}</button>
                </div>
                {verificationStatus.message && (
                    <p className={`text-sm mt-1 ${verificationStatus.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>{verificationStatus.message}</p>
                )}

                {/* Patient Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="patientName" className="block text-sm font-medium text-gray-700 mb-1">{translations.patientNameLabel[selectedLanguage]}</label>
                        <input type="text" id="patientName" name="patientName" value={formData.patientName} className="form-input-readonly" placeholder={translations.patientNamePlaceholder[selectedLanguage]} readOnly required />
                    </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="patientAge" className="block text-sm font-medium text-gray-700 mb-1">{translations.patientAgeLabel[selectedLanguage]}</label>
                            <input type="number" id="patientAge" name="patientAge" value={formData.patientAge} className="form-input-readonly" placeholder={translations.patientAgePlaceholder[selectedLanguage]} readOnly required />
                        </div>
                        <div>
                            <label htmlFor="patientSex" className="block text-sm font-medium text-gray-700 mb-1">{translations.patientSexLabel[selectedLanguage]}</label>
                            <input type="text" id="patientSex" name="patientSex" value={formData.patientSex} className="form-input-readonly" placeholder={translations.patientSexPlaceholder[selectedLanguage]} readOnly required />
                        </div>
                    </div>
                </div>

                {/* Metadata Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
                    <div>
                        <label htmlFor="patientLocation" className="block text-sm font-medium text-gray-700 mb-1">{translations.patientLocationLabel[selectedLanguage]}</label>
                        <input type="text" id="patientLocation" name="patientLocation" value={formData.patientLocation} onChange={handleInputChange} className="form-input" placeholder={translations.patientLocationPlaceholder[selectedLanguage]} required/>
                    </div>
                    <div>
                        <label htmlFor="reportType" className="block text-sm font-medium text-gray-700 mb-1">{translations.reportTypeLabel[selectedLanguage]}</label>
                        <select id="reportType" name="reportType" value={formData.reportType} onChange={handleInputChange} className="form-input" required>
                            <option value="" disabled>{translations.selectReportType[selectedLanguage]}</option>
                            <option value="blood_report">{translations.reportTypeBlood[selectedLanguage]}</option>
                            <option value="radiology_xray">{translations.reportTypeXRay[selectedLanguage]}</option>
                            <option value="radiology_mri">{translations.reportTypeMRI[selectedLanguage]}</option>
                            <option value="prescription">{translations.reportTypePrescription[selectedLanguage]}</option>
                            <option value="pathology">{translations.reportTypePathology[selectedLanguage]}</option>
                            <option value="other">{translations.reportTypeOther[selectedLanguage]}</option>
                        </select>
                    </div>
                     <div>
                        <label htmlFor="hospitalName" className="block text-sm font-medium text-gray-700 mb-1">{translations.hospitalNameLabel[selectedLanguage]}</label>
                        <input type="text" id="hospitalName" name="hospitalName" value={formData.hospitalName} onChange={handleInputChange} className="form-input" placeholder={translations.hospitalNamePlaceholder[selectedLanguage]} required/>
                    </div>
                    <div>
                        <label htmlFor="doctorName" className="block text-sm font-medium text-gray-700 mb-1">{translations.doctorNameLabel[selectedLanguage]}</label>
                        <input type="text" id="doctorName" name="doctorName" value={formData.doctorName} onChange={handleInputChange} className="form-input" placeholder={translations.doctorNamePlaceholder[selectedLanguage]} required/>
                    </div>
                    <div>
                        <label htmlFor="reportDate" className="block text-sm font-medium text-gray-700 mb-1">{translations.reportDateLabel[selectedLanguage]}</label>
                        <input type="date" id="reportDate" name="reportDate" value={formData.reportDate} onChange={handleInputChange} className="form-input" required/>
                    </div>
                    <div>
                        <label htmlFor="uploaderName" className="block text-sm font-medium text-gray-700 mb-1">{translations.uploaderNameLabel[selectedLanguage]}</label>
                        <input type="text" id="uploaderName" name="uploaderName" value={user.name} className="form-input-readonly" readOnly />
                    </div>
                </div>

                {/* File Upload Section */}
                <div className="pt-4 border-t">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">{translations.uploadDocumentTitle[selectedLanguage]}</h2>
                    <div 
                        className={`mt-2 flex justify-center px-6 pt-10 pb-12 border-2 ${isDragActive ? 'border-teal-500 bg-teal-50' : 'border-gray-300'} border-dashed rounded-md transition-colors`}
                        onDragEnter={handleDragEnter} onDragOver={handleDragEnter} onDragLeave={handleDragLeave} onDrop={handleDrop}
                        onClick={() => fileInputRef.current.click()}
                    >
                        <div className="text-center">
                            <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
                            <p className="mt-2 text-sm text-gray-600">{translations.dragDropPrompt[selectedLanguage]}</p>
                            <input ref={fileInputRef} type="file" className="hidden" onChange={(e) => handleFileSelect(e.target.files)} accept=".pdf,image/*" />
                        </div>
                    </div>
                     {fileName && <p className="mt-2 text-sm text-gray-600">Selected file: <span className="font-medium">{fileName}</span></p>}
                </div>
                
                {/* AI Status Area */}
                {aiStatus && (
                    <div className={`p-4 rounded-md flex items-center ${aiStatus === 'complete' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                        {aiStatus === 'processing' && <Spinner className="w-5 h-5 mr-3" />}
                        {aiStatus === 'complete' && <SuccessIcon className="w-5 h-5 mr-3" />}
                        <span>
                            {aiStatus === 'processing' ? translations.aiProcessingMsg[selectedLanguage] : translations.aiCompleteMsg[selectedLanguage]}
                        </span>
                    </div>
                )}


                {/* Action Button */}
                <div className="flex justify-end pt-4">
                    <button type="submit" className="btn-primary w-full sm:w-auto" disabled={aiStatus === 'processing'}>
                        {translations.uploadReportButton[selectedLanguage]}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UploaderUploadPage;