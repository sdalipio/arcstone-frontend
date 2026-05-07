import { Loader2 } from 'lucide-react';

const VARIANTS = {
  primary: {
    background: 'linear-gradient(135deg, #4F8EF7, #6B7AF7)',
    color: '#fff',
    border: 'none',
    boxShadow: '0 2px 8px rgba(79,142,247,0.35)',
    hoverShadow: '0 4px 14px rgba(79,142,247,0.45)',
  },
  secondary: {
    background: 'var(--surface-subtle)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-subtle)',
    boxShadow: 'none',
    hoverShadow: 'var(--shadow-sm)',
  },
  success: {
    background: 'linear-gradient(135deg, #22C989, #16B070)',
    color: '#fff',
    border: 'none',
    boxShadow: '0 2px 8px rgba(34,201,137,0.3)',
    hoverShadow: '0 4px 14px rgba(34,201,137,0.4)',
  },
  danger: {
    background: 'linear-gradient(135deg, #4F8EF7, #7C5CFC)',
    color: '#fff',
    border: 'none',
    boxShadow: '0 2px 8px rgba(79,142,247,0.3)',
    hoverShadow: '0 4px 14px rgba(79,142,247,0.4)',
  },
  outline: {
    background: 'transparent',
    color: '#4F8EF7',
    border: '1.5px solid #4F8EF7',
    boxShadow: 'none',
    hoverShadow: '0 2px 8px rgba(79,142,247,0.15)',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--text-secondary)',
    border: '1px solid var(--border-subtle)',
    boxShadow: 'none',
    hoverShadow: 'none',
  },
  glass: {
    background: 'rgba(255,255,255,0.7)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-subtle)',
    boxShadow: 'var(--shadow-sm)',
    hoverShadow: 'var(--shadow-md)',
  },
};

const SIZES = {
  sm: { padding: '6px 14px', fontSize: '13px', gap: '5px', iconSize: 14 },
  md: { padding: '9px 18px', fontSize: '14px', gap: '6px', iconSize: 16 },
  lg: { padding: '12px 22px', fontSize: '15px', gap: '7px', iconSize: 17 },
};

export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  icon: Icon = null,
  loading = false,
  disabled = false,
  className = '',
  type = 'button',
  fullWidth = false,
}) {
  const v = VARIANTS[variant] || VARIANTS.primary;
  const s = SIZES[size] || SIZES.md;
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: s.gap,
        padding: s.padding,
        fontSize: s.fontSize,
        fontWeight: 600,
        fontFamily: 'var(--font-body)',
        letterSpacing: '-0.1px',
        background: v.background,
        color: v.color,
        border: v.border || 'none',
        borderRadius: 'var(--radius-md)',
        boxShadow: hovered && !disabled ? v.hoverShadow : v.boxShadow,
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.55 : 1,
        transform: hovered && !disabled && !loading ? 'translateY(-1px)' : 'translateY(0)',
        width: fullWidth ? '100%' : undefined,
        whiteSpace: 'nowrap',
        outline: 'none',
      }}
    >
      {loading ? (
        <Loader2 size={s.iconSize} style={{ animation: 'spin 1s linear infinite' }} />
      ) : (
        <>
          {Icon && <Icon size={s.iconSize} strokeWidth={2} />}
          {children}
        </>
      )}
    </button>
  );
}

import { useState } from 'react';