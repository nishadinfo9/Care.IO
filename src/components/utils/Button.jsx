import React from "react";

const Button = ({
  type = "submit",
  className = "",
  bg = "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-400",
  children,
  disabled = false,
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`
        py-2 px-4 rounded-lg font-medium
        text-white 
        focus:outline-none focus:ring-2 
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed ${bg}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
