import React from "react";
import Button from "./Button";

type InputProps = {
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hasLimit: boolean;
  handleMaxButton?: () => void;
};

const Input = ({
  label,
  value,
  hasLimit,
  onChange,
  handleMaxButton,
}: InputProps) => {
  return (
    <div className="mb-4 relative">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}

        <input
          className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg mt-2"
          type="number"
          placeholder={label}
          value={value}
          onChange={onChange}
        />
        {hasLimit && (
          <Button
            className="absolute top-9 right-10 bg-blue-500 text-sm px-1 py-1 text-white rounded"
            onClick={handleMaxButton}
          >
            Max
          </Button>
        )}
      </label>
    </div>
  );
};

export default Input;
