import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { LoginBackground, BonchiLogo } from '@bonchi/shared/assets';
import { useI18n } from '@bonchi/shared';
import { TbMail, TbArrowLeft, TbCheck } from 'react-icons/tb';
import AppFooter from '@/components/AppFooter';

const ForgotPassword = () => {
  const { t } = useI18n();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Implement forgot password API
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>{t('page.forgotPassword')} | Bonchi Cares</title>
      </Helmet>
      <div className="min-h-screen flex flex-col overflow-x-hidden">
        <div className="flex flex-1 flex-col md:flex-row">
          {/* Background Image */}
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

          {/* Form */}
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

                {/* Back Link */}
                <Link
                  to="/login"
                  className="btn btn-ghost btn-sm w-fit gap-2 mb-4"
                >
                  <TbArrowLeft className="text-lg" />
                  Back to Login
                </Link>

                {!isSubmitted ? (
                  <>
                    {/* Header */}
                    <div className="text-center mb-6">
                      <h1 className="text-2xl sm:text-3xl font-bold">
                        {t('auth.forgotPassword')}
                      </h1>
                      <p className="text-base-content/60 mt-2 text-sm">
                        Enter your email address and we'll send you a link to
                        reset your password.
                      </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
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

                      <button
                        type="submit"
                        disabled={isSubmitting || !email}
                        className="btn btn-primary w-full"
                      >
                        {isSubmitting && (
                          <span className="loading loading-spinner loading-sm"></span>
                        )}
                        {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                      </button>
                    </form>
                  </>
                ) : (
                  /* Success State */
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-success text-success-content rounded-full flex items-center justify-center mx-auto mb-4">
                      <TbCheck className="text-3xl" />
                    </div>
                    <h2 className="text-xl font-bold mb-2">Check Your Email</h2>
                    <p className="text-base-content/60 mb-6">
                      We've sent a password reset link to{' '}
                      <span className="font-semibold">{email}</span>
                    </p>
                    <Link to="/login" className="btn btn-primary">
                      Back to Login
                    </Link>
                  </div>
                )}

                {/* Divider */}
                {!isSubmitted && (
                  <>
                    <div className="divider text-base-content/40 text-sm">
                      OR
                    </div>

                    {/* Register Link */}
                    <div className="text-center">
                      <p className="text-base-content/70">
                        Remember your password?{' '}
                        <Link
                          to="/login"
                          className="link link-primary font-semibold"
                        >
                          {t('auth.login')}
                        </Link>
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="hidden md:block">
          <AppFooter />
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
