import { ChangeEvent } from "react";

interface CheckBoxProps {
  label: string;
  onChange: (isChecked: boolean) => void;
}

const CheckBox = ({ label, onChange }: CheckBoxProps) => {
  const handleCheckBoxChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };
  return (
    <div className="flex items-center mb-4">
      <input
        id="default-checkbox"
        type="checkbox"
        value=""
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        onChange={handleCheckBoxChange}
      />
      <label className="ms-2 text-lg font-medium text-black ">{label}</label>
    </div>
  );
};

export default CheckBox;
