import React from 'react';
import { FormProvider, useForm, FieldErrors } from 'react-hook-form';
import {
  FormInput,
  FormTextarea,
  FormSelect,
  FormCheckbox,
  FormRadioGroup,
  requiredValidation,
  emailValidation,
  phoneValidation,
  minLengthValidation,
  maxLengthValidation,
  combineValidations,
} from '@/components/FormComponents';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  age: string;
  gender: string;
  country: string;
  bio: string;
  newsletter: boolean;
  terms: boolean;
}

const FormUIDemo: React.FC = () => {
  const methods = useForm<FormData>({
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      age: '',
      gender: '',
      country: '',
      bio: '',
      newsletter: false,
      terms: false,
    },
  });

  const onSubmit = (data: FormData) => {
    console.log('Form Data:', data);
    alert('Form submitted successfully! Check console for data.');
  };

  const onError = (errors: FieldErrors) => {
    console.error('Form Errors:', errors);
  };

  const countryOptions = [
    { value: 'india', label: 'India' },
    { value: 'usa', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'canada', label: 'Canada' },
    { value: 'australia', label: 'Australia' },
  ];

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="card bg-base-100 shadow-xl mb-8">
          <div className="card-body">
            <h1 className="card-title text-3xl">Form Components Demo</h1>
            <p>All form components using React Hook Form + DaisyUI</p>
            <div className="alert alert-info">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-current shrink-0 w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Fill out the form below to test all validation rules</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit(onSubmit, onError)}
                className="space-y-6"
              >
                {/* Text Inputs Section */}
                <div>
                  <h2 className="text-2xl font-bold mb-4">Text Inputs</h2>
                  <div className="space-y-4">
                    <FormInput
                      name="fullName"
                      label="Full Name"
                      placeholder="Enter your full name"
                      validation={combineValidations(
                        requiredValidation(),
                        minLengthValidation(3),
                        maxLengthValidation(50)
                      )}
                      helpText="Required: 3-50 characters"
                    />

                    <FormInput
                      name="email"
                      type="email"
                      label="Email Address"
                      placeholder="your.email@example.com"
                      validation={combineValidations(
                        requiredValidation(),
                        emailValidation()
                      )}
                      helpText="Required: Valid email format"
                    />

                    <FormInput
                      name="phone"
                      type="tel"
                      label="Phone Number"
                      placeholder="9876543210 or +919876543210"
                      validation={combineValidations(
                        requiredValidation(),
                        phoneValidation(
                          'Please enter a valid Indian phone number (10 digits)'
                        )
                      )}
                      helpText="Required: Indian phone number (10 digits, optionally with +91 or 91)"
                    />

                    <FormInput
                      name="age"
                      type="number"
                      label="Age"
                      placeholder="Enter your age"
                      validation={requiredValidation()}
                      helpText="Required field"
                    />
                  </div>
                </div>

                <div className="divider" />

                {/* Select Dropdown Section */}
                <div>
                  <h2 className="text-2xl font-bold mb-4">Select Dropdown</h2>
                  <FormSelect
                    name="country"
                    label="Country"
                    options={countryOptions}
                    placeholder="Choose your country"
                    validation={requiredValidation('Please select a country')}
                    helpText="Required field"
                  />
                </div>

                <div className="divider" />

                {/* Radio Buttons Section */}
                <div>
                  <h2 className="text-2xl font-bold mb-4">Radio Buttons</h2>
                  <FormRadioGroup
                    name="gender"
                    label="Gender"
                    options={genderOptions}
                    inline
                    validation={requiredValidation('Please select your gender')}
                    helpText="Required field"
                  />
                </div>

                <div className="divider" />

                {/* Textarea Section */}
                <div>
                  <h2 className="text-2xl font-bold mb-4">Textarea</h2>
                  <FormTextarea
                    name="bio"
                    label="Bio"
                    placeholder="Tell us about yourself..."
                    rows={4}
                    validation={combineValidations(
                      requiredValidation(),
                      minLengthValidation(
                        10,
                        'Bio must be at least 10 characters'
                      ),
                      maxLengthValidation(
                        200,
                        'Bio cannot exceed 200 characters'
                      )
                    )}
                    helpText="Required: 10-200 characters"
                  />
                </div>

                <div className="divider" />

                {/* Checkboxes Section */}
                <div>
                  <h2 className="text-2xl font-bold mb-4">Checkboxes</h2>
                  <div className="space-y-2">
                    <FormCheckbox
                      name="newsletter"
                      label="Subscribe to newsletter"
                      helpText="Optional: Receive updates via email"
                    />

                    <FormCheckbox
                      name="terms"
                      label="I agree to the terms and conditions"
                      validation={requiredValidation(
                        'You must accept the terms and conditions'
                      )}
                      helpText="Required field"
                    />
                  </div>
                </div>

                <div className="divider" />

                {/* Form Actions */}
                <div className="card-actions justify-end">
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => methods.reset()}
                  >
                    Reset Form
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Submit Form
                  </button>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>

        {/* Form State Debug Card */}
        <div className="card bg-base-100 shadow-xl mt-8">
          <div className="card-body">
            <h2 className="card-title">Form State (Debug)</h2>
            <div className="mockup-code">
              <pre>
                <code>{JSON.stringify(methods.watch(), null, 2)}</code>
              </pre>
            </div>
            {Object.keys(methods.formState.errors).length > 0 && (
              <div className="alert alert-error mt-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <h3 className="font-bold">Validation Errors:</h3>
                  <div className="text-xs">
                    {Object.entries(methods.formState.errors).map(
                      ([key, error]) => (
                        <div key={key}>
                          <strong>{key}:</strong> {error?.message}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Documentation Card */}
        <div className="card bg-base-100 shadow-xl mt-8">
          <div className="card-body">
            <h2 className="card-title">Usage Documentation</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-lg mb-2">
                  Available Components:
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    <code className="bg-base-200 px-2 py-1 rounded">
                      FormInput
                    </code>{' '}
                    - Text, email, tel, number, password inputs
                  </li>
                  <li>
                    <code className="bg-base-200 px-2 py-1 rounded">
                      FormTextarea
                    </code>{' '}
                    - Multi-line text input
                  </li>
                  <li>
                    <code className="bg-base-200 px-2 py-1 rounded">
                      FormSelect
                    </code>{' '}
                    - Dropdown select
                  </li>
                  <li>
                    <code className="bg-base-200 px-2 py-1 rounded">
                      FormCheckbox
                    </code>{' '}
                    - Single checkbox
                  </li>
                  <li>
                    <code className="bg-base-200 px-2 py-1 rounded">
                      FormRadioGroup
                    </code>{' '}
                    - Radio button group
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">
                  Available Validations:
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    <code className="bg-base-200 px-2 py-1 rounded">
                      requiredValidation()
                    </code>{' '}
                    - Required field
                  </li>
                  <li>
                    <code className="bg-base-200 px-2 py-1 rounded">
                      emailValidation()
                    </code>{' '}
                    - Email format
                  </li>
                  <li>
                    <code className="bg-base-200 px-2 py-1 rounded">
                      phoneValidation()
                    </code>{' '}
                    - Indian phone numbers
                  </li>
                  <li>
                    <code className="bg-base-200 px-2 py-1 rounded">
                      minLengthValidation(min)
                    </code>{' '}
                    - Minimum length
                  </li>
                  <li>
                    <code className="bg-base-200 px-2 py-1 rounded">
                      maxLengthValidation(max)
                    </code>{' '}
                    - Maximum length
                  </li>
                  <li>
                    <code className="bg-base-200 px-2 py-1 rounded">
                      combineValidations(...)
                    </code>{' '}
                    - Combine multiple validations
                  </li>
                </ul>
              </div>

              <div className="mockup-code text-sm">
                <pre data-prefix="$">
                  <code>
                    import {`{ FormProvider, useForm }`} from 'react-hook-form';
                  </code>
                </pre>
                <pre data-prefix="$">
                  <code>
                    import {`{ FormInput, requiredValidation }`} from
                    '@/components/FormComponents';
                  </code>
                </pre>
                <pre data-prefix=" ">
                  <code> </code>
                </pre>
                <pre data-prefix="$">
                  <code>const methods = useForm();</code>
                </pre>
                <pre data-prefix="$">
                  <code>&lt;FormProvider {`{...methods}`}&gt;</code>
                </pre>
                <pre data-prefix="$">
                  <code>
                    {'  '}&lt;form onSubmit={`{methods.handleSubmit(onSubmit)}`}
                    &gt;
                  </code>
                </pre>
                <pre data-prefix="$">
                  <code>
                    {'    '}&lt;FormInput name="email" validation=
                    {`{emailValidation()}`} /&gt;
                  </code>
                </pre>
                <pre data-prefix="$">
                  <code>{'  '}&lt;/form&gt;</code>
                </pre>
                <pre data-prefix="$">
                  <code>&lt;/FormProvider&gt;</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormUIDemo;
