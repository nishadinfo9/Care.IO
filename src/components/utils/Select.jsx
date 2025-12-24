import React from "react";

const Select = ({ label, error, options = [], ...props }) => {
  return (
    <div className="w-full mb-4 relative">
      {label && (
        <label className="block mb-2 text-sm font-medium">{label}</label>
      )}
      <select defaultValue={""} {...props} className="select w-full ">
        <option value="" disabled>
          Select {label}
        </option>

        {options.map((option) => (
          <option className="text-black" key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Select;
