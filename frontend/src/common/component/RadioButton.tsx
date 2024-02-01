import React, { useState } from "react";

interface RadioGroupProps {
  options: { label: string; value: any }[];
  onChange: (selectedValue: any) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ options, onChange }) => {
  const [selectedValue, setSelectedValue] = useState(options[0].value);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="flex space-x-4">
      {options.map((option) => (
        <div key={option.value} className="mb-4">
          <input
            type="radio"
            id={`radio-${option.value}`}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={handleRadioChange}
          />
          <label htmlFor={`radio-${option.value}`} className="ml-2">
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default RadioGroup;
