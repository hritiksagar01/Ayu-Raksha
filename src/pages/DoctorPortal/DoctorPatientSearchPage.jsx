import React, { useState } from 'react';

const DoctorPatientSearchPage = ({ onSearch, translations, selectedLanguage }) => {
    const [patientId, setPatientId] = useState('');
    const [error, setError] = useState('');

    const validate = () => {
        if (!patientId || patientId.length !== 16 || !/^\d+$/.test(patientId)) {
            setError(translations.ayuRakshaIdValidationError[selectedLanguage]);
            return false;
        }
        setError('');
        return true;
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (validate()) {
            onSearch();
        }
    };

    const handleIdChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        if (value.length <= 16) {
            setPatientId(value);
        }
    };

    const inputClasses = `w-full px-4 py-3 text-lg border rounded-md focus:outline-none focus:ring-2 transition-colors duration-200 ${error ? 'border-red-500 ring-red-500' : 'border-gray-300 focus:ring-indigo-500'}`;

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">{translations.patientSearchTitle[selectedLanguage]}</h1>
            <div className="max-w-xl mx-auto mt-10">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <form onSubmit={handleSearch} noValidate>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="patient-id" className="text-base font-medium text-gray-700">{translations.patientSearchLabel[selectedLanguage]}</label>
                                <input
                                    id="patient-id"
                                    name="patient-id"
                                    type="text"
                                    inputMode="numeric"
                                    pattern="\d{16}"
                                    maxLength="16"
                                    required
                                    className={`mt-2 ${inputClasses}`}
                                    placeholder={translations.patientSearchPlaceholder[selectedLanguage]}
                                    value={patientId}
                                    onChange={handleIdChange}
                                />
                                {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                            </div>
                            <p className="text-sm text-gray-500">{translations.patientSearchInfoText[selectedLanguage]}</p>
                            <div>
                                <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105">
                                    {translations.searchButton[selectedLanguage]}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DoctorPatientSearchPage;