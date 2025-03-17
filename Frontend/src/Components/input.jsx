import React, { useId, forwardRef } from 'react';
import { useSelector } from 'react-redux';


const Input = forwardRef(({ 
  label,
  type = 'text',
  className = '', // Corrected prop name
  ...props
}, ref) => {
  const id = useId();
const darkMode = useSelector((state) => state.theme.DarkMode);

  return (
    <div className='w-full'>
      {label && <label className='inline-block mb-1 pl-1' htmlFor={id}>{label}</label>}
      <input
        type={type}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className} ${darkMode ? "bg-gray-900" : "bg-white" }`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});

export default Input;