// src/components/home/slides/ProjectsSlide.jsx
import { useState, useEffect, useRef } from 'react';
import { HardHat, BookOpen, ExternalLink } from 'lucide-react';
import budgetDashboard from '../../../assets/budget-tracker/budget-dashboard.png';
import sgPreview from '../../../assets/study-guide/studyguide-chat.png';

const projects = [
  {
    id: 'budget',
    icon: HardHat,
    title: 'Construction Budget Tracker',
    description: 'Full-stack expense management system for construction businesses. Showcases React, .NET 8, and PostgreSQL with real-time analytics.',
    features: ['Worker payroll tracking', 'Daily/Monthly expense views', 'Budget alerts', 'Visual analytics'],
    tech: ['React', '.NET 8', 'PostgreSQL', 'Tailwind CSS'],
    color: '#4F8EF7',
    bg: 'rgba(79,142,247,0.08)',
    border: 'rgba(79,142,247,0.2)',
    glow: 'rgba(79,142,247,0.15)',
    domain: 'budget-tracker.vercel.app',
    statusLabel: 'Completed',
    statusColor: '#22C989',
    preview: budgetDashboard,
  },
  {
    id: 'studyguide',
    icon: BookOpen,
    title: 'Study Guide AI',
    description: 'AI-powered learning platform that turns PDFs and Word docs into topic-based chat, summaries, flashcards, and quizzes using a RAG pipeline.',
    features: ['PDF & Word upload', 'Topic auto-detection', 'Chat with citations', 'Flashcards & quizzes'],
    tech: ['React', 'FastAPI', 'Groq', 'pgvector'],
    color: '#22C989',
    bg: 'rgba(34,201,137,0.08)',
    border: 'rgba(34,201,137,0.2)',
    glow: 'rgba(34,201,137,0.15)',
    domain: 'localhost:5173',
    statusLabel: 'Completed',
    statusColor: '#22C989',
    preview: sgPreview,
  },
];

function TiltCard({ project, visible, delay, onOpen }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const Icon = project.icon;

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -8, y: dx * 8 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpen(project.id)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${hovered ? -8 : 0}px)`
          : 'translateY(40px) scale(0.95)',
        transition: visible
          ? `opacity 0.8s ease ${delay}s, box-shadow 0.3s ease, transform 0.15s ease`
          : `opacity 0.8s ease ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        background: project.bg,
        border: `1px solid ${hovered ? project.color + '55' : project.border}`,
        borderRadius: '20px',
        padding: 'clamp(18px, 3vw, 24px)',
        cursor: 'pointer',
        backdropFilter: 'blur(12px)',
        boxShadow: hovered ? `0 20px 60px ${project.glow}, 0 0 0 1px ${project.color}33` : 'none',
        willChange: 'transform',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
      }}
    >
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{
          width: '48px', height: '48px', borderRadius: '13px',
          background: `${project.bg}`,
          border: `1px solid ${project.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Icon size={22} color={project.color} />
        </div>
        <span style={{
          fontSize: '10px', fontWeight: 700,
          padding: '4px 10px', borderRadius: '99px',
          background: `${project.statusColor}18`,
          border: `1px solid ${project.statusColor}44`,
          color: project.statusColor,
          letterSpacing: '0.06em', textTransform: 'uppercase',
          whiteSpace: 'nowrap',
        }}>
          {project.statusLabel}
        </span>
      </div>

      {/* Title + description */}
      <div>
        <h3 style={{ fontSize: 'clamp(15px, 2.5vw, 18px)', fontWeight: 800, color: '#ffffff', margin: '0 0 8px 0', letterSpacing: '-0.01em' }}>
          {project.title}
        </h3>
        <p style={{ fontSize: 'clamp(12px, 1.5vw, 13px)', color: 'rgba(160,174,192,0.8)', lineHeight: 1.6, margin: 0 }}>
          {project.description}
        </p>
      </div>

      {/* Screenshot preview */}
      {project.preview ? (
        <div style={{
          borderRadius: '10px', overflow: 'hidden',
          border: `1px solid ${project.color}22`,
          background: '#0D0D1F',
          opacity: hovered ? 1 : 0.85,
          transform: hovered ? 'scale(1.01)' : 'scale(1)',
          transition: 'all 0.3s ease',
        }}>
          {/* Mini browser chrome */}
          <div style={{
            background: 'rgba(13,13,31,0.9)',
            padding: '5px 10px',
            borderBottom: `1px solid ${project.color}18`,
            display: 'flex', alignItems: 'center', gap: '6px',
          }}>
            <div style={{ display: 'flex', gap: '4px' }}>
              {['#EF4444', '#F59E0B', '#22C989'].map(c => (
                <div key={c} style={{ width: '6px', height: '6px', borderRadius: '50%', background: c }} />
              ))}
            </div>
            <div style={{
              flex: 1, maxWidth: '140px', margin: '0 auto',
              background: 'rgba(255,255,255,0.04)',
              borderRadius: '3px', padding: '2px 8px',
              fontSize: '9px', color: 'rgba(160,174,192,0.4)',
              textAlign: 'center',
            }}>
              {project.domain}
            </div>
          </div>
          <img
            src={project.preview}
            alt={`${project.title} preview`}
            style={{
              width: '100%',
              height: '160px',
              objectFit: 'cover',
              objectPosition: 'top',
              display: 'block',
            }}
          />
        </div>
      ) : (
        /* Placeholder for projects without screenshots */
        <div style={{
          borderRadius: '10px',
          border: `1px dashed ${project.color}33`,
          background: `${project.color}06`,
          height: '100px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontSize: '12px', color: `${project.color}66`, fontWeight: 500 }}>
            Screenshots coming soon
          </span>
        </div>
      )}

      {/* Features */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {project.features.map(f => (
          <span key={f} style={{
            fontSize: '11px', padding: '3px 10px', borderRadius: '6px',
            background: `${project.color}15`, color: project.color,
            border: `1px solid ${project.color}25`,
            fontWeight: 500,
          }}>
            {f}
          </span>
        ))}
      </div>

      {/* Tech stack */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
        {project.tech.map(t => (
          <span key={t} style={{
            fontSize: '10px', padding: '2px 8px', borderRadius: '4px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(160,174,192,0.7)', fontWeight: 600,
            letterSpacing: '0.04em',
          }}>
            {t}
          </span>
        ))}
      </div>

      {/* CTA */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
        padding: '10px', borderRadius: '10px',
        background: `${project.color}18`,
        border: `1px solid ${project.color}33`,
        color: project.color, fontWeight: 600, fontSize: '13px',
        transition: 'background 0.2s ease',
      }}>
        View Project <ExternalLink size={13} />
      </div>
    </div>
  );
}

export default function ProjectsSlide({ isActive, onOpenProject }) {
  const [visible, setVisible] = useState(false);

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
      overflowY: 'auto',
    }}>
      <div style={{ maxWidth: '900px', width: '100%', display: 'flex', flexDirection: 'column', gap: 'clamp(24px, 4vw, 36px)' }}>

        {/* Header */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div style={{ width: '32px', height: '2px', background: 'linear-gradient(90deg, #7C5CFC, #4F8EF7)' }} />
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#7C5CFC', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Portfolio
            </span>
          </div>
          <h2 style={{
            fontSize: 'clamp(24px, 4.5vw, 44px)', fontWeight: 900,
            color: '#ffffff', letterSpacing: '-0.02em', margin: 0, lineHeight: 1.1,
          }}>
            Personal{' '}
            <span style={{
              background: 'linear-gradient(135deg, #7C5CFC, #4F8EF7)',
              backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent',
            }}>
              Projects
            </span>
          </h2>
          <p style={{ fontSize: 'clamp(12px, 1.5vw, 13px)', color: 'rgba(160,174,192,0.6)', marginTop: '8px' }}>
            Full-stack and AI portfolio projects currently in development. Click a card to see details and screenshots.
          </p>
        </div>

        {/* Cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
          gap: 'clamp(14px, 2.5vw, 20px)',
          alignItems: 'start',
        }}>
          {projects.map((project, i) => (
            <TiltCard
              key={project.id}
              project={project}
              visible={visible}
              delay={0.2 + i * 0.15}
              onOpen={onOpenProject}
            />
          ))}
        </div>
      </div>
    </div>
  );
}