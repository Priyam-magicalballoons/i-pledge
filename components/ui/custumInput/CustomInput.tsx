import React from 'react';

interface InputProps {
  value: string | number;
  onchange: (value: string | number) => void;
  placeholder: string;
  type?: "text" | "email" | "password" | "number";
  id: string;
}

const CustomInput = ({ onchange, placeholder, type = "text", value, id }: InputProps) => {
  return (
    <div className="relative w-[80%]">
      <input
        id={id}
        value={value}
        onChange={(e) => onchange(e.target.value)}
        type={type}
        placeholder=''
        className="peer w-full border-b border-black bg-transparent focus:outline-none pt-6"
        inputMode={type === "number" ? 'numeric' : "text"}
      />
      <label
        htmlFor={id}
        className="absolute left-0 top-1 text-gray-500 text-sm transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-gray-500 duration-300 truncate line-clamp-1"
      >
        {placeholder}
      </label>
    </div>
  );
};

export default CustomInput;
