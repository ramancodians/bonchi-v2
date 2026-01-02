import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { authUtils, useI18n } from '@bonchi/shared';

interface SupportFormData {
  // Personal Details
  fullName: string;
  mobileNumber: string;
  healthCardNumber: string;
  email: string;
  // Patient Details
  patientName: string;
  age: string;
  gender: string;
  relationship: string;
  // Treatment Details
  hospitalName: string;
  doctorName: string;
  treatmentType: string;
  estimatedCost: string;
  treatmentDate: string;
  // Additional Info
  description: string;
}

const UserSupport = () => {
  const { t } = useI18n();
  const user = authUtils.getUser();

  const [formData, setFormData] = useState<SupportFormData>({
    fullName: user?.name || '',
    mobileNumber: user?.phone || '',
    healthCardNumber: '',
    email: user?.email || '',
    patientName: '',
    age: '',
    gender: 'Male',
    relationship: '',
    hospitalName: '',
    doctorName: '',
    treatmentType: '',
    estimatedCost: '',
    treatmentDate: '',
    description: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Submit form data to API
    console.log('Form submitted:', formData);

    setTimeout(() => {
      setIsSubmitting(false);
      alert('Your support request has been submitted successfully!');
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>{t('page.support')} | Bonchi Cares</title>
      </Helmet>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Operation Support Form
          </h1>
          <p className="text-base-content/60 mt-1">
            Apply for financial support for medical operations
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Details */}
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="card-title text-lg mb-4">Personal Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">
                      Full Name <span className="text-error">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="input input-bordered"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">
                      Mobile Number <span className="text-error">*</span>
                    </span>
                  </label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    className="input input-bordered"
                    placeholder="Enter mobile number"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Health Card Number</span>
                  </label>
                  <input
                    type="text"
                    name="healthCardNumber"
                    value={formData.healthCardNumber}
                    onChange={handleChange}
                    className="input input-bordered"
                    placeholder="Enter health card number"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input input-bordered"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Patient Details */}
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="card-title text-lg mb-4">Patient Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">
                      Patient Name <span className="text-error">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleChange}
                    className="input input-bordered"
                    placeholder="Enter patient name"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">
                      Age <span className="text-error">*</span>
                    </span>
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="input input-bordered"
                    placeholder="Enter age"
                    min="0"
                    max="150"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">
                      Gender <span className="text-error">*</span>
                    </span>
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="select select-bordered"
                    aria-label="Select gender"
                    required
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">
                      Relationship <span className="text-error">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    name="relationship"
                    value={formData.relationship}
                    onChange={handleChange}
                    className="input input-bordered"
                    placeholder="Self / Family Member"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Treatment Details */}
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="card-title text-lg mb-4">Treatment Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Hospital Name</span>
                  </label>
                  <input
                    type="text"
                    name="hospitalName"
                    value={formData.hospitalName}
                    onChange={handleChange}
                    className="input input-bordered"
                    placeholder="Optional"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Doctor Name</span>
                  </label>
                  <input
                    type="text"
                    name="doctorName"
                    value={formData.doctorName}
                    onChange={handleChange}
                    className="input input-bordered"
                    placeholder="Optional"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">
                      Treatment Type <span className="text-error">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    name="treatmentType"
                    value={formData.treatmentType}
                    onChange={handleChange}
                    className="input input-bordered"
                    placeholder="e.g., Surgery, Chemotherapy"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">
                      Estimated Cost (₹) <span className="text-error">*</span>
                    </span>
                  </label>
                  <input
                    type="number"
                    name="estimatedCost"
                    value={formData.estimatedCost}
                    onChange={handleChange}
                    className="input input-bordered"
                    placeholder="Enter estimated cost"
                    min="0"
                    required
                  />
                </div>

                <div className="form-control md:col-span-2">
                  <label className="label">
                    <span className="label-text">Expected Treatment Date</span>
                  </label>
                  <input
                    type="date"
                    name="treatmentDate"
                    value={formData.treatmentDate}
                    onChange={handleChange}
                    className="input input-bordered"
                    aria-label="Select treatment date"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="card-title text-lg mb-4">
                Additional Information
              </h2>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    Description / Additional Details
                  </span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="textarea textarea-bordered h-32"
                  placeholder="Please provide any additional information about your case..."
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <button type="button" className="btn btn-ghost">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary"
            >
              {isSubmitting && (
                <span className="loading loading-spinner loading-sm"></span>
              )}
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserSupport;
