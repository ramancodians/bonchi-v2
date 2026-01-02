import React from 'react';
import {
  useFormContext,
  type RegisterOptions,
  type FieldValues,
} from 'react-hook-form';

interface RadioOption {
  value: string | number;
  label: string;
}

interface FormRadioGroupProps {
  name: string;
  label?: string;
  options: RadioOption[];
  validation?: RegisterOptions<FieldValues, string>;
  helpText?: string;
  containerClassName?: string;
  inline?: boolean;
}

export const FormRadioGroup: React.FC<FormRadioGroupProps> = ({
  name,
  label,
  options,
  validation,
  helpText,
  containerClassName = '',
  inline = false,
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
      <div className={inline ? 'flex gap-4' : 'space-y-2'}>
        {options.map((option) => (
          <label
            key={option.value}
            className="label cursor-pointer justify-start gap-3"
          >
            <input
              type="radio"
              {...register(name, validation)}
              value={option.value}
              className={`radio border-base-300 ${error ? 'radio-error' : ''}`}
            />
            <span className="label-text">{option.label}</span>
          </label>
        ))}
      </div>
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
