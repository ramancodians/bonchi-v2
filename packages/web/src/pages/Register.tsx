import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FormProvider, useForm } from 'react-hook-form';
import { LoginBackground, BonchiLogo } from '@bonchi/shared/assets';
import { useI18n, useEmailAuth, useOTPAuth } from '@bonchi/shared';
import { TbMail, TbPhone, TbAlertCircle } from 'react-icons/tb';
import AppFooter from '@/components/AppFooter';
import {
  FormInput,
  FormTextarea,
  FormSelect,
  FormCheckbox,
  requiredValidation,
  emailValidation,
  phoneValidation,
  minLengthValidation,
  combineValidations,
} from '@/components/FormComponents';

type RegisterMethod = 'email' | 'phone';
type PhoneStep = 'phone' | 'otp';

interface EmailFormData {
  firstName: string;
  middleName?: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
  address?: string;
  district: string;
  state: string;
  gstNumber?: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER' | 'PREFER_NOT_TO_SAY';
  age?: string;
  terms: boolean;
}

interface PhoneFormData {
  firstName: string;
  middleName?: string;
  phone: string;
  email?: string;
  address?: string;
  district: string;
  state: string;
  gstNumber?: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER' | 'PREFER_NOT_TO_SAY';
  age?: string;
  terms: boolean;
}

interface OTPFormData {
  otp: string;
}

