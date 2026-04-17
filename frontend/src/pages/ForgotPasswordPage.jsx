import { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

const initialState = {
  email: '',
  otp: '',
  newPassword: '',
  confirmPassword: ''
};

export default function ForgotPasswordPage() {
  const [values, setValues] = useState(initialState);
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setError('');
    setMessage('');
  };

  const requestOtp = async (event) => {
    event.preventDefault();
    if (!values.email.trim()) {
      setError('Email is required.');
      return;
    }
    setLoading(true);
    try {
      const data = await api.requestPasswordOtp({ email: values.email.trim() });
      setMessage(data.message || 'OTP sent successfully.');
      if (data.developer_otp) {
        setMessage(`${data.message} Demo OTP: ${data.developer_otp}`);
      }
      setStep(2);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (event) => {
    event.preventDefault();
    if (!values.otp.trim()) {
      setError('OTP is required.');
      return;
    }
    if (values.newPassword.length < 6) {
      setError('New password must be at least 6 characters.');
      return;
    }
    if (values.newPassword !== values.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const data = await api.resetPasswordWithOtp({
        email: values.email.trim(),
        otp: values.otp.trim(),
        new_password: values.newPassword
      });
      setMessage(data.message || 'Password reset successful.');
      setStep(3);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-section">
      <div className="auth-card">
        <h1>Forgot Password</h1>
        <p>Request an OTP on email, then set a new password.</p>

        {step === 1 && (
          <form onSubmit={requestOtp} className="form-grid">
            <label className="form-field">
              <span>Email</span>
              <input
                type="email"
                value={values.email}
                onChange={(event) => onChange('email', event.target.value)}
                placeholder="you@example.com"
              />
            </label>
            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={resetPassword} className="form-grid">
            <label className="form-field">
              <span>Email</span>
              <input type="email" value={values.email} readOnly />
            </label>
            <label className="form-field">
              <span>OTP</span>
              <input value={values.otp} onChange={(event) => onChange('otp', event.target.value)} placeholder="Enter 6-digit OTP" />
            </label>
            <label className="form-field">
              <span>New Password</span>
              <input type="password" value={values.newPassword} onChange={(event) => onChange('newPassword', event.target.value)} placeholder="Minimum 6 characters" />
            </label>
            <label className="form-field">
              <span>Confirm Password</span>
              <input type="password" value={values.confirmPassword} onChange={(event) => onChange('confirmPassword', event.target.value)} placeholder="Re-enter new password" />
            </label>
            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        )}

        {step === 3 && (
          <div className="info-card compact-card">
            <h2>Password updated</h2>
            <p>You can now log in with your new password.</p>
            <Link to="/login" className="btn btn-primary">Go to Login</Link>
          </div>
        )}

        {message && <p className="status-success centered">{message}</p>}
        {error && <p className="status-error centered">{error}</p>}
        <p className="auth-footer">Back to <Link to="/login">Login</Link></p>
      </div>
    </section>
  );
}
