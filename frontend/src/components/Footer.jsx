import { Link } from 'react-router-dom';
import { CONTACT } from '../data/services';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h3>Speed Solution</h3>
          <p>
            Fast, guided help for government, legal, financial, and insurance services.
            Built for a smooth experience on desktop and mobile.
          </p>
        </div>

        <div>
          <h4>Quick Links</h4>
          <div className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/enquiry">Enquiry</Link>
            <Link to="/login">Login</Link>
          </div>
        </div>

        <div>
          <h4>Contact</h4>
          <p>{CONTACT.phone}</p>
          <p>{CONTACT.email}</p>
          <p>{CONTACT.location}</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 Speed Solution. All rights reserved.</p>
        <p>Disclaimer: Do not collect Aadhaar numbers or personal documents directly through the public form.</p>
      </div>
    </footer>
  );
}
