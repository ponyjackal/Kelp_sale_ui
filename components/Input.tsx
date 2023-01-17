import React from "react";

type InputProps = {
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({ label, value, onChange }: InputProps) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}

        <input
          className="shadow appearance-none border rounded w-full py-2.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg mt-2"
          type="number"
          placeholder={label}
          value={value}
          onChange={onChange}
        />
      </label>
    </div>
  );
};

export default Input;
