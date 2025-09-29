import React from 'react';

const PlaceholderPage = ({ title }) => (
    <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        <p className="mt-4 text-gray-600">This page is under construction. Check back later!</p>
    </div>
);

export default PlaceholderPage;