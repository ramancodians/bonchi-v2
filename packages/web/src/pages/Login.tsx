import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { LoginBackground, BonchiLogo } from '@bonchi/shared/assets';
import { useI18n, useEmailAuth, useOTPAuth } from '@bonchi/shared';
import { TbMail, TbPhone, TbLock, TbAlertCircle } from 'react-icons/tb';
import AppFooter from '@/components/AppFooter';

type LoginMethod = 'email' | 'phone';
type PhoneStep = 'phone' | 'otp';

const Login = () => {
  const { t } = useI18n();
  const navigate = useNavigate();

  // Login method and step
  const [loginMethod, setLoginMethod] = useState<LoginMethod>('phone');
  const [phoneStep, setPhoneStep] = useState<PhoneStep>('phone');

  // Email login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {
    login: emailLogin,
    loading: emailLoading,
    error: emailError,
  } = useEmailAuth();

  // Phone login
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const {
    sendOTP,
    verifyOTP,
    loading: otpLoading,
    error: otpError,
    resetSession,
  } = useOTPAuth();

  const validateIndianPhone = (phoneNumber: string): boolean => {
    // Indian phone number validation: 10 digits, can start with 6-9
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phoneNumber.replace(/\s/g, ''));
  };

  const handlePhoneChange = (value: string) => {
    // Remove non-numeric characters
    const cleaned = value.replace(/\D/g, '');
    setPhone(cleaned);

    if (cleaned.length > 0 && cleaned.length < 10) {
      setPhoneError('Phone number must be 10 digits');
    } else if (cleaned.length === 10 && !validateIndianPhone(cleaned)) {
      setPhoneError('Invalid Indian phone number');
    } else {
      setPhoneError('');
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await emailLogin(email, password);

    if (result.success) {
      navigate('/');
    }
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateIndianPhone(phone)) {
      const result = await sendOTP(phone);

      if (result.success) {
        setPhoneStep('otp');
      }
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await verifyOTP(phone, otp);

    if (result.success) {
      navigate('/');
    }
  };

  const handleBackToPhone = () => {
    setPhoneStep('phone');
    setOtp('');
    resetSession();
  };

  const handleMethodChange = (method: LoginMethod) => {
    setLoginMethod(method);
    setPhoneStep('phone');
    setOtp('');
    resetSession();
  };

  return (
    <>
      <Helmet>
        <title>{t('page.login')} | Bonchi Cares</title>
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

          {/* Login Form - Bottom half on mobile, left side on desktop */}
          <div className="w-full md:w-1/2 flex items-start md:items-center justify-center bg-base-200 p-4 sm:p-6 md:p-8 overflow-y-auto md:order-1">
            <div className="card w-full max-w-md bg-base-100 shadow-2xl">
              <div className="card-body p-6 sm:p-8">
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
                    {t('auth.login')}
                  </h1>
                  <p className="text-base-content/60 mt-2 text-sm">
                    Welcome back! Please sign in to continue
                  </p>
                </div>

                {/* Login Method Toggle - Using DaisyUI tabs */}
                <div
                  role="tablist"
                  className="tabs tabs-boxed bg-base-200 p-1 mb-6"
                >
                  <button
                    role="tab"
                    onClick={() => handleMethodChange('email')}
                    className={`tab flex-1 gap-2 transition-all ${
                      loginMethod === 'email'
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
                      loginMethod === 'phone'
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

                {/* Email Login Form */}
                {loginMethod === 'email' && (
                  <form onSubmit={handleEmailLogin} className="space-y-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">
                          {t('auth.email')}
                        </span>
                      </label>
                      <label className="input input-bordered flex items-center gap-2 focus-within:input-primary">
                        <TbMail className="text-base-content/40 text-lg" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="grow"
                          placeholder="Enter your email"
                          required
                        />
                      </label>
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">
                          {t('auth.password')}
                        </span>
                      </label>
                      <label className="input input-bordered flex items-center gap-2 focus-within:input-primary">
                        <TbLock className="text-base-content/40 text-lg" />
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="grow"
                          placeholder="Enter your password"
                          required
                        />
                      </label>
                    </div>

                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <label className="label cursor-pointer gap-2 p-0">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-primary checkbox-sm"
                        />
                        <span className="label-text">
                          {t('auth.rememberMe')}
                        </span>
                      </label>
                      <Link
                        to="/forgot-password"
                        className="link link-primary text-sm hover:link-hover"
                      >
                        {t('auth.forgotPassword')}
                      </Link>
                    </div>

                    <button
                      type="submit"
                      disabled={emailLoading}
                      className="btn btn-primary w-full mt-2"
                    >
                      {emailLoading && (
                        <span className="loading loading-spinner loading-sm"></span>
                      )}
                      {emailLoading ? 'Logging in...' : t('auth.login')}
                    </button>
                  </form>
                )}

                {/* Phone Login Form */}
                {loginMethod === 'phone' && phoneStep === 'phone' && (
                  <form onSubmit={handleSendOTP} className="space-y-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">
                          Phone Number
                        </span>
                      </label>
                      <label
                        className={`input input-bordered flex items-center gap-2 focus-within:input-primary ${phoneError ? 'input-error' : ''}`}
                      >
                        <TbPhone className="text-base-content/40 text-lg" />
                        <span className="font-medium text-base-content/60 border-r border-base-300 pr-2">
                          +91
                        </span>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => handlePhoneChange(e.target.value)}
                          className="grow"
                          placeholder="9876543210"
                          maxLength={10}
                          required
                        />
                      </label>
                      {phoneError && (
                        <label className="label">
                          <span className="label-text-alt text-error">
                            {phoneError}
                          </span>
                        </label>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={
                        otpLoading ||
                        !phone ||
                        phoneError !== '' ||
                        phone.length !== 10
                      }
                      className="btn btn-primary w-full mt-2"
                    >
                      {otpLoading && (
                        <span className="loading loading-spinner loading-sm"></span>
                      )}
                      {otpLoading ? 'Sending OTP...' : 'Send OTP'}
                    </button>
                  </form>
                )}

                {/* OTP Verification Form */}
                {loginMethod === 'phone' && phoneStep === 'otp' && (
                  <form onSubmit={handleVerifyOTP} className="space-y-4">
                    <div className="text-center bg-base-200 rounded-lg p-4 mb-4">
                      <p className="text-base-content/70">
                        OTP sent to{' '}
                        <span className="font-semibold text-base-content">
                          +91 {phone}
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

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">
                          Enter OTP
                        </span>
                      </label>
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) =>
                          setOtp(e.target.value.replace(/\D/g, ''))
                        }
                        className="input input-bordered w-full text-center text-2xl tracking-[0.5em] font-mono focus:input-primary"
                        placeholder="------"
                        maxLength={6}
                        required
                      />
                      <label className="label">
                        <span className="label-text-alt text-center w-full text-base-content/60">
                          Enter the 6-digit code sent to your phone
                        </span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={otpLoading || otp.length !== 6}
                      className="btn btn-primary w-full"
                    >
                      {otpLoading && (
                        <span className="loading loading-spinner loading-sm"></span>
                      )}
                      {otpLoading ? 'Verifying...' : 'Verify OTP'}
                    </button>

                    <button
                      type="button"
                      onClick={handleSendOTP}
                      disabled={otpLoading}
                      className="btn btn-ghost btn-sm w-full"
                    >
                      Didn't receive code? Resend OTP
                    </button>
                  </form>
                )}

                {/* Divider */}
                <div className="divider text-base-content/40 text-sm">OR</div>

                {/* Register Link */}
                <div className="text-center">
                  <p className="text-base-content/70">
                    Don't have an account?{' '}
                    <Link
                      to="/register"
                      className="link link-primary font-semibold"
                    >
                      {t('auth.register')}
                    </Link>
                  </p>
                </div>
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

export default Login;
