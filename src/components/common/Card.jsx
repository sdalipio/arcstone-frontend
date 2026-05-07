/**
 * Card component
 * icon prop accepts a Lucide icon component: icon={CalendarDays}
 * Optionally pass iconColor / iconBg to tint the icon container.
 */
export default function Card({
  children,
  title,
  icon: Icon,
  iconColor = '#4F8EF7',
  iconBg = '#EBF2FF',
  action,
  className = '',
  elevated = false,
}) {
  return (
    <div
      className={className}
      style={{
        background: 'var(--surface-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: elevated ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        overflow: 'hidden',
      }}
    >
      {title && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 20px',
          borderBottom: '1px solid var(--border-subtle)',
          background: 'var(--surface-base)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {Icon && (
              <div style={{
                width: '28px', height: '28px',
                borderRadius: '7px',
                background: iconBg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Icon size={14} color={iconColor} strokeWidth={2.5} />
              </div>
            )}
            <h3 style={{
              fontSize: '14px',
              fontWeight: 700,
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-sans)',
              letterSpacing: '-0.2px',
            }}>
              {title}
            </h3>
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div style={{ padding: '20px' }}>{children}</div>
    </div>
  );
}