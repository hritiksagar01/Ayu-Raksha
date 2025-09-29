import React, { useState } from 'react';

const PatientLoginPage = ({ onLoginSuccess, translations, selectedLanguage }) => {
    const [ayuRakshaId, setAyuRakshaId] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!ayuRakshaId || ayuRakshaId.length !== 16 || !/^\d+$/.test(ayuRakshaId)) {
            newErrors.ayuRakshaId = translations.ayuRakshaIdValidationError[selectedLanguage];
        }
        if (!password) {
            newErrors.password = translations.validationError[selectedLanguage];
        }
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            onLoginSuccess();
        }
    };

    const getInputClasses = (fieldName) => `w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 transition-colors duration-200 ${errors[fieldName] ? 'border-red-500 ring-red-500' : 'border-gray-300 focus:ring-teal-500'}`;
    
    const handleIdChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        if (value.length <= 16) {
            setAyuRakshaId(value);
        }
    };

    return (
        // This is the container we are fixing
        <div className="flex items-center justify-center h-full bg-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg">
                <div><h2 className="text-center text-3xl font-extrabold text-gray-900">{translations.patientLoginTitle[selectedLanguage]}</h2></div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
                    <div>
                        <label htmlFor="ayuraksha-id" className="text-sm font-medium text-gray-700">{translations.ayuRakshaIdLabel[selectedLanguage]}</label>
                        <input id="ayuraksha-id" name="ayuraksha-id" type="text" inputMode="numeric" pattern="\d{16}" maxLength="16" required className={getInputClasses('ayuRakshaId')} placeholder={translations.ayuRakshaIdPlaceholder[selectedLanguage]} value={ayuRakshaId} onChange={handleIdChange} />
                        {errors.ayuRakshaId && <p className="mt-2 text-xs text-red-600">{errors.ayuRakshaId}</p>}
                    </div>
                    <div>
                        <label htmlFor="password" className="text-sm font-medium text-gray-700">{translations.passwordLabel[selectedLanguage]}</label>
                        <input id="password" name="password" type="password" autoComplete="current-password" required className={getInputClasses('password')} placeholder={translations.passwordPlaceholder[selectedLanguage]} value={password} onChange={(e) => setPassword(e.target.value)} />
                        {errors.password && <p className="mt-2 text-xs text-red-600">{errors.password}</p>}
                    </div>
                    <div className="flex items-center justify-end">
                        <div className="text-sm"><a href="#" className="font-medium text-teal-600 hover:text-teal-500">{translations.forgotPasswordLink[selectedLanguage]}</a></div>
                    </div>
                    <div><button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-transform transform hover:scale-105">{translations.loginButton[selectedLanguage]}</button></div>
                </form>
            </div>
        </div>
    );
};

export default PatientLoginPage;