import React from 'react';
import StarIcon from '../../components/icons/StarIcon';
import PhoneIcon from '../../components/icons/PhoneIcon';
import MailIcon from '../../components/icons/MailIcon';
import LocationMarkerIcon from '../../components/icons/LocationMarkerIcon';

const PatientDoctorProfilePage = ({ currentPage, allMockDoctors, translations, selectedLanguage }) => {
    const profileId = currentPage.split('/').pop();
    const profile = allMockDoctors.find(p => p.id === profileId);

    const specialties = {
        'General Physician': translations.specialtyGP[selectedLanguage],
        'Cardiologist': translations.specialtyCardiologist[selectedLanguage],
        'Pediatrician': translations.specialtyPediatrician[selectedLanguage],
        'Dermatologist': translations.specialtyDermatologist[selectedLanguage],
        'Multi-Specialty Hospital': translations.multiSpecialtyHospital[selectedLanguage]
    };

    const StarRating = ({ rating, showLabel = false }) => (
        <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className={`h-5 w-5 ${i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
            ))}
            {showLabel && <span className="text-gray-600 text-sm ml-2 font-semibold">{rating.toFixed(1)} / 5.0</span>}
        </div>
    );

    if (!profile) { return (<div className="p-8 text-center"><h1 className="text-2xl font-bold text-red-600">{translations.profileNotFound[selectedLanguage]}</h1></div>); }

    const isDoctor = profile.type === 'doctor';
    const pageTitle = `${profile.name} ${isDoctor ? translations.profileTitleDoctor[selectedLanguage] : translations.profileTitleHospital[selectedLanguage]}`;

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">{pageTitle}</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* Basic Info Card */}
                    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                        <img className="h-28 w-28 rounded-full object-cover border-4 border-teal-100" src={`https://placehold.co/150x150/${isDoctor ? 'E0F2F1/00796B' : 'E3F2FD/1E88E5'}?text=${profile.name.charAt(0)}`} alt={profile.name} />
                        <div className="text-center sm:text-left">
                            <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
                            <p className="text-md text-teal-600 font-semibold">{specialties[profile.specialty]}</p>
                            <div className="mt-2"><StarRating rating={profile.rating} showLabel={true} /></div>
                        </div>
                    </div>
                    {/* About Card */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-gray-800 mb-3 border-b pb-2">{translations.aboutHeading[selectedLanguage]} {profile.name}</h3>
                        <p className="text-gray-600 leading-relaxed">{profile.about}</p>
                    </div>
                    {/* Services / Hours Card */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-gray-800 mb-3 border-b pb-2">{isDoctor ? translations.servicesHeading[selectedLanguage] : translations.hoursHeading[selectedLanguage]}</h3>
                        <ul className="list-disc list-inside text-gray-600 space-y-2">
                            {profile.services.map((service, index) => <li key={index}>{service}</li>)}
                        </ul>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Contact Card */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <PhoneIcon className="h-5 w-5 text-gray-400 mt-1" />
                                <span className="text-gray-700">{profile.phone}</span>
                            </div>
                            <div className="flex items-start space-x-3">
                                <MailIcon className="h-5 w-5 text-gray-400 mt-1" />
                                <span className="text-gray-700">{profile.email}</span>
                            </div>
                            <div className="flex items-start space-x-3">
                                <LocationMarkerIcon className="h-5 w-5 text-gray-400 mt-1" />
                                <span className="text-gray-700">{profile.address}</span>
                            </div>
                        </div>
                    </div>
                    {/* Reviews Card */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">{translations.reviewsHeading[selectedLanguage]}</h3>
                        <div className="space-y-4">
                            <div className="border-b pb-3">
                                <StarRating rating={5} />
                                <p className="text-gray-600 mt-1 text-sm">"Excellent care and very professional."</p>
                            </div>
                            <div className="border-b pb-3">
                                <StarRating rating={4} />
                                <p className="text-gray-600 mt-1 text-sm">"Good experience, the staff was helpful."</p>
                            </div>
                            <div>
                                <StarRating rating={5} />
                                <p className="text-gray-600 mt-1 text-sm">"Highly recommended!"</p>
                            </div>
                        </div>
                    </div>
                    <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700">
                        {translations.bookAppointmentBtn[selectedLanguage]}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PatientDoctorProfilePage;