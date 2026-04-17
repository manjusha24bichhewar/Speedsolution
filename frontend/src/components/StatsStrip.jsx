const STATS = [
  { label: 'Happy Clients', value: '5000+' },
  { label: 'Popular Service Types', value: '18+' },
  { label: 'Average Response', value: '24 hrs' },
  { label: 'Mobile Friendly', value: '100%' }
];

export default function StatsStrip() {
  return (
    <section className="stats-strip container">
      {STATS.map((item) => (
        <div key={item.label} className="stat-card">
          <strong>{item.value}</strong>
          <span>{item.label}</span>
        </div>
      ))}
    </section>
  );
}
