// src/components/home/ProjectModal.jsx
import { useEffect, useState } from 'react';
import { X, HardHat, BookOpen, ExternalLink, Wrench, CheckCircle2 } from 'lucide-react';

const projectData = {
  budget: {
    icon: HardHat,
    title: 'Construction Budget Tracker',
    tagline: 'Full-stack expense management for construction businesses',
    color: '#4F8EF7',
    bg: 'rgba(79,142,247,0.08)',
    border: 'rgba(79,142,247,0.25)',
    statusLabel: 'In Progress',
    statusColor: '#F59E0B',
    longDescription: 'A complete expense management system for construction businesses. This personal MVP project showcases full-stack development, database design, and UI/UX skills. The system tracks worker payroll, daily expenses, and provides visual budget analytics.',
    features: [
      'Worker payroll tracking with daily/weekly breakdowns',
      'Monthly and daily expense summary views',
      'Category-based budget alerts and thresholds',
      'Visual analytics dashboard with charts',
      'Role-based access for managers vs workers',
    ],
    tech: ['React', '.NET 8', 'PostgreSQL', 'Tailwind CSS', 'Entity Framework', 'REST API'],
    goals: 'Demonstrate full-stack architecture skills with a real-world business use case that solves actual pain points for small construction businesses.',
  },
  studyguide: {
    icon: BookOpen,
    title: 'Study Guide AI',
    tagline: 'AI-powered learning from your own documents',
    color: '#22C989',
    bg: 'rgba(34,201,137,0.08)',
    border: 'rgba(34,201,137,0.25)',
    statusLabel: 'Planning',
    statusColor: '#7C5CFC',
    longDescription: 'An AI-powered learning platform that creates study materials from uploaded PDFs. This project demonstrates interest in AI/ML and RAG pipelines — generating quizzes, flashcards, and summaries automatically from any document.',
    features: [
      'PDF upload and intelligent text parsing',
      'AI-generated questions from document content',
      'Interactive flashcard study system',
      'Timed quiz mode with scoring',
      'Progress tracking per document',
    ],
    tech: ['React', 'Python', 'FastAPI', 'OpenAI API', 'LangChain', 'ChromaDB'],
    goals: 'Explore practical AI integration with RAG pipelines, demonstrate ability to build end-to-end AI-powered products from scratch.',
  },
};

export default function ProjectModal({ projectId, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (projectId) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => setVisible(true), 20);
    } else {
      setVisible(false);
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [projectId]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  if (!projectId) return null;

  const project = projectData[projectId];
  if (!project) return null;
  const Icon = project.icon;

  return (
    <div
      onClick={handleClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: `rgba(5,5,15,${visible ? 0.85 : 0})`,
        backdropFilter: `blur(${visible ? 16 : 0}px)`,
        transition: 'all 0.3s ease',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px', boxSizing: 'border-box',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: '700px', width: '100%',
          maxHeight: '85vh', overflowY: 'auto',
          background: 'rgba(9,9,24,0.98)',
          border: `1px solid ${project.border}`,
          borderRadius: '24px',
          padding: '36px',
          boxShadow: `0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px ${project.color}22`,
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.96)',
          transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1)',
          position: 'relative',
          boxSizing: 'border-box',
        }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute', top: '20px', right: '20px',
            width: '36px', height: '36px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#A0AEC0', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#A0AEC0'; }}
        >
          <X size={16} />
        </button>

        {/* Project header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '24px', paddingRight: '40px' }}>
          <div style={{
            width: '56px', height: '56px', flexShrink: 0, borderRadius: '16px',
            background: project.bg, border: `1px solid ${project.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon size={26} color={project.color} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px', flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#ffffff', margin: 0, letterSpacing: '-0.02em' }}>
                {project.title}
              </h2>
              <span style={{
                fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '99px',
                background: `${project.statusColor}18`,
                border: `1px solid ${project.statusColor}44`,
                color: project.statusColor,
                textTransform: 'uppercase', letterSpacing: '0.06em',
              }}>
                {project.statusLabel}
              </span>
            </div>
            <p style={{ fontSize: '13px', color: project.color, margin: 0, fontWeight: 500 }}>
              {project.tagline}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: `linear-gradient(90deg, ${project.color}44, transparent)`, marginBottom: '24px' }} />

        {/* Description */}
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '11px', fontWeight: 700, color: project.color, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '10px' }}>
            Overview
          </h4>
          <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'rgba(160,174,192,0.9)', margin: 0 }}>
            {project.longDescription}
          </p>
        </div>

        {/* Features */}
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '11px', fontWeight: 700, color: project.color, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>
            Key Features
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {project.features.map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle2 size={15} color={project.color} style={{ flexShrink: 0, marginTop: '1px' }} />
                <span style={{ fontSize: '13.5px', color: 'rgba(160,174,192,0.85)', lineHeight: 1.5 }}>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech stack */}
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '11px', fontWeight: 700, color: project.color, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '10px' }}>
            Tech Stack
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {project.tech.map(t => (
              <span key={t} style={{
                fontSize: '12px', fontWeight: 600, padding: '5px 12px', borderRadius: '8px',
                background: project.bg, border: `1px solid ${project.border}`,
                color: project.color, letterSpacing: '0.04em',
              }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Goals */}
        <div style={{
          background: project.bg,
          border: `1px solid ${project.border}`,
          borderRadius: '12px', padding: '16px 20px',
        }}>
          <h4 style={{ fontSize: '11px', fontWeight: 700, color: project.color, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>
            Project Goal
          </h4>
          <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'rgba(160,174,192,0.8)', margin: 0 }}>
            {project.goals}
          </p>
        </div>
      </div>
    </div>
  );
}