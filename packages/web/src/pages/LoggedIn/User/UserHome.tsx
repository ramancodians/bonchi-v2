import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { authUtils, useI18n } from '@bonchi/shared';
import { BonchiLogo } from '@bonchi/shared/assets';
import { TbCalendar, TbDiscount, TbAmbulance, TbHeadset } from 'react-icons/tb';

const UserHome = () => {
  const { t } = useI18n();
  const user = authUtils.getUser();

  const quickActions = [
    {
      label: 'Book Appointment',
      icon: <TbCalendar className="text-2xl" />,
      path: '/appointments',
      color: 'bg-blue-500',
    },
    {
      label: 'Offers',
      icon: <TbDiscount className="text-2xl" />,
      path: '/offers',
      color: 'bg-orange-500',
    },
    {
      label: 'One-tap Ambulance',
      icon: <TbAmbulance className="text-2xl" />,
      path: 'tel:108',
      color: 'bg-red-500',
    },
  ];

  return (
    <>
      <Helmet>
        <title>{t('page.home')} | Bonchi Cares</title>
      </Helmet>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            {user?.name || 'User'}
          </h1>
        </div>

        {/* Health Card */}
        <div className="card bg-primary text-primary-content shadow-xl">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <img src={BonchiLogo} alt="Bonchi" className="w-6 h-6" />
              </div>
              <span className="font-semibold text-lg">Bonchi Cares</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-wider mb-4">
              BON6 0501 7
            </h2>

            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-primary-content/70 text-sm">Expires</p>
                <p className="font-semibold">Nov 2030</p>
              </div>
              <span className="badge badge-success badge-lg">ACTIVE</span>
            </div>

            <button className="btn bg-orange-500 hover:bg-orange-600 border-none text-white w-full">
              View Card Details
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              to={action.path}
              className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="card-body items-center text-center p-4">
                <div
                  className={`w-12 h-12 ${action.color} text-white rounded-xl flex items-center justify-center mb-2`}
                >
                  {action.icon}
                </div>
                <span className="text-xs sm:text-sm font-medium">
                  {action.label}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Loan Banner */}
        <button className="btn btn-lg w-full bg-orange-500 hover:bg-orange-600 border-orange-600 text-white font-bold uppercase tracking-wide">
          Get Instant Loan Approved with L&T Finance
        </button>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="card bg-base-100 shadow-md">
            <div className="card-body p-4">
              <p className="text-base-content/60 text-sm">Appointments</p>
              <p className="text-3xl font-bold">0</p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-md">
            <div className="card-body p-4">
              <p className="text-base-content/60 text-sm">Additional Members</p>
              <p className="text-3xl font-bold text-orange-500">0</p>
              <p className="text-xs text-base-content/60">(excl. you)</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link to="/appointments" className="btn btn-primary btn-lg gap-2">
            <TbCalendar className="text-xl" />
            Book Appointment
          </Link>
          <Link
            to="/support"
            className="btn btn-lg gap-2"
            style={{
              backgroundColor: '#7C3AED',
              borderColor: '#7C3AED',
              color: 'white',
            }}
          >
            <TbHeadset className="text-xl" />
            Operation Support
          </Link>
        </div>
      </div>
    </>
  );
};

export default UserHome;
