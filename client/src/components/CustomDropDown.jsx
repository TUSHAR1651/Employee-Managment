// src/CustomDropdown.js
import React, { useState } from 'react';

const CustomDropdown = ({ options, selectedOption, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (option) => {
        onSelect(option);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="block w-full bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
                {selectedOption || 'Select an option'}
            </button>
            {isOpen && (
                <ul className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {options.map((option) => (
                        <li
                            key={option}
                            onClick={() => handleSelect(option)}
                            className="cursor-pointer px-4 py-2 hover:bg-teal-100"
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CustomDropdown;
