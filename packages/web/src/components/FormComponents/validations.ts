/**
 * Form validation utilities for React Hook Form
 */

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Indian phone number regex (10 digits, optionally starting with +91 or 91)
const INDIAN_PHONE_REGEX = /^(?:\+91|91)?[6-9]\d{9}$/;

/**
 * Validation rule for required fields
 */
export const requiredValidation = (message = 'This field is required') => ({
  required: message,
});

/**
 * Validation rule for email format
 */
export const emailValidation = (
  message = 'Please enter a valid email address'
) => ({
  pattern: {
    value: EMAIL_REGEX,
    message,
  },
});

/**
 * Validation rule for Indian phone numbers
 * Accepts: 9876543210, +919876543210, 919876543210
 */
export const phoneValidation = (
  message = 'Please enter a valid Indian phone number'
) => ({
  pattern: {
    value: INDIAN_PHONE_REGEX,
    message,
  },
});

/**
 * Validation rule for minimum length
 */
export const minLengthValidation = (min: number, message?: string) => ({
  minLength: {
    value: min,
    message: message || `Minimum ${min} characters required`,
  },
});

/**
 * Validation rule for maximum length
 */
export const maxLengthValidation = (max: number, message?: string) => ({
  maxLength: {
    value: max,
    message: message || `Maximum ${max} characters allowed`,
  },
});

/**
 * Validation rule for length range
 */
export const lengthRangeValidation = (
  min: number,
  max: number,
  message?: string
) => ({
  ...minLengthValidation(min, message),
  ...maxLengthValidation(max, message),
});

/**
 * Validation rule for custom pattern
 */
export const patternValidation = (pattern: RegExp, message: string) => ({
  pattern: {
    value: pattern,
    message,
  },
});

/**
 * Validation rule for minimum value (numbers)
 */
export const minValidation = (min: number, message?: string) => ({
  min: {
    value: min,
    message: message || `Minimum value is ${min}`,
  },
});

/**
 * Validation rule for maximum value (numbers)
 */
export const maxValidation = (max: number, message?: string) => ({
  max: {
    value: max,
    message: message || `Maximum value is ${max}`,
  },
});

/**
 * Combined validation builder
 */
export const combineValidations = (
  ...validations: Array<Record<string, unknown>>
) => {
  return validations.reduce((acc, curr) => ({ ...acc, ...curr }), {});
};
