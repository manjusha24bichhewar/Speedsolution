import { Link } from 'react-router-dom';
import { CONTACT, SERVICES } from '../data/services';
import ServiceCard from '../components/ServiceCard';
import StatsStrip from '../components/StatsStrip';

export default function HomePage() {
  return (
    <>
      <section className="hero-section">
        <div className="container hero-grid">
          <div>
            <span className="hero-badge">Trusted services from New Mumbai</span>
            <h1>Modern service website for government, legal, finance and insurance needs.</h1>
            <p>
              Speed Solution helps people submit enquiries quickly, explore services with confidence,
              and connect with your team through a polished mobile-friendly experience.
            </p>
            <div className="hero-actions">
              <Link to="/services" className="btn btn-primary">Explore Services</Link>
              <Link to="/enquiry" className="btn btn-secondary">Submit Enquiry</Link>
            </div>
          </div>

          <div className="hero-panel">
            <h3>Why this is better</h3>
            <ul>
              <li>Your trusted partner for government, legal, financial & property services</li>
              <li>Easy enquiry process with quick expert support</li>
              <li>Accessible on mobile, tablet, and desktop</li>
              <li>Reliable service with fast turnaround time</li>
            </ul>
            
            <div className="contact-box">
              <strong>Contact</strong>
              <p>{CONTACT.phone}</p>
              <p>{CONTACT.email}</p>
              <p>{CONTACT.location}</p>
            </div>
          </div>
        </div>
      </section>

      <StatsStrip />

      <section className="section container">
        <div className="section-head">
          <div>
            <span className="section-tag">Featured categories</span>
            <h2>Services your users can browse easily</h2>
          </div>
        </div>

        <div className="card-grid">
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      <section className="section cta-banner container">
        <div>
          <span className="section-tag">Fast support</span>
          <h2>Need help right away?</h2>
          <p>Users can register, log in, submit an enquiry, and your admin can manage everything from one dashboard.</p>
        </div>
        <Link to="/register" className="btn btn-primary">Create Account</Link>
      </section>
    </>
  );
}
