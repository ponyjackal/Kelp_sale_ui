import React from "react";
import Button from "./Button";

type InputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onPaste?: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  onTouch?: (e: React.TouchEvent<HTMLInputElement>) => void;
  hasLimit: boolean;
  handleMaxButton?: () => void;
};

const Input = ({
  value,
  hasLimit,
  onChange,
  onKeyUp,
  onKeyDown,
  onTouch,
  onPaste,
  onClick,
  handleMaxButton,
}: InputProps) => {
  return (
    <div className="relative flex center-items">
      <text className="input-amount">$</text>
      <input
        className="input-amount"
        step="0.01"
        pattern="^\d+(\.\d{1,2})?$"
        placeholder="0.00"
        type="number"
        min={0.0}
        onClick={onClick}
        value={value}
        onChange={onChange}
        onTouchStart={onTouch}
        onPaste={onPaste}
        onKeyUp={onKeyUp}
        onKeyDown={onKeyDown}
      />
      {hasLimit && (
        <Button
          className="absolute top-9 right-10 bg-blue-500 text-sm px-1 py-1 text-white rounded"
          onClick={handleMaxButton}
        >
          Max
        </Button>
      )}
    </div>
  );
};

export default Input;
