// Dropdown.tsx
import React, { useState } from 'react';

interface Option {
  value?: string;
  label?: string;
}

interface DropdownProps {
  options?: Option[];
  onSelect?: (option: Option) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if(onSelect){
    onSelect(option);
    }
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring focus:border-blue-300"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
        >
          {selectedOption ? selectedOption.label : 'Select an option'}
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 space-y-2 bg-white border border-gray-300 rounded-md shadow-lg"
          aria-labelledby="options-menu"
        >
          {options && options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleOptionClick(option)}
              className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
