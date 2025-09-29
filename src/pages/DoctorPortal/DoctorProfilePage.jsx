// src/pages/DoctorPortal/DoctorProfilePage.jsx

import React, { useState } from 'react';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const DoctorProfilePage = ({ user, translations, selectedLanguage }) => {
    // Mock data for the profile, initialized from the user prop
    const [profileData, setProfileData] = useState({
        email: 'anil.verma@ayu-raksha.hosp',
        phone: '+91 91234 56789',
        specialty: 'General Physician',
        experience: '12',
        affiliation: 'City Care Clinic, Prayagraj',
        registrationNo: 'UPMC-54321',
        bio: 'Dr. Verma has been serving the community for over a decade, providing expert primary care for all ages. He focuses on preventive medicine and holistic health.'
    });

    const [isSaving, setIsSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSaving(true);
        setShowSuccess(false);

        // Simulate API call to save data
        setTimeout(() => {
            setIsSaving(false);
            setShowSuccess(true);
            // Hide success message after 3 seconds
            setTimeout(() => setShowSuccess(false), 3000);
        }, 2000);
    };

    const specialties = [
        translations.specialtyGP[selectedLanguage],
        translations.specialtyCardiologist[selectedLanguage],
        translations.specialtyPediatrician[selectedLanguage],
        translations.specialtyDermatologist[selectedLanguage]
    ];
    
    const readOnlyInputClasses = "mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed";
    const editableInputClasses = "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500";


    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">{translations.profilePageTitle[selectedLanguage]}</h1>
            
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
                {/* Personal Information Section */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">{translations.personalInfoSectionTitle[selectedLanguage]}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{translations.profileNameLabel[selectedLanguage]}</label>
                            <input type="text" value={user.name} readOnly className={readOnlyInputClasses} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{translations.profileIdLabel[selectedLanguage]}</label>
                            <input type="text" value="AV1234567890" readOnly className={readOnlyInputClasses} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{translations.profileEmailLabel[selectedLanguage]}</label>
                            <input type="email" name="email" value={profileData.email} onChange={handleInputChange} className={editableInputClasses} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{translations.profilePhoneLabel[selectedLanguage]}</label>
                            <input type="tel" name="phone" value={profileData.phone} onChange={handleInputChange} className={editableInputClasses} />
                        </div>
                    </div>
                </div>

                {/* Professional Information Section */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">{translations.professionalInfoSectionTitle[selectedLanguage]}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{translations.profileSpecialtyLabel[selectedLanguage]}</label>
                            <select name="specialty" value={profileData.specialty} onChange={handleInputChange} className={editableInputClasses}>
                                {specialties.map(spec => <option key={spec} value={spec}>{spec}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{translations.profileExperienceLabel[selectedLanguage]}</label>
                            <input type="number" name="experience" value={profileData.experience} onChange={handleInputChange} className={editableInputClasses} />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">{translations.profileAffiliationLabel[selectedLanguage]}</label>
                            <input type="text" name="affiliation" value={profileData.affiliation} onChange={handleInputChange} className={editableInputClasses} />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">{translations.profileRegistrationLabel[selectedLanguage]}</label>
                            <input type="text" name="registrationNo" value={profileData.registrationNo} onChange={handleInputChange} className={editableInputClasses} />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">{translations.profileBioLabel[selectedLanguage]}</label>
                            <textarea name="bio" rows="4" value={profileData.bio} onChange={handleInputChange} className={editableInputClasses}></textarea>
                        </div>
                    </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center justify-between mt-6">
                    <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">{translations.changePinLink[selectedLanguage]}</a>
                    <div className="flex items-center">
                        {showSuccess && <p className="text-sm text-green-600 mr-4">{translations.profileUpdatedSuccess[selectedLanguage]}</p>}
                        <button type="submit" disabled={isSaving} className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300">
                            {isSaving ? <LoadingSpinner /> : translations.saveChangesButton[selectedLanguage]}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default DoctorProfilePage;