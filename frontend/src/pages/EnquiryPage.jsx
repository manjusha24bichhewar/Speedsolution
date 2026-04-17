import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SERVICES } from '../data/services';
import { api } from '../services/api';

export default function EnquiryPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const selectedService = searchParams.get('service') || '';
  const allServiceNames = useMemo(() => SERVICES.flatMap((group) => group.items.map((item) => item.name)), []);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    age: '',
    service_type: selectedService,
    request_type: 'New',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ loading: false, message: '' });

  const updateField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Full name is required.';
    if (!/^\d{10}$/.test(form.phone)) nextErrors.phone = 'Phone must be exactly 10 digits.';
    if (!form.age || Number(form.age) < 1 || Number(form.age) > 120) nextErrors.age = 'Enter a valid age.';
    if (!form.service_type) nextErrors.service_type = 'Please select a service.';
    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus({ loading: true, message: '' });
    try {
      await api.createEnquiry({
        ...form,
        age: Number(form.age)
      });
      navigate('/thank-you');
    } catch (error) {
      setStatus({ loading: false, message: error.message });
    }
  };

  return (
    <section className="section container">
      <div className="section-head narrow">
        <span className="section-tag">Quick enquiry</span>
        <h1>Submit your request</h1>
        <p>Your team can receive this request in the admin dashboard with real database storage.</p>
      </div>

      <div className="form-panel">
        <form className="form-grid two-col" onSubmit={handleSubmit}>
          <label className="form-field wide">
            <span>Full Name</span>
            <input value={form.name} onChange={(e) => updateField('name', e.target.value)} placeholder="Enter your full name" />
            {errors.name && <small className="field-error">{errors.name}</small>}
          </label>

          <label className="form-field">
            <span>Phone Number</span>
            <input value={form.phone} onChange={(e) => updateField('phone', e.target.value)} placeholder="10-digit mobile number" />
            {errors.phone && <small className="field-error">{errors.phone}</small>}
          </label>

          <label className="form-field">
            <span>Age</span>
            <input type="number" value={form.age} onChange={(e) => updateField('age', e.target.value)} placeholder="Enter age" />
            {errors.age && <small className="field-error">{errors.age}</small>}
          </label>

          <label className="form-field wide">
            <span>Service Type</span>
            <select value={form.service_type} onChange={(e) => updateField('service_type', e.target.value)}>
              <option value="">Select a service</option>
              {allServiceNames.map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
            {errors.service_type && <small className="field-error">{errors.service_type}</small>}
          </label>

          <label className="form-field">
            <span>Request Type</span>
            <select value={form.request_type} onChange={(e) => updateField('request_type', e.target.value)}>
              <option value="New">New</option>
              <option value="Update">Update</option>
            </select>
          </label>

          <label className="form-field wide">
            <span>Message</span>
            <textarea rows="5" value={form.message} onChange={(e) => updateField('message', e.target.value)} placeholder="Additional details about the request" />
          </label>

          {status.message && <p className="status-error wide">{status.message}</p>}

          <div className="wide action-row">
            <button type="submit" className="btn btn-primary" disabled={status.loading}>
              {status.loading ? 'Submitting...' : 'Submit Enquiry'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
