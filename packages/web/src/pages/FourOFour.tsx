import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BonchiLogo } from '@bonchi/shared/assets';
import { useI18n } from '@bonchi/shared';
import { TbHome, TbArrowLeft } from 'react-icons/tb';

const FourOFour = () => {
  const { t } = useI18n();

  return (
    <>
      <Helmet>
        <title>{t('page.notFound')} | Bonchi Cares</title>
      </Helmet>
      <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center p-4">
        {/* Logo */}
        <Link to="/" className="mb-8">
          <img src={BonchiLogo} alt="Bonchi Cares" className="h-16" />
        </Link>

        {/* 404 Illustration */}
        <div className="text-center mb-8">
          <h1 className="text-9xl font-bold text-primary">404</h1>
          <div className="text-6xl mb-4">🔍</div>
        </div>

        {/* Message */}
        <div className="text-center max-w-md mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            {t('page.notFound')}
          </h2>
          <p className="text-base-content/60">
            Oops! The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => window.history.back()}
            className="btn btn-outline btn-primary gap-2"
          >
            <TbArrowLeft className="text-xl" />
            {t('common.back')}
          </button>
          <Link to="/" className="btn btn-primary gap-2">
            <TbHome className="text-xl" />
            {t('nav.home')}
          </Link>
        </div>

        {/* Help Text */}
        <p className="mt-8 text-sm text-base-content/50">
          Need help?{' '}
          <Link to="/support" className="link link-primary">
            Contact Support
          </Link>
        </p>
      </div>
    </>
  );
};

export default FourOFour;