const Register = () => {
  const { t } = useI18n();
  const navigate = useNavigate();

  // Register method and step
  const [registerMethod, setRegisterMethod] = useState<RegisterMethod>('phone');
  const [phoneStep, setPhoneStep] = useState<PhoneStep>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');

  // Form methods for different forms
  const emailMethods = useForm<EmailFormData>({
    defaultValues: {
      firstName: '',
      middleName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      address: '',
      district: '',
      state: '',
      gstNumber: '',
      gender: 'MALE',
      age: '',
      terms: false,
    },
  });

  const phoneMethods = useForm<PhoneFormData>({
    defaultValues: {
      firstName: '',
      middleName: '',
      phone: '',
      email: '',
      address: '',
      district: '',
      state: '',
      gstNumber: '',
      gender: 'MALE',
      age: '',
      terms: false,
    },
  });

  const otpMethods = useForm<OTPFormData>({
    defaultValues: {
      otp: '',
    },
  });

  const {
    register: emailRegister,
    loading: emailLoading,
    error: emailError,
  } = useEmailAuth();

  const {
    sendOTP,
    verifyOTP,
    loading: otpLoading,
    error: otpError,
    resetSession,
  } = useOTPAuth();

  const handleEmailRegister = async (data: EmailFormData) => {
    if (data.password !== data.confirmPassword) {
      emailMethods.setError('confirmPassword', {
        message: 'Passwords do not match',
      });
      return;
    }

    const result = await emailRegister(data.email, data.password, {
      firstName: data.firstName,
      middleName: data.middleName,
      phone: data.phone,
      address: data.address,
      district: data.district,
      state: data.state,
      gstNumber: data.gstNumber,
      gender: data.gender,
      age: data.age ? parseInt(data.age) : undefined,
    });

    if (result.success) {
      navigate('/');
    }
  };

  const handleSendOTP = async (data: PhoneFormData) => {
    const result = await sendOTP(data.phone);

    if (result.success) {
      setPhoneNumber(data.phone);
      setPhoneStep('otp');
    }
  };

  const handleVerifyOTP = async (data: OTPFormData) => {
    const phoneData = phoneMethods.getValues();
    const result = await verifyOTP(phoneNumber, data.otp, {
      firstName: phoneData.firstName,
      middleName: phoneData.middleName,
      email: phoneData.email || undefined,
      address: phoneData.address,
      district: phoneData.district,
      state: phoneData.state,
      gstNumber: phoneData.gstNumber,
      gender: phoneData.gender,
      age: phoneData.age ? parseInt(phoneData.age) : undefined,
    });

    if (result.success) {
      navigate('/');
    }
  };

  const handleBackToPhone = () => {
    setPhoneStep('phone');
    otpMethods.reset();
    resetSession();
  };

  const handleMethodChange = (method: RegisterMethod) => {
    setRegisterMethod(method);
    setPhoneStep('phone');
    emailMethods.reset();
    phoneMethods.reset();
    otpMethods.reset();
    resetSession();
  };

  const genderOptions = [
    { value: 'MALE', label: 'Male' },
    { value: 'FEMALE', label: 'Female' },
    { value: 'OTHER', label: 'Other' },
    { value: 'PREFER_NOT_TO_SAY', label: 'Prefer not to say' },
  ];

  return (
    <>
      <Helmet>
        <title>{t('page.register')} | Bonchi Cares</title>
      </Helmet>
      <div className="min-h-screen flex flex-col overflow-x-hidden">
        <div className="flex flex-1 flex-col md:flex-row">
          {/* Background Image - Top half on mobile, right side on desktop */}
          <div className="w-full h-[40vh] md:h-auto md:w-1/2 relative md:order-2">
            <img
              src={LoginBackground}
              alt="Background"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <img
                src={BonchiLogo}
                alt="Bonchi Logo"
                className="h-20 sm:h-24 md:h-32 drop-shadow-lg md:hidden"
              />
            </div>
          </div>

          {/* Register Form - Bottom half on mobile, left side on desktop */}
          <div className="w-full md:w-1/2 flex items-start md:items-center justify-center bg-base-200 p-4 sm:p-6 md:p-8 overflow-y-auto md:order-1">
            <div className="w-full max-w-md">
              {/* Logo - Desktop only */}
              <div className="hidden md:flex justify-center mb-4">
                <img
                  src={BonchiLogo}
                  alt="Bonchi Logo"
                  className="h-16 sm:h-20"
                />
              </div>

              {/* Header */}
              <div className="text-center mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold">
                  {t('auth.register')}
                </h1>
                <p className="text-base-content/60 mt-2 text-sm">
                  Create your account to get started
                </p>
              </div>

              {/* Register Method Toggle - Using DaisyUI tabs */}
              <div
                role="tablist"
                className="tabs tabs-boxed bg-base-200 p-1 mb-6"
              >
                <button
                  role="tab"
                  onClick={() => handleMethodChange('email')}
                  className={`tab flex-1 gap-2 transition-all ${
                    registerMethod === 'email'
                      ? 'tab-active bg-primary text-primary-content rounded-lg'
                      : ''
                  }`}
                >
                  <TbMail className="text-lg" />
                  <span>Email</span>
                </button>
                <button
                  role="tab"
                  onClick={() => handleMethodChange('phone')}
                  className={`tab flex-1 gap-2 transition-all ${
                    registerMethod === 'phone'
                      ? 'tab-active bg-primary text-primary-content rounded-lg'
                      : ''
                  }`}
                >
                  <TbPhone className="text-lg" />
                  <span>Phone</span>
                </button>
              </div>

              {/* Error Display */}
              {(emailError || otpError) && (
                <div className="alert alert-error mb-4 shadow-md">
                  <TbAlertCircle className="text-xl flex-shrink-0" />
                  <span>{emailError || otpError}</span>
                </div>
              )}

              {/* Email Registration Form */}
              {registerMethod === 'email' && (
                <FormProvider {...emailMethods}>
                  <form
                    onSubmit={emailMethods.handleSubmit(handleEmailRegister)}
                    className="space-y-4"
                  >
                    {/* First Name & Middle Name */}
                    <div className="grid grid-cols-2 gap-4">
                      <FormInput
                        name="firstName"
                        label="First Name *"
                        placeholder="First name"
                        validation={combineValidations(
                          requiredValidation('First name is required'),
                          minLengthValidation(2, 'At least 2 characters')
                        )}
                      />
                      <FormInput
                        name="middleName"
                        label="Middle Name"
                        placeholder="Middle name"
                      />
                    </div>

                    {/* Email */}
                    <FormInput
                      name="email"
                      type="email"
                      label="Email *"
                      placeholder="your@email.com"
                      validation={combineValidations(
                        requiredValidation('Email is required'),
                        emailValidation()
                      )}
                    />

                    {/* Phone (Optional) */}
                    <FormInput
                      name="phone"
                      type="tel"
                      label="Phone (Optional)"
                      placeholder="9876543210"
                      validation={phoneValidation()}
                    />

                    {/* Password */}
                    <FormInput
                      name="password"
                      type="password"
                      label="Password *"
                      placeholder="Create password"
                      validation={combineValidations(
                        requiredValidation('Password is required'),
                        minLengthValidation(
                          6,
                          'Password must be at least 6 characters'
                        )
                      )}
                    />

                    {/* Confirm Password */}
                    <FormInput
                      name="confirmPassword"
                      type="password"
                      label="Confirm Password *"
                      placeholder="Confirm password"
                      validation={combineValidations(
                        requiredValidation('Please confirm your password'),
                        minLengthValidation(
                          6,
                          'Password must be at least 6 characters'
                        )
                      )}
                    />

                    {/* Address */}
                    <FormTextarea
                      name="address"
                      label="Address"
                      placeholder="Your address"
                      rows={2}
                    />

                    {/* District & State */}
                    <div className="grid grid-cols-2 gap-4">
                      <FormInput
                        name="district"
                        label="District *"
                        placeholder="District"
                        validation={requiredValidation('District is required')}
                      />
                      <FormInput
                        name="state"
                        label="State *"
                        placeholder="State"
                        validation={requiredValidation('State is required')}
                      />
                    </div>

                    {/* GST Number */}
                    <FormInput
                      name="gstNumber"
                      label="GST Number (Optional)"
                      placeholder="GST Number"
                    />

                    {/* Gender & Age */}
                    <div className="grid grid-cols-2 gap-4">
                      <FormSelect
                        name="gender"
                        label="Gender *"
                        options={genderOptions}
                        validation={requiredValidation('Gender is required')}
                      />
                      <FormInput
                        name="age"
                        type="number"
                        label="Age"
                        placeholder="Age"
                      />
                    </div>

                    <FormCheckbox
                      name="terms"
                      label={
                        (
                          <>
                            I agree to the{' '}
                            <Link to="/terms" className="link link-primary">
                              Terms of Service
                            </Link>{' '}
                            and{' '}
                            <Link to="/privacy" className="link link-primary">
                              Privacy Policy
                            </Link>
                          </>
                        ) as any
                      }
                      validation={requiredValidation(
                        'You must accept the terms and conditions'
                      )}
                    />

                    <button
                      type="submit"
                      disabled={emailLoading}
                      className="btn btn-primary w-full mt-2"
                    >
                      {emailLoading && (
                        <span className="loading loading-spinner loading-sm"></span>
                      )}
                      {emailLoading
                        ? 'Creating account...'
                        : t('auth.register')}
                    </button>
                  </form>
                </FormProvider>
              )}

              {/* Phone Registration Form */}
              {registerMethod === 'phone' && phoneStep === 'phone' && (
                <FormProvider {...phoneMethods}>
                  <form
                    onSubmit={phoneMethods.handleSubmit(handleSendOTP)}
                    className="space-y-4"
                  >
                    {/* First Name & Middle Name */}
                    <div className="grid grid-cols-2 gap-4">
                      <FormInput
                        name="firstName"
                        label="First Name *"
                        placeholder="First name"
                        validation={combineValidations(
                          requiredValidation('First name is required'),
                          minLengthValidation(2, 'At least 2 characters')
                        )}
                      />
                      <FormInput
                        name="middleName"
                        label="Middle Name"
                        placeholder="Middle name"
                      />
                    </div>

                    {/* Phone Number */}
                    <FormInput
                      name="phone"
                      type="tel"
                      label="Phone Number *"
                      placeholder="9876543210"
                      validation={combineValidations(
                        requiredValidation('Phone number is required'),
                        phoneValidation()
                      )}
                    />

                    {/* Email (Optional) */}
                    <FormInput
                      name="email"
                      type="email"
                      label="Email (Optional)"
                      placeholder="your@email.com"
                      validation={emailValidation()}
                    />

                    {/* Address */}
                    <FormTextarea
                      name="address"
                      label="Address"
                      placeholder="Your address"
                      rows={2}
                    />

                    {/* District & State */}
                    <div className="grid grid-cols-2 gap-4">
                      <FormInput
                        name="district"
                        label="District *"
                        placeholder="District"
                        validation={requiredValidation('District is required')}
                      />
                      <FormInput
                        name="state"
                        label="State *"
                        placeholder="State"
                        validation={requiredValidation('State is required')}
                      />
                    </div>

                    {/* GST Number */}
                    <FormInput
                      name="gstNumber"
                      label="GST Number (Optional)"
                      placeholder="GST Number"
                    />

                    {/* Gender & Age */}
                    <div className="grid grid-cols-2 gap-4">
                      <FormSelect
                        name="gender"
                        label="Gender *"
                        options={genderOptions}
                        validation={requiredValidation('Gender is required')}
                      />
                      <FormInput
                        name="age"
                        type="number"
                        label="Age"
                        placeholder="Age"
                      />
                    </div>

                    <FormCheckbox
                      name="terms"
                      label={
                        (
                          <>
                            I agree to the{' '}
                            <Link to="/terms" className="link link-primary">
                              Terms of Service
                            </Link>{' '}
                            and{' '}
                            <Link to="/privacy" className="link link-primary">
                              Privacy Policy
                            </Link>
                          </>
                        ) as any
                      }
                      validation={requiredValidation(
                        'You must accept the terms and conditions'
                      )}
                    />

                    <button
                      type="submit"
                      disabled={otpLoading}
                      className="btn btn-primary w-full mt-2"
                    >
                      {otpLoading && (
                        <span className="loading loading-spinner loading-sm"></span>
                      )}
                      {otpLoading ? 'Sending OTP...' : 'Send OTP'}
                    </button>
                  </form>
                </FormProvider>
              )}

              {/* OTP Verification Form */}
              {registerMethod === 'phone' && phoneStep === 'otp' && (
                <FormProvider {...otpMethods}>
                  <form
                    onSubmit={otpMethods.handleSubmit(handleVerifyOTP)}
                    className="space-y-4"
                  >
                    <div className="text-center bg-base-200 rounded-lg p-4 mb-4">
                      <p className="text-base-content/70">
                        OTP sent to{' '}
                        <span className="font-semibold text-base-content">
                          +91 {phoneNumber}
                        </span>
                      </p>
                      <button
                        type="button"
                        onClick={handleBackToPhone}
                        className="link link-primary text-sm mt-1"
                      >
                        Change number
                      </button>
                    </div>

                    <FormInput
                      name="otp"
                      type="text"
                      label="Enter OTP"
                      placeholder="------"
                      className="text-center text-2xl tracking-[0.5em] font-mono"
                      validation={combineValidations(
                        requiredValidation('OTP is required'),
                        minLengthValidation(6, 'OTP must be 6 digits')
                      )}
                      helpText="Enter the 6-digit code sent to your phone"
                    />

                    <button
                      type="submit"
                      disabled={otpLoading}
                      className="btn btn-primary w-full"
                    >
                      {otpLoading && (
                        <span className="loading loading-spinner loading-sm"></span>
                      )}
                      {otpLoading ? 'Verifying...' : 'Create Account'}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const phoneData = phoneMethods.getValues();
                        sendOTP(phoneData.phone);
                      }}
                      disabled={otpLoading}
                      className="btn btn-ghost btn-sm w-full"
                    >
                      Didn't receive code? Resend OTP
                    </button>
                  </form>
                </FormProvider>
              )}

              {/* Divider */}
              <div className="divider text-base-content/40 text-sm">OR</div>
              {/* Login Link */}
              <div className="text-center">
                <p className="text-base-content/70">
                  Already have an account?{' '}
                  <Link to="/login" className="link link-primary font-semibold">
                    {t('auth.login')}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Visible on desktop only */}
        <div className="hidden md:block">
          <AppFooter />
        </div>
      </div>
    </>
  );
};

export default Register;
