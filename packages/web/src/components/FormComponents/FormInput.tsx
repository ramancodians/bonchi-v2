import React from 'react';
import {
  useFormContext,
  type RegisterOptions,
  type FieldValues,
} from 'react-hook-form';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  validation?: RegisterOptions<FieldValues, string>;
  helpText?: string;
  containerClassName?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  validation,
  helpText,
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
      <input
        {...register(name, validation)}
        {...props}
        className={`input input-bordered border-base-300 w-full ${error ? 'input-error' : ''} ${className}`}
      />
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
