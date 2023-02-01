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
};

const Input = ({
  value,
  onChange,
  onKeyUp,
  onKeyDown,
  onTouch,
  onPaste,
  onClick,
}: InputProps) => {
  return (
    <div className="relative flex center-items">
      <span className="input-amount">$</span>
      <input
        id="input-amount-value"
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
    </div>
  );
};

export default Input;
