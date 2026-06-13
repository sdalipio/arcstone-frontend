// src/components/home/TopNav.jsx
import { useState, useEffect } from 'react';
import { GitBranch, Link as LinkIcon } from 'lucide-react';

const NAV = [
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

const SOCIAL = [
  { label: 'GitHub', href: 'https://github.com/sdalipio', icon: GitBranch },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/shaundyl-alipio-851080336', icon: LinkIcon },
];

// Collapses the nav to a compact, icon-first layout on phones.
function useIsMobile(breakpoint = 600) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= breakpoint : false
  );
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= breakpoint);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [breakpoint]);
  return isMobile;
}

export default function TopNav({ activeSlide, onNavigate }) {
  const [hovered, setHovered] = useState(null);
  const isMobile = useIsMobile();

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      height: '56px',
      padding: `0 ${isMobile ? '14px' : 'clamp(18px, 4vw, 32px)'}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: isMobile ? '8px' : '12px',
      background: 'rgba(5,5,15,0.7)',
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      {/* Name / home — full name on desktop, initials on mobile */}
      <button
        onClick={() => onNavigate('hero')}
        aria-label="Back to top"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          fontSize: isMobile ? '14px' : 'clamp(13px, 2vw, 15px)',
          fontWeight: 900,
          letterSpacing: '0.08em',
          color: '#ffffff',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}
      >
        {isMobile ? 'SA' : 'SHAUNDYL ALIPIO'}
      </button>

      {/* Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '12px' : 'clamp(8px, 1.5vw, 18px)' }}>
        {NAV.map(item => {
          const isActive = activeSlide === item.id;
          const isHov = hovered === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px 2px',
                fontSize: isMobile ? '12px' : 'clamp(11px, 1.6vw, 13px)',
                fontWeight: 600,
                letterSpacing: '0.04em',
                color: isActive ? '#4F8EF7' : isHov ? '#ffffff' : 'rgba(160,174,192,0.8)',
                transition: 'color 0.2s ease',
                whiteSpace: 'nowrap',
              }}
            >
              {item.label}
            </button>
          );
        })}

        {/* Divider */}
        <div style={{ width: '1px', height: '18px', background: 'rgba(255,255,255,0.12)' }} />

        {/* Social — icon + label on desktop, icon-only on mobile */}
        {SOCIAL.map(s => {
          const Icon = s.icon;
          const isHov = hovered === s.label;
          return (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              title={s.label}
              aria-label={s.label}
              onMouseEnter={() => setHovered(s.label)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                textDecoration: 'none',
                fontSize: 'clamp(11px, 1.6vw, 13px)',
                fontWeight: 600,
                color: isHov ? '#ffffff' : 'rgba(160,174,192,0.8)',
                transition: 'color 0.2s ease',
                whiteSpace: 'nowrap',
              }}
            >
              <Icon size={isMobile ? 18 : 15} />
              {!isMobile && <span>{s.label}</span>}
            </a>
          );
        })}
      </div>
    </div>
  );
}
