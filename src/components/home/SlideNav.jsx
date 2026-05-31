// src/components/home/SlideNav.jsx
import { useState, useEffect } from 'react';

const SLIDES = [
  { id: 'hero', label: 'Intro' },
  { id: 'summary', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

export default function SlideNav({ activeSlide, onNavigate }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div style={{
      position: 'fixed',
      right: '28px',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 100,
      display: 'flex',
      flexDirection: 'column',
      gap: '14px',
      alignItems: 'center',
    }}>
      {SLIDES.map((slide, i) => {
        const isActive = activeSlide === slide.id;
        const isHovered = hovered === slide.id;
        return (
          <div
            key={slide.id}
            style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
            onMouseEnter={() => setHovered(slide.id)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Label tooltip */}
            <div style={{
              position: 'absolute',
              right: '24px',
              background: 'rgba(13,13,31,0.95)',
              border: '1px solid rgba(79,142,247,0.3)',
              borderRadius: '6px',
              padding: '4px 10px',
              fontSize: '11px',
              fontWeight: 600,
              color: isActive ? '#4F8EF7' : '#A0AEC0',
              whiteSpace: 'nowrap',
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? 'translateX(0)' : 'translateX(6px)',
              transition: 'all 0.2s ease',
              pointerEvents: 'none',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}>
              {slide.label}
            </div>

            {/* Dot */}
            <div
              onClick={() => onNavigate(slide.id)}
              style={{
                width: isActive ? '12px' : '8px',
                height: isActive ? '12px' : '8px',
                borderRadius: '50%',
                background: isActive
                  ? 'linear-gradient(135deg, #4F8EF7, #7C5CFC)'
                  : isHovered
                    ? 'rgba(79,142,247,0.6)'
                    : 'rgba(160,174,192,0.3)',
                border: isActive ? '2px solid rgba(79,142,247,0.5)' : '1px solid rgba(160,174,192,0.2)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: isActive ? '0 0 12px rgba(79,142,247,0.6)' : 'none',
              }}
            />
          </div>
        );
      })}
    </div>
  );
}