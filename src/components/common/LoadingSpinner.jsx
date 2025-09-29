import React from 'react';

const LoadingSpinner = ({ isOverlay = false, text = "Loading..." }) => {
    const spinnerClasses = "h-12 w-12 border-4 border-t-4 border-gray-200 border-t-teal-500 rounded-full animate-spin";
    if (isOverlay) {
        return (
            <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gray-900 bg-opacity-75">
                <div className={spinnerClasses}></div>
                {text && <p className="mt-4 text-white text-lg font-medium">{text}</p>}
            </div>
        );
    }
    return (
        <div className="flex flex-col items-center justify-center w-full h-full p-4">
            <div className={spinnerClasses.replace('h-12 w-12', 'h-8 w-8')}></div>
            {text && <p className="mt-2 text-gray-600 text-sm">{text}</p>}
        </div>
    );
};

export default LoadingSpinner;