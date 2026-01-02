import { BonchiLogo } from '@bonchi/shared/assets';

const Loader = () => {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center">
      <img src={BonchiLogo} alt="Bonchi Cares" className="h-16 mb-6" />
      <span className="loading loading-spinner loading-lg text-primary"></span>
      <p className="mt-4 text-base-content/60">Loading...</p>
    </div>
  );
};

export default Loader;
