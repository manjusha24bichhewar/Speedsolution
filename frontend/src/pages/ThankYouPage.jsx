import { Link } from 'react-router-dom';

export default function ThankYouPage() {
  return (
    <section className="section container centered-card">
      <div className="success-card">
        <div className="success-icon">✅</div>
        <h1>Enquiry submitted successfully</h1>
        <p>Your request has been saved. The admin can now view it from the dashboard.</p>
        <div className="hero-actions centered">
          <Link to="/" className="btn btn-secondary">Back to Home</Link>
          <Link to="/services" className="btn btn-primary">View Services</Link>
        </div>
      </div>
    </section>
  );
}
