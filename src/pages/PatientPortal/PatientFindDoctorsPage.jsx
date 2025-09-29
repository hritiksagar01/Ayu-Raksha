import React, { useState, useEffect } from 'react';
import SearchIcon from '../../components/icons/SearchIcon';
import StarIcon from '../../components/icons/StarIcon';

const PatientFindDoctorsPage = ({ onNavigate, translations, selectedLanguage, allMockDoctors }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [specialty, setSpecialty] = useState('All');
    const [location, setLocation] = useState('Near Me');
    const [results, setResults] = useState(allMockDoctors);

    const specialties = {
        'All': translations.specialtyAll[selectedLanguage],
        'General Physician': translations.specialtyGP[selectedLanguage],
        'Cardiologist': translations.specialtyCardiologist[selectedLanguage],
        'Pediatrician': translations.specialtyPediatrician[selectedLanguage],
        'Dermatologist': translations.specialtyDermatologist[selectedLanguage],
        'Multi-Specialty Hospital': translations.multiSpecialtyHospital[selectedLanguage]
    };

    const locations = {
        'Near Me': translations.locationNearMe[selectedLanguage],
        'Mumbai': translations.locationMumbai[selectedLanguage],
        'Kochi': translations.locationKochi[selectedLanguage],
        'Delhi': translations.locationDelhi[selectedLanguage]
    };

    const handleSearch = () => {
        let filtered = allMockDoctors.filter(item => {
            const nameMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
            const specialtyMatch = item.specialty.toLowerCase().includes(searchTerm.toLowerCase());
            const termMatch = nameMatch || specialtyMatch;

            const specialtyFilterMatch = specialty === 'All' || item.specialty === specialty;
            const locationFilterMatch = location === 'Near Me' ? true : item.location === location; // Simplified for prototype

            return termMatch && specialtyFilterMatch && locationFilterMatch;
        });
        setResults(filtered);
    };

    // Trigger search on filter change for better UX
    useEffect(() => {
        handleSearch();
    }, [searchTerm, specialty, location, allMockDoctors]);

    const StarRating = ({ rating }) => (
        <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className={`h-5 w-5 ${i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
            ))}
            <span className="text-gray-600 text-sm ml-1">{rating.toFixed(1)}</span>
        </div>
    );

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">{translations.findDoctorsTitle[selectedLanguage]}</h1>

            <div className="bg-white p-4 rounded-lg shadow-md mb-6 space-y-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder={translations.findDoctorsSearchPlaceholder[selectedLanguage]}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="h-5 w-5 text-gray-400" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700">{translations.filterBySpecialtyLabel[selectedLanguage]}</label>
                        <select value={specialty} onChange={(e) => setSpecialty(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md">
                            {Object.entries(specialties).map(([key, value]) => key !== 'Multi-Specialty Hospital' && <option key={key} value={key}>{value}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700">{translations.filterByLocationLabel[selectedLanguage]}</label>
                        <select value={location} onChange={(e) => setLocation(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md">
                            {Object.entries(locations).map(([key, value]) => <option key={key} value={key}>{value}</option>)}
                        </select>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {results.length > 0 ? results.map(item => (
                    <div key={item.id} className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <div className="flex-shrink-0">
                            <img className="h-20 w-20 rounded-full object-cover" src={`https://placehold.co/100x100/${item.type === 'doctor' ? 'E0F2F1/00796B' : 'E3F2FD/1E88E5'}?text=${item.name.charAt(0)}`} alt={item.name} />
                        </div>
                        <div className="flex-grow">
                            <p className="font-bold text-lg text-gray-800">{item.name}</p>
                            <p className="text-sm text-teal-600 font-medium">{specialties[item.specialty]}</p>
                            <div className="mt-1"><StarRating rating={item.rating} /></div>
                        </div>
                        <div className="flex flex-col items-start sm:items-end w-full sm:w-auto">
                            <p className="text-sm text-gray-600 font-medium">{item.distance} {translations.distanceAway[selectedLanguage]}</p>
                            <button onClick={() => onNavigate(`/patient/doctors/${item.id}`)} className="mt-2 w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700">
                                {translations.viewProfileButton[selectedLanguage]}
                            </button>
                        </div>
                    </div>
                )) : (
                    <div className="text-center py-10 bg-white rounded-lg shadow-md">
                        <p className="text-gray-500">{translations.noRecordsFound[selectedLanguage]}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PatientFindDoctorsPage;