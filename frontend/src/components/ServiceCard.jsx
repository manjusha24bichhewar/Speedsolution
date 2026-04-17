import { Link } from 'react-router-dom';

export default function ServiceCard({ service }) {
  return (
    <article className="service-card">
      <div className="service-icon">{service.emoji}</div>
      <h3>{service.category}</h3>
      <p>{service.items.length} services available</p>
      <ul className="service-list">
        {service.items.slice(0, 3).map((item) => (
          <li key={item.name}>{item.name}</li>
        ))}
      </ul>
      <Link to="/services" className="btn btn-secondary">View Services</Link>
    </article>
  );
}
