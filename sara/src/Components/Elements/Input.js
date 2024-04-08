import React from 'react';
import { FaUser, FaLock } from 'react-icons/fa';

const Input = ({ type, placeholder, required }) => {
  let icon = null;

  if (type === 'text') {
    icon = <FaUser className="icon" />;
  } else if (type === 'password') {
    icon = <FaLock className="icon" />;
  }
  
  return (
    <div className="input-box">
      <input type= {type} placeholder={placeholder} required={required} />
      {icon}
    </div>
  );
};

export default Input;
