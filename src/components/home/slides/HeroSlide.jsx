// src/components/home/slides/HeroSlide.jsx
import { useState, useEffect } from 'react';
import profilePhoto from '../../../assets/profile-photo.jpg';

const ROLES = [
  'Junior Software Engineer',
  'Full-Stack Developer',
  'AI / RAG Builder',
  'Problem Solver',
];

export default function HeroSlide({ isActive }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isActive) setTimeout(() => setVisible(true), 100);
    else setVisible(false);
  }, [isActive]);

  useEffect(() => {
    const current = ROLES[roleIndex];
    let timeout;
    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex]);

  const chips = ['C# / .NET', 'Python', 'Angular', 'React', 'LangChain', 'RAG'];

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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        maxWidth: '800px',
        width: '100%',
        gap: 'clamp(18px, 3vw, 28px)',
      }}>

        {/* Profile photo */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.9)',
          transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1)',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute', inset: '-6px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #4F8EF7, #7C5CFC, #06B6D4)',
            animation: 'spinGlow 4s linear infinite',
            zIndex: 0,
          }} />
          <div style={{
            position: 'absolute', inset: '-2px', borderRadius: '50%',
            background: '#05050F', zIndex: 1,
          }} />
          <img
            src={profilePhoto}
            alt="Shaundyl Alipio"
            style={{
              width: 'clamp(90px, 15vw, 130px)',
              height: 'clamp(90px, 15vw, 130px)',
              borderRadius: '50%',
              objectFit: 'cover',
              position: 'relative',
              zIndex: 2,
              display: 'block',
            }}
          />
        </div>

        {/* Name */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 0.9s cubic-bezier(0.16,1,0.3,1) 0.15s',
        }}>
          <h1 style={{
            fontSize: 'clamp(32px, 7vw, 72px)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            background: 'linear-gradient(135deg, #ffffff 0%, #A0AEC0 50%, #4F8EF7 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            lineHeight: 1.1,
            margin: 0,
          }}>
            Shaundyl Alipio
          </h1>
        </div>

        {/* Typewriter role */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.9s cubic-bezier(0.16,1,0.3,1) 0.3s',
          height: 'clamp(28px, 4vw, 36px)',
          display: 'flex',
          alignItems: 'center',
          gap: '2px',
        }}>
          <span style={{
            fontSize: 'clamp(14px, 2.5vw, 22px)',
            fontWeight: 600,
            color: '#4F8EF7',
            letterSpacing: '0.02em',
          }}>
            {displayed}
          </span>
          <span style={{
            display: 'inline-block',
            width: '3px',
            height: 'clamp(18px, 3vw, 26px)',
            background: 'linear-gradient(180deg, #4F8EF7, #7C5CFC)',
            borderRadius: '2px',
            animation: 'blink 1s infinite',
            marginLeft: '2px',
          }} />
        </div>

        {/* Tagline */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.9s cubic-bezier(0.16,1,0.3,1) 0.45s',
        }}>
          <p style={{
            fontSize: 'clamp(13px, 1.8vw, 16px)',
            color: 'rgba(160,174,192,0.8)',
            maxWidth: '560px',
            lineHeight: 1.7,
            margin: 0,
          }}>
            Building AI-powered applications and full-stack systems.
            Passionate about emerging technologies and scalable software solutions.
          </p>
        </div>

        {/* Tech chips */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.9s cubic-bezier(0.16,1,0.3,1) 0.6s',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          justifyContent: 'center',
          padding: '0 8px',
        }}>
          {chips.map((chip, i) => (
            <span key={chip} style={{
              padding: '5px 14px',
              borderRadius: '99px',
              fontSize: 'clamp(11px, 1.5vw, 12px)',
              fontWeight: 600,
              background: 'rgba(79,142,247,0.1)',
              border: '1px solid rgba(79,142,247,0.25)',
              color: '#4F8EF7',
              letterSpacing: '0.04em',
              animation: `chipFloat ${2.5 + i * 0.3}s ease-in-out infinite alternate`,
            }}>
              {chip}
            </span>
          ))}
        </div>

        {/* Scroll hint */}
        <div style={{
          opacity: visible ? 0.5 : 0,
          transition: 'opacity 1s ease 1.2s',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          marginTop: '4px',
        }}>
          <span style={{ fontSize: '11px', color: '#A0AEC0', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Scroll to explore
          </span>
          <div style={{
            width: '1px', height: '32px',
            background: 'linear-gradient(180deg, #4F8EF7, transparent)',
            animation: 'scrollPulse 1.8s ease-in-out infinite',
          }} />
        </div>
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes spinGlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes chipFloat { from{transform:translateY(0)} to{transform:translateY(-4px)} }
        @keyframes scrollPulse { 0%,100%{opacity:0.3;transform:scaleY(1)} 50%{opacity:1;transform:scaleY(1.2)} }
      `}</style>
    </div>
  );
}