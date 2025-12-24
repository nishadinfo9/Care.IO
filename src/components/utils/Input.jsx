import React from "react";

const Input = ({ label, type = "text", className = "", error, ...props }) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}

      <input
        type={type}
        className={`
          w-full px-3 text-sm py-2 rounded-lg border 
          focus:outline-none focus:ring-2 
          transition-all duration-200
          ${
            error
              ? "border-red-500 focus:ring-red-300"
              : "border-gray-300 focus:ring-indigo-300 focus:border-indigo-500"
          }
          ${className}
        `}
        {...props}
      />

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default Input;
