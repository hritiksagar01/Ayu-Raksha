import React from 'react';

const OverviewTab = ({ patient, translations, selectedLanguage }) => {
    const DetailItem = ({ label, value }) => (
        <div>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="font-medium text-gray-800">{value}</p>
        </div>
    );
    const ListSection = ({ title, items }) => (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">{title}</h3>
            <ul className="space-y-2">
                {items.map((item, index) => <li key={index} className="p-2 bg-gray-50 rounded-md text-sm text-gray-700">{item}</li>)}
            </ul>
        </div>
    );

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">{translations.demographics[selectedLanguage]}</h3>
                    <div className="space-y-3">
                        <DetailItem label={translations.age[selectedLanguage]} value={patient.demographics.age} />
                        <DetailItem label={translations.sex[selectedLanguage]} value={patient.demographics.sex} />
                        <DetailItem label={translations.bloodGroup[selectedLanguage]} value={patient.demographics.bloodGroup} />
                        <DetailItem label={translations.address[selectedLanguage]} value={patient.demographics.address} />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">{translations.vitals[selectedLanguage]}</h3>
                    <div className="space-y-3">
                        <DetailItem label="Blood Pressure" value={patient.vitals.bp} />
                        <DetailItem label="Heart Rate" value={patient.vitals.hr} />
                        <DetailItem label="Temperature" value={patient.vitals.temp} />
                    </div>
                </div>
            </div>
            <div className="lg:col-span-2 space-y-6">
                <ListSection title={translations.allergies[selectedLanguage]} items={patient.allergies} />
                <ListSection title={translations.medications[selectedLanguage]} items={patient.medications} />
                <ListSection title={translations.conditions[selectedLanguage]} items={patient.conditions} />
            </div>
        </div>
    );
};

export default OverviewTab;