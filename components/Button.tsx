import React from "react";

type Variant = "primary" | "secondary" | "transparent";
type Size = "small" | "medium" | "large";

type ButtonProps = {
  className?: string;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
};

const Button = ({
  className,
  variant = "primary",
  disabled,
  onClick,
  children,
}: ButtonProps) => {
  if (variant === "secondary") {
    return (
      <button
        className={`bg-white text-primary hover:bg-light-gray font-helvetica text-lg px-4 py-2 border-2 border-secondary rounded-lg ${className}`}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      className={`bg-primary hover:bg-secondary-dark text-white font-helvetica text-lg px-4 py-2  border-2 border-secondary rounded-lg ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
