import { useEffect, useMemo, useState } from 'react';
import { api } from '../services/api';
import { getStoredUser } from '../services/auth';

export default function AdminPage() {
  const [summary, setSummary] = useState(null);
  const [enquiries, setEnquiries] = useState([]);
  const [search, setSearch] = useState('');
  const [requestType, setRequestType] = useState('');
  const [message, setMessage] = useState('');
  const user = getStoredUser();

  async function refreshData() {
    const [summaryData, enquiryData] = await Promise.all([
      api.getAdminSummary(),
      api.getAdminEnquiries()
    ]);
    setSummary(summaryData.summary);
    setEnquiries(enquiryData.enquiries);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        await refreshData();
      } catch (error) {
        setMessage(error.message || 'Only admin accounts can view enquiry details.');
      }
    }
    fetchData();
  }, []);

  const handleMarkCompleted = async (id) => {
    try {
      setMessage('');
      await api.markEnquiryCompleted(id);
      await refreshData();
      setMessage('Enquiry marked as completed. Completed records auto-delete after 10 days.');
    } catch (error) {
      setMessage(error.message || 'Could not update enquiry.');
    }
  };

  const filtered = useMemo(() => {
    return enquiries.filter((item) => {
      const matchesSearch = !search || [item.name, item.phone, item.service_type].join(' ').toLowerCase().includes(search.toLowerCase());
      const matchesType = !requestType || item.request_type === requestType;
      return matchesSearch && matchesType;
    });
  }, [enquiries, search, requestType]);

  if (!user?.is_admin) {
    return (
      <section className="section container centered-card">
        <div className="info-card">
          <h1>Access denied</h1>
          <p>Please log in with an admin account to view this page.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section container">
      <div className="section-head narrow">
        <span className="section-tag">Admin dashboard</span>
        <h1>Manage stored enquiries</h1>
        <p>This page reads real records from the backend database instead of browser-only storage.</p>
      </div>

      {message && <p className="status-info centered">{message}</p>}

      {summary && (
        <div className="stats-strip admin-stats">
          <div className="stat-card"><strong>{summary.total_enquiries}</strong><span>Total enquiries</span></div>
          <div className="stat-card"><strong>{summary.pending_enquiries}</strong><span>Pending enquiries</span></div>
          <div className="stat-card"><strong>{summary.completed_enquiries}</strong><span>Completed</span></div>
          <div className="stat-card"><strong>{summary.unique_services}</strong><span>Unique services</span></div>
        </div>
      )}

      <div className="toolbar">
        <input placeholder="Search by name, phone, or service" value={search} onChange={(e) => setSearch(e.target.value)} />
        <select value={requestType} onChange={(e) => setRequestType(e.target.value)}>
          <option value="">All Types</option>
          <option value="New">New</option>
          <option value="Update">Update</option>
        </select>
      </div>

      <div className="table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Age</th>
              <th>Service</th>
              <th>Type</th>
              <th>Status</th>
              <th>Message</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="9" className="table-empty">No enquiries found.</td>
              </tr>
            ) : filtered.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{item.age}</td>
                <td>{item.service_type}</td>
                <td>{item.request_type}</td>
                <td>
                  <span className={`pill ${item.status === 'Completed' ? 'pill-success' : ''}`}>{item.status || 'Pending'}</span>
                </td>
                <td>{item.message || '—'}</td>
                <td>{new Date(item.created_at).toLocaleString()}</td>
                <td>
                  {item.status !== 'Completed' ? (
                    <button className="btn btn-primary btn-small" onClick={() => handleMarkCompleted(item.id)}>
                      Mark Completed
                    </button>
                  ) : (
                    <span className="completed-note">Done</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
