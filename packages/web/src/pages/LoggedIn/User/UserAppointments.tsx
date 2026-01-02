import { Helmet } from 'react-helmet-async';
import { useI18n } from '@bonchi/shared';
import { TbCalendar, TbPhone } from 'react-icons/tb';

const UserAppointments = () => {
  const { t } = useI18n();
  const phoneNumber = '+91 88773 40862';

  return (
    <>
      <Helmet>
        <title>{t('page.appointments')} | Bonchi Cares</title>
      </Helmet>
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
          {/* Icon */}
          <div className="w-24 h-24 bg-primary text-primary-content rounded-2xl flex items-center justify-center">
            <TbCalendar className="text-5xl" />
          </div>

          {/* Title */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
              Book Your Appointment
            </h1>
            <p className="text-base-content/60">
              To schedule, reschedule, or check your appointments, please call
              us directly
            </p>
          </div>

          {/* Call Button */}
          <a
            href={`tel:${phoneNumber.replace(/\s/g, '')}`}
            className="btn btn-success btn-lg gap-2 px-8"
          >
            <TbPhone className="text-xl" />
            Call Us to Book Appointment
          </a>

          {/* Phone Number */}
          <div>
            <a
              href={`tel:${phoneNumber.replace(/\s/g, '')}`}
              className="text-xl sm:text-2xl font-bold text-primary hover:underline"
            >
              {phoneNumber}
            </a>
            <p className="text-base-content/60 text-sm mt-1">Available 24/7</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserAppointments;
