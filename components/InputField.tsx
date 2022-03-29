import React from 'react';

type Props = {
  onChange: (value: string) => void;
  placeholder?: string;
  name?: string;
  value?: string;
  type?: string;
  className?: string;
  id?: string;
};

function InputField({ className, id, onChange, name, placeholder, type, value = '' }: Props) {
  return (
    <input
      placeholder={placeholder}
      className={className}
      type={type}
      value={value}
      name={name}
      onChange={(event) => onChange(event.target.value)}
      id={id}
    />
  );
}

export default InputField;
