import React, { useState } from 'react';

const DoctorLoginPage = ({ onLoginSuccess, translations, selectedLanguage }) => {
    const [doctorId, setDoctorId] = useState('');
    const [pin, setPin] = useState('');
    const [errors, setErrors] = useState({});
    const doctorIdRegex = /^[A-Z]{2}\d{10}$/i;

    const validate = () => {
        const newErrors = {};
        if (!doctorId || !doctorIdRegex.test(doctorId)) {
            newErrors.doctorId = translations.doctorIdValidationError[selectedLanguage];
        }
        if (!pin || pin.length !== 4 || !/^\d+$/.test(pin)) {
            newErrors.pin = translations.pinValidationError[selectedLanguage];
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

    const getInputClasses = (fieldName) => `w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 transition-colors duration-200 ${errors[fieldName] ? 'border-red-500 ring-red-500' : 'border-gray-300 focus:ring-indigo-500'}`;
    
    const handlePinChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        if (value.length <= 4) {
            setPin(value);
        }
    };
        return (
        <div className="flex items-center justify-center min-h-full py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg">
                <div><h2 className="text-center text-3xl font-extrabold text-gray-900">{translations.doctorLoginTitle[selectedLanguage]}</h2></div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
                    <div>
                        <label htmlFor="doctor-id" className="text-sm font-medium text-gray-700">{translations.doctorIdLabel[selectedLanguage]}</label>
                        <input id="doctor-id" name="doctor-id" type="text" maxLength="12" required className={getInputClasses('doctorId')} placeholder={translations.doctorIdPlaceholder[selectedLanguage]} value={doctorId} onChange={(e) => setDoctorId(e.target.value.toUpperCase())} />
                        {errors.doctorId && <p className="mt-2 text-xs text-red-600">{errors.doctorId}</p>}
                    </div>
                    <div>
                        <label htmlFor="pin" className="text-sm font-medium text-gray-700">{translations.pinLabel[selectedLanguage]}</label>
                        <input id="pin" name="pin" type="password" inputMode="numeric" pattern="\d{4}" maxLength="4" required className={getInputClasses('pin')} placeholder={translations.pinPlaceholder[selectedLanguage]} value={pin} onChange={handlePinChange} />
                        {errors.pin && <p className="mt-2 text-xs text-red-600">{errors.pin}</p>}
                    </div>
                    <div className="flex items-center justify-end">
                        <div className="text-sm"><a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">{translations.forgotPinLink[selectedLanguage]}</a></div>
                    </div>
                    <div><button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105">{translations.loginButton[selectedLanguage]}</button></div>
                </form>
            </div>
        </div>
    );
};

export default DoctorLoginPage;