import React, { useState } from 'react';

const PrescribePage = ({ patient, onGenerate, onCancel, translations, selectedLanguage }) => {
    const [medications, setMedications] = useState([]);
    const [currentMed, setCurrentMed] = useState({
        name: '',
        dosage: '',
        frequency: translations.freqOnce[selectedLanguage],
        duration: '',
        instructions: ''
    });
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentMed(prev => ({ ...prev, [name]: value }));
    };

    const handleAddMedication = () => {
        if (!currentMed.name.trim()) {
            setError(translations.validationError[selectedLanguage]);
            return;
        }
        setError('');
        setMedications(prev => [...prev, { ...currentMed, id: Date.now() }]);
        // Reset form for next medication
        setCurrentMed({
            name: '',
            dosage: '',
            frequency: translations.freqOnce[selectedLanguage],
            duration: '',
            instructions: ''
        });
    };

    const handleRemoveMedication = (id) => {
        setMedications(prev => prev.filter(med => med.id !== id));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (medications.length === 0) {
            alert("Please add at least one medication.");
            return;
        }
        onGenerate();
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
                {translations.prescribeTitle[selectedLanguage]} <span className="text-indigo-600">{patient.name}</span>
            </h1>

            <div className="max-w-4xl mx-auto">
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
                    {/* Medication Input Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border border-gray-200 rounded-lg">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{translations.medicationNameLabel[selectedLanguage]}</label>
                            <input type="text" name="name" value={currentMed.name} onChange={handleInputChange} placeholder={translations.medicationNamePlaceholder[selectedLanguage]} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{translations.dosageLabel[selectedLanguage]}</label>
                            <input type="text" name="dosage" value={currentMed.dosage} onChange={handleInputChange} placeholder={translations.dosagePlaceholder[selectedLanguage]} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{translations.frequencyLabel[selectedLanguage]}</label>
                            <select name="frequency" value={currentMed.frequency} onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                                <option>{translations.freqOnce[selectedLanguage]}</option>
                                <option>{translations.freqTwice[selectedLanguage]}</option>
                                <option>{translations.freqThrice[selectedLanguage]}</option>
                                <option>{translations.freqAsNeeded[selectedLanguage]}</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{translations.durationLabel[selectedLanguage]}</label>
                            <input type="text" name="duration" value={currentMed.duration} onChange={handleInputChange} placeholder={translations.durationPlaceholder[selectedLanguage]} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">{translations.instructionsLabel[selectedLanguage]}</label>
                            <textarea name="instructions" value={currentMed.instructions} onChange={handleInputChange} rows="2" placeholder={translations.instructionsPlaceholder[selectedLanguage]} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                        </div>
                         <div className="md:col-span-2 text-right">
                            <button type="button" onClick={handleAddMedication} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
                                {translations.addMedicationButton[selectedLanguage]}
                            </button>
                        </div>
                    </div>

                    {/* Added Medications List */}
                    {medications.length > 0 && (
                        <div>
                            <h2 className="text-lg font-medium text-gray-900">{translations.addedMedicationsTitle[selectedLanguage]}</h2>
                            <ul className="mt-2 border border-gray-200 rounded-md divide-y divide-gray-200">
                                {medications.map((med) => (
                                    <li key={med.id} className="p-3 flex justify-between items-center text-sm">
                                        <div>
                                            <p className="font-semibold text-gray-800">{med.name} <span className="font-normal text-gray-600">{med.dosage}</span></p>
                                            <p className="text-gray-500">{med.frequency}, {med.duration}</p>
                                            {med.instructions && <p className="text-xs text-gray-500 mt-1">Note: {med.instructions}</p>}
                                        </div>
                                        <button type="button" onClick={() => handleRemoveMedication(med.id)} className="text-red-500 hover:text-red-700">Remove</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                     {/* Action Buttons */}
                    <div className="flex justify-end space-x-4 pt-4 border-t">
                        <button type="button" onClick={onCancel} className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                            {translations.cancelButton[selectedLanguage]}
                        </button>
                        <button type="submit" className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700">
                            {translations.generatePrescriptionButton[selectedLanguage]}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PrescribePage;