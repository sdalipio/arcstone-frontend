export default function Input({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  required = false,
  icon: Icon = null,
  error = null,
  disabled = false,
  rows = 3
}) {
  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    fontSize: '14px',
    fontFamily: 'var(--font-body)',
    background: 'var(--surface-base)',
    border: error ? '1.5px solid #F43F5E' : '1.5px solid var(--border-subtle)',
    borderRadius: '10px',
    color: 'var(--text-primary)',
    outline: 'none',
    transition: 'all 0.2s ease',
    ...(disabled && { opacity: 0.6, cursor: 'not-allowed' })
  };

  const textareaStyle = {
    ...inputStyle,
    resize: 'vertical',
    minHeight: '70px'
  };

  const handleFocus = (e) => {
    if (!error) {
      e.target.style.borderColor = '#4F8EF7';
      e.target.style.boxShadow = '0 0 0 2px rgba(79,142,247,0.1)';
    }
  };

  const handleBlur = (e) => {
    if (!error) {
      e.target.style.borderColor = 'var(--border-subtle)';
      e.target.style.boxShadow = 'none';
    }
  };

  const commonProps = {
    value: value || '',
    onChange,
    placeholder,
    required,
    disabled,
    onFocus: handleFocus,
    onBlur: handleBlur
  };

  return (
    <div style={{ width: '100%' }}>
      {label && (
        <label style={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          fontSize: '13px',
          fontWeight: 600,
          color: 'var(--text-secondary)',
          marginBottom: '6px',
        }}>
          {Icon && <Icon size={13} strokeWidth={2} />}
          {label}
          {required && <span style={{ color: '#F43F5E', marginLeft: '1px' }}>*</span>}
        </label>
      )}
      
      {type === 'textarea' ? (
        <textarea
          rows={rows}
          style={textareaStyle}
          {...commonProps}
        />
      ) : (
        <div style={{ position: 'relative' }}>
          <input
            type={type}
            style={inputStyle}
            {...commonProps}
          />
        </div>
      )}
      
      {error && (
        <p style={{
          fontSize: '11px',
          color: '#F43F5E',
          marginTop: '4px',
          marginBottom: 0,
        }}>
          {error}
        </p>
      )}
    </div>
  );
}