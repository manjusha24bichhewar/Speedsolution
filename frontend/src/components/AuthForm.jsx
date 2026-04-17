export default function AuthForm({ title, subtitle, fields, values, errors, onChange, onSubmit, submitLabel, footer }) {
  return (
    <section className="auth-section">
      <div className="auth-card">
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <form onSubmit={onSubmit} className="form-grid">
          {fields.map((field) => (
            <label key={field.name} className="form-field">
              <span>{field.label}</span>
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={values[field.name]}
                onChange={(event) => onChange(field.name, event.target.value)}
              />
              {errors[field.name] && <small className="field-error">{errors[field.name]}</small>}
            </label>
          ))}
          <button type="submit" className="btn btn-primary btn-block">{submitLabel}</button>
        </form>
        {footer}
      </div>
    </section>
  );
}
