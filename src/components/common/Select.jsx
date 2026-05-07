export default function Select({ 
    label, 
    value, 
    onChange, 
    options, 
    required = false,
    icon: Icon = null,
    error = null,
    disabled = false,
    placeholder = 'Select...'
  }) {
    const selectStyle = {
      width: '100%',
      padding: '10px 14px',
      fontSize: '14px',
      fontFamily: 'var(--font-body)',
      background: 'var(--surface-base)',
      border: error ? '1.5px solid #F43F5E' : '1.5px solid var(--border-subtle)',
      borderRadius: '10px',
      color: 'var(--text-primary)',
      outline: 'none',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s ease',
      ...(disabled && { opacity: 0.6 })
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
        
        <select
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          style={selectStyle}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          <option value="">{placeholder}</option>
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        
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