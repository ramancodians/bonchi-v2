import React from 'react';
import {
  useFormContext,
  type RegisterOptions,
  type FieldValues,
} from 'react-hook-form';

interface SelectOption {
  value: string | number;
  label: string;
}

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label?: string;
  options: SelectOption[];
  validation?: RegisterOptions<FieldValues, string>;
  helpText?: string;
  placeholder?: string;
  containerClassName?: string;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  name,
  label,
  options,
  validation,
  helpText,
  placeholder = 'Select an option',
  containerClassName = '',
  className = '',
  ...props
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
    <div className={`form-control w-full ${containerClassName}`}>
      {label && (
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
      )}
      <select
        {...register(name, validation)}
        {...props}
        className={`select select-bordered border-base-300 w-full ${error ? 'select-error' : ''} ${className}`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <label className="label">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
      {helpText && !error && (
        <label className="label">
          <span className="label-text-alt">{helpText}</span>
        </label>
      )}
    </div>
  );
};
