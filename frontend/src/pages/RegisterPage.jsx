import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { api } from '../services/api';
import { setAuthSession } from '../services/auth';

const initialState = { name: '', email: '', phone: '', password: '', confirmPassword: '' };

export default function RegisterPage() {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();

  const fields = [
    { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Enter your full name' },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
    { name: 'phone', label: 'Phone', type: 'text', placeholder: '10-digit number' },
    { name: 'password', label: 'Password', type: 'password', placeholder: 'Minimum 6 characters' },
    { name: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: 'Re-enter password' }
  ];

  const onChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setServerError('');
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!values.name.trim()) nextErrors.name = 'Name is required.';
    if (!/\S+@\S+\.\S+/.test(values.email)) nextErrors.email = 'Valid email is required.';
    if (!/^\d{10}$/.test(values.phone)) nextErrors.phone = 'Phone must be exactly 10 digits.';
    if (values.password.length < 6) nextErrors.password = 'Password must be at least 6 characters.';
    if (values.password !== values.confirmPassword) nextErrors.confirmPassword = 'Passwords do not match.';

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    try {
      const data = await api.register({
        name: values.name,
        email: values.email,
        phone: values.phone,
        password: values.password
      });
      setAuthSession(data);
      navigate('/');
    } catch (error) {
      setServerError(error.message);
    }
  };

  return (
    <>
      <AuthForm
        title="Register"
        subtitle="Create a user account to submit enquiries and use the full website flow."
        fields={fields}
        values={values}
        errors={errors}
        onChange={onChange}
        onSubmit={onSubmit}
        submitLabel="Create Account"
        footer={<p className="auth-footer">Already have an account? <Link to="/login">Login here</Link></p>}
      />
      {serverError && <p className="status-error centered">{serverError}</p>}
    </>
  );
}
