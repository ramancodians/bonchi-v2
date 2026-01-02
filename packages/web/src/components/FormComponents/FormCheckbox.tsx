import React from 'react';
import {
  useFormContext,
  type RegisterOptions,
  type FieldValues,
} from 'react-hook-form';

interface FormCheckboxProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type'
> {
  name: string;
  label: string;
  validation?: RegisterOptions<FieldValues, string>;
  helpText?: string;
  containerClassName?: string;
}

export const FormCheckbox: React.FC<FormCheckboxProps> = ({
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
    <div className={`form-control ${containerClassName}`}>
      <label className="label cursor-pointer justify-start gap-3">
        <input
          type="checkbox"
          {...register(name, validation)}
          {...props}
          className={`checkbox border-base-300 ${error ? 'checkbox-error' : ''} ${className}`}
        />
        <span className="label-text">{label}</span>
      </label>
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
