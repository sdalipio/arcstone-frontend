// src/components/home/slides/ContactSlide.jsx
import { useState, useEffect } from 'react';
import { Mail, Link, GitBranch, MapPin, Sparkles } from 'lucide-react';

const links = [
  {
    icon: Mail,
    label: 'Email',
    value: 'shaundylalipio@gmail.com',
    href: 'mailto:shaundylalipio@gmail.com',
    color: '#4F8EF7',
    bg: 'rgba(79,142,247,0.1)',
    border: 'rgba(79,142,247,0.25)',
  },
  {
    icon: Link,
    label: 'LinkedIn',
    value: 'linkedin.com/in/shaundyl-alipio-851080336',
    href: 'https://www.linkedin.com/in/shaundyl-alipio-851080336',
    color: '#22C989',
    bg: 'rgba(34,201,137,0.1)',
    border: 'rgba(34,201,137,0.25)',
  },
  {
    icon: GitBranch,
    label: 'GitHub',
    value: 'github.com/sdalipio',
    href: 'https://github.com/sdalipio',
    color: '#7C5CFC',
    bg: 'rgba(124,92,252,0.1)',
    border: 'rgba(124,92,252,0.25)',
  },
];

export default function ContactSlide({ isActive }) {
  const [visible, setVisible] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  useEffect(() => {
    if (isActive) setTimeout(() => setVisible(true), 150);
    else setVisible(false);
  }, [isActive]);

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(24px, 5vw, 40px) clamp(16px, 4vw, 40px)',
      boxSizing: 'border-box',
    }}>
      <div style={{
        maxWidth: '640px', width: '100%',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: 'clamp(20px, 4vw, 36px)', textAlign: 'center',
      }}>

        {/* Badge */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.9)',
          transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1)',
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '8px 20px', borderRadius: '99px',
          background: 'rgba(79,142,247,0.1)',
          border: '1px solid rgba(79,142,247,0.3)',
        }}>
          <Sparkles size={14} color="#4F8EF7" style={{ animation: 'sparkle 2s ease-in-out infinite' }} />
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#4F8EF7', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Open to Opportunities
          </span>
        </div>

        {/* Heading */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s',
        }}>
          <h2 style={{
            fontSize: 'clamp(26px, 5.5vw, 56px)', fontWeight: 900,
            letterSpacing: '-0.03em', margin: '0 0 16px 0', lineHeight: 1.1,
            background: 'linear-gradient(135deg, #ffffff 30%, #4F8EF7 100%)',
            backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent',
          }}>
            Let's Build Something
          </h2>
          <p style={{ fontSize: 'clamp(13px, 1.8vw, 16px)', color: 'rgba(160,174,192,0.75)', lineHeight: 1.7, margin: 0 }}>
            Looking for junior full-stack or AI-focused roles where I can grow, contribute, and ship great software.
            Always open to interesting conversations.
          </p>
        </div>

        {/* Location */}
        <div style={{
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.8s ease 0.25s',
          display: 'flex', alignItems: 'center', gap: '6px',
        }}>
          <MapPin size={13} color="rgba(160,174,192,0.5)" />
          <span style={{ fontSize: '12px', color: 'rgba(160,174,192,0.5)', fontWeight: 500 }}>
            Cebu City, Philippines · Open to Remote
          </span>
        </div>

        {/* Contact links */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {links.map((link, i) => {
            const Icon = link.icon;
            const isHov = hoveredLink === link.label;
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHoveredLink(link.label)}
                onMouseLeave={() => setHoveredLink(null)}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(24px)',
                  transition: `opacity 0.8s ease ${0.35 + i * 0.12}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${0.35 + i * 0.12}s, box-shadow 0.3s ease, border-color 0.3s ease, background 0.3s ease`,
                  display: 'flex', alignItems: 'center', gap: '14px',
                  padding: 'clamp(12px, 2vw, 16px) clamp(14px, 2.5vw, 20px)',
                  borderRadius: '14px',
                  background: isHov ? link.bg : 'rgba(13,13,31,0.7)',
                  border: `1px solid ${isHov ? link.color + '55' : 'rgba(255,255,255,0.08)'}`,
                  textDecoration: 'none',
                  backdropFilter: 'blur(12px)',
                  boxShadow: isHov ? `0 8px 32px ${link.color}22` : 'none',
                  cursor: 'pointer',
                }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '10px',
                  background: link.bg, border: `1px solid ${link.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Icon size={18} color={link.color} />
                </div>
                <div style={{ textAlign: 'left', minWidth: 0 }}>
                  <p style={{ fontSize: '11px', fontWeight: 700, color: link.color, margin: '0 0 2px 0', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    {link.label}
                  </p>
                  <p style={{
                    fontSize: 'clamp(11px, 1.5vw, 13px)',
                    color: 'rgba(160,174,192,0.8)', margin: 0, fontWeight: 500,
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>
                    {link.value}
                  </p>
                </div>
              </a>
            );
          })}
        </div>

        {/* Footer */}
        <div style={{
          opacity: visible ? 0.4 : 0,
          transition: 'opacity 1s ease 0.8s',
          fontSize: '11px', color: 'rgba(160,174,192,0.6)',
          letterSpacing: '0.06em',
        }}>
          Built with React · Designed with passion ✦
        </div>
      </div>

      <style>{`
        @keyframes sparkle {
          0%,100% { opacity:1; transform:scale(1) rotate(0deg); }
          50% { opacity:0.6; transform:scale(1.2) rotate(20deg); }
        }
      `}</style>
    </div>
  );
}