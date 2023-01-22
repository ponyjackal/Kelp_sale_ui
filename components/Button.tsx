import React from "react";

type Variant = "primary" | "secondary" | "transparent";
type Size = "small" | "medium" | "large";

type ButtonProps = {
  id?: string;
  className?: string;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
};

const Button = ({
  id,
  className,
  variant = "primary",
  disabled,
  onClick,
  children,
}: ButtonProps) => {
  if (variant === "secondary") {
    return (
      <button
        id={id}
        className={`bg-white text-green-1 hover:bg-light-gray font-helvetica text-lg py-2 border-2 border-secondary rounded-lg ${className}`}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      id={id}
      className={`bg-green-1 hover:bg-green-2 text-white font-helvetica text-lg py-2  border-2 border-secondary rounded-lg ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
