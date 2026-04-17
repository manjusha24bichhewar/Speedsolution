import { Link } from 'react-router-dom';
import { SERVICES } from '../data/services';

export default function ServicesPage() {
  return (
    <section className="section container">
      <div className="section-head narrow">
        <span className="section-tag">Service catalogue</span>
        <h1>All available services</h1>
        <p>Each category is grouped clearly so users can quickly choose the correct request type.</p>
      </div>

      <div className="services-stack">
        {SERVICES.map((group) => (
          <article key={group.id} className="category-panel">
            <div className="category-head">
              <div>
                <span className="category-icon">{group.emoji}</span>
                <h2>{group.category}</h2>
              </div>
              <span className="pill">{group.items.length} services</span>
            </div>

            <div className="mini-card-grid">
              {group.items.map((item) => (
                <div key={item.name} className="mini-service-card">
                  <h3>{item.name}</h3>
                  <p>{item.desc}</p>
                  <Link to={`/enquiry?service=${encodeURIComponent(item.name)}`} className="btn btn-secondary btn-small">
                    Enquire Now
                  </Link>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
