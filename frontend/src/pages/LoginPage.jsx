import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { api } from '../services/api';
import { setAuthSession } from '../services/auth';

const initialState = { email: '', password: '' };

export default function LoginPage() {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();

  const fields = [
    { name: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
    { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter password' }
  ];

  const onChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setServerError('');
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!values.email) nextErrors.email = 'Email is required.';
    if (!values.password) nextErrors.password = 'Password is required.';
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    try {
      const data = await api.login(values);
      setAuthSession(data);
      navigate(data.user.is_admin ? '/admin' : '/');
    } catch (error) {
      setServerError(error.message);
    }
  };

  return (
    <>
      <AuthForm
        title="Login"
        subtitle="Use your account or the seeded admin account from the README."
        fields={fields}
        values={values}
        errors={errors}
        onChange={onChange}
        onSubmit={onSubmit}
        submitLabel="Login"
        footer={(
          <div className="auth-footer-stack">
            <p className="auth-footer">No account yet? <Link to="/register">Register here</Link></p>
            <p className="auth-footer"><Link to="/forgot-password">Forgot password?</Link></p>
          </div>
        )}
      />
      {serverError && <p className="status-error centered">{serverError}</p>}
    </>
  );
}
