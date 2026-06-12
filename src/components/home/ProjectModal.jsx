// src/components/home/ProjectModal.jsx
import { useEffect, useState, useRef } from 'react';
import { X, HardHat, BookOpen, CheckCircle2, ChevronLeft, ChevronRight, GitBranch, ExternalLink, Clock } from 'lucide-react';

import budgetLanding from '../../assets/budget-tracker/budget-landing.png';
import budgetLogin from '../../assets/budget-tracker/budget-login.png';
import budgetDashboard from '../../assets/budget-tracker/budget-dashboard.png';
import budgetWorkers from '../../assets/budget-tracker/budget-workers.png';
import budgetExpenses from '../../assets/budget-tracker/budget-expenses.png';
import budgetAnalytics from '../../assets/budget-tracker/budget-analytics.png';

import sgHome from '../../assets/study-guide/studyguide-home.png';
import sgTopics from '../../assets/study-guide/studyguide-topics.png';
import sgSelection from '../../assets/study-guide/studyguide-aiselection.png';
import sgChat from '../../assets/study-guide/studyguide-chat.png';
import sgSummary from '../../assets/study-guide/studyguide-summary.png';
import sgFlashcards from '../../assets/study-guide/studyguide-flashcards.png';
import sgQuiz from '../../assets/study-guide/studyguide-quiz.png';


const projectData = {
  budget: {
    icon: HardHat,
    title: 'Construction Budget Tracker',
    tagline: 'Full-stack expense management for construction businesses',
    color: '#4F8EF7',
    bg: 'rgba(79,142,247,0.08)',
    border: 'rgba(79,142,247,0.25)',
    domain: 'budget-tracker.vercel.app',
    statusLabel: 'Completed',
    statusColor: '#22C989',
    screenshots: [
      { src: budgetLanding, caption: 'Landing Page', sub: 'Public marketing page' },
      { src: budgetLogin, caption: 'Login', sub: 'Secure manager access' },
      { src: budgetDashboard, caption: 'Dashboard', sub: 'Overview, stats & spending charts' },
      { src: budgetWorkers, caption: 'Workers', sub: 'Payroll management per worker' },
      { src: budgetExpenses, caption: 'Expenses', sub: 'Cost tracking with filters & CSV export' },
      { src: budgetAnalytics, caption: 'Analytics', sub: 'Visual reports & category breakdown' }
    ],
    longDescription: 'A complete expense management system for construction businesses. This personal MVP project showcases full-stack development, database design, and UI/UX skills. The system tracks worker payroll, daily expenses, and provides visual budget analytics.',
    features: [
      'Worker payroll tracking with flexible pay periods',
      'Monthly and daily expense summary views',
      'Category-based expense management with custom categories',
      'Visual analytics dashboard with charts',
      'CSV export for all expense data',
    ],
    tech: ['React', '.NET 8', 'PostgreSQL', 'Tailwind CSS', 'Entity Framework', 'REST API'],
    goals: 'Demonstrate full-stack architecture skills with a real-world business use case that solves actual pain points for small construction businesses.',
    links: {
      demo: 'https://budget-tracker-roan-pi.vercel.app/',
      frontend: 'https://github.com/sdalipio/budget-tracker-frontend',
      backend: 'https://github.com/sdalipio/budget-tracker-api',
    },
  },
  studyguide: {
    icon: BookOpen,
    title: 'Study Guide AI',
    tagline: 'AI-powered learning from your own documents',
    color: '#22C989',
    bg: 'rgba(34,201,137,0.08)',
    border: 'rgba(34,201,137,0.25)',
    domain: 'localhost:5173',
    statusLabel: 'Completed',
    statusColor: '#22C989',
    screenshots: [
      { src: sgHome, caption: 'Library', sub: 'Upload PDFs & Word docs' },
      { src: sgTopics, caption: 'Topics', sub: 'Auto-detected from the document' },
      { src: sgSelection, caption: 'Topic Hub', sub: 'Four ways to study a topic' },
      { src: sgChat, caption: 'Chat', sub: 'RAG answers with citations' },
      { src: sgSummary, caption: 'Summary', sub: 'AI overview of the topic' },
      { src: sgFlashcards, caption: 'Flashcards', sub: 'Flip-card study deck' },
      { src: sgQuiz, caption: 'Quiz', sub: 'Scored multiple-choice' },
    ],
    longDescription: 'An AI-powered learning platform that turns uploaded PDF and Word documents into focused study tools. Each document is automatically segmented into topics; for any topic you can chat with the content (streaming answers grounded in the source, with citations), read an AI summary, study flashcards, and take scored quizzes. It demonstrates an end-to-end RAG pipeline — parse, chunk, embed, vector-search, and generate.',
    features: [
      'PDF & Word upload with automatic topic segmentation',
      'Chat with your document — streaming RAG answers with source citations',
      'AI-generated summaries per topic',
      'Interactive 3D flashcards with shuffle & generate-more',
      'Scored quizzes drawn from a growing question bank',
    ],
    tech: ['React', 'Vite', 'Python', 'FastAPI', 'LangChain', 'Groq (Llama 3.3)', 'PostgreSQL', 'pgvector', 'Framer Motion'],
    goals: 'Explore practical AI integration with RAG pipelines and demonstrate the ability to build an end-to-end, cost-free AI product from scratch — local embeddings, a pgvector store, and streaming LLM responses.',
    links: {
      demo: null,
      frontend: 'https://github.com/sdalipio/studyguide/tree/main/studyguide-frontend',
      backend: 'https://github.com/sdalipio/studyguide/tree/main/studyguide-api',
    },
  },
};

// ─── Screenshot Slideshow ────────────────────────────────────
function Slideshow({ screenshots, color, border, domain }) {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const goTo = (index) => {
    if (index === current) return;
    setFading(true);
    setTimeout(() => {
      setCurrent(index);
      setFading(false);
    }, 250);
  };

  const prev = () => goTo((current - 1 + screenshots.length) % screenshots.length);
  const next = () => goTo((current + 1) % screenshots.length);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent(prev => (prev + 1) % screenshots.length);
        setFading(false);
      }, 250);
    }, 4000);
    return () => clearInterval(timerRef.current);
  }, [paused, screenshots.length]);

  if (!screenshots.length) return null;

  const slide = screenshots[current];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ marginBottom: '28px' }}
    >
      {/* Main image */}
      <div style={{
        position: 'relative',
        borderRadius: '14px',
        overflow: 'hidden',
        border: `1px solid ${border}`,
        background: '#0D0D1F',
        aspectRatio: '16/9',
      }}>
        {/* Browser chrome bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, zIndex: 2,
          background: 'rgba(13,13,31,0.95)',
          borderBottom: `1px solid ${border}`,
          padding: '7px 12px',
          display: 'flex', alignItems: 'center', gap: '8px',
        }}>
          <div style={{ display: 'flex', gap: '5px' }}>
            {['#EF4444', '#F59E0B', '#22C989'].map(c => (
              <div key={c} style={{ width: '8px', height: '8px', borderRadius: '50%', background: c }} />
            ))}
          </div>
          <div style={{
            flex: 1, maxWidth: '200px', margin: '0 auto',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '4px', padding: '3px 10px',
            fontSize: '10px', color: 'rgba(160,174,192,0.5)',
            border: '1px solid rgba(255,255,255,0.08)',
            textAlign: 'center',
          }}>
            {domain}
          </div>
        </div>

        {/* Screenshot */}
        <img
          src={slide.src}
          alt={slide.caption}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top',
            display: 'block',
            opacity: fading ? 0 : 1,
            transform: fading ? 'scale(1.01)' : 'scale(1)',
            transition: 'opacity 0.25s ease, transform 0.25s ease',
            paddingTop: '30px',
            boxSizing: 'border-box',
          }}
        />

        {/* Prev / Next arrows */}
        {screenshots.length > 1 && (
          <>
            <button onClick={(e) => { e.stopPropagation(); prev(); }} style={{
              position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)',
              width: '32px', height: '32px', borderRadius: '50%',
              background: 'rgba(13,13,31,0.8)', border: `1px solid ${border}`,
              color: 'white', cursor: 'pointer', zIndex: 3,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.2s ease',
            }}
              onMouseEnter={e => e.currentTarget.style.background = `${color}55`}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(13,13,31,0.8)'}
            >
              <ChevronLeft size={16} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); next(); }} style={{
              position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)',
              width: '32px', height: '32px', borderRadius: '50%',
              background: 'rgba(13,13,31,0.8)', border: `1px solid ${border}`,
              color: 'white', cursor: 'pointer', zIndex: 3,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.2s ease',
            }}
              onMouseEnter={e => e.currentTarget.style.background = `${color}55`}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(13,13,31,0.8)'}
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}

        {/* Slide counter */}
        <div style={{
          position: 'absolute', bottom: '10px', right: '12px', zIndex: 3,
          background: 'rgba(13,13,31,0.75)',
          borderRadius: '99px', padding: '3px 9px',
          fontSize: '10px', fontWeight: 600, color: 'rgba(160,174,192,0.7)',
        }}>
          {current + 1} / {screenshots.length}
        </div>
      </div>

      {/* Caption */}
      <div style={{ textAlign: 'center', marginTop: '10px', marginBottom: '12px' }}>
        <span style={{ fontSize: '13px', fontWeight: 700, color: color }}>{slide.caption}</span>
        <span style={{ fontSize: '12px', color: 'rgba(160,174,192,0.5)', marginLeft: '6px' }}>— {slide.sub}</span>
      </div>

      {/* Dot indicators */}
      {screenshots.length > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '6px' }}>
          {screenshots.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} style={{
              width: i === current ? '20px' : '7px',
              height: '7px', borderRadius: '99px',
              background: i === current ? color : 'rgba(160,174,192,0.25)',
              border: 'none', cursor: 'pointer', padding: 0,
              transition: 'all 0.3s ease',
            }} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Modal ──────────────────────────────────────────────
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
        background: `rgba(5,5,15,${visible ? 0.88 : 0})`,
        backdropFilter: `blur(${visible ? 20 : 0}px)`,
        transition: 'all 0.35s ease',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px', boxSizing: 'border-box',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: '720px', width: '100%',
          maxHeight: '90vh', overflowY: 'auto',
          background: 'rgba(9,9,24,0.98)',
          border: `1px solid ${project.border}`,
          borderRadius: '24px',
          padding: '32px',
          boxShadow: `0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px ${project.color}22`,
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.96)',
          transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1)',
          position: 'relative',
          boxSizing: 'border-box',
        }}
      >
        {/* Close */}
        <button onClick={handleClose} style={{
          position: 'absolute', top: '18px', right: '18px',
          width: '34px', height: '34px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          color: '#A0AEC0', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.2s ease', zIndex: 10,
        }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#A0AEC0'; }}
        >
          <X size={15} />
        </button>

        {/* Project header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '20px', paddingRight: '40px' }}>
          <div style={{
            width: '52px', height: '52px', flexShrink: 0, borderRadius: '14px',
            background: project.bg, border: `1px solid ${project.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon size={24} color={project.color} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px', flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#ffffff', margin: 0, letterSpacing: '-0.02em' }}>
                {project.title}
              </h2>
              <span style={{
                fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '99px',
                background: `${project.statusColor}18`, border: `1px solid ${project.statusColor}44`,
                color: project.statusColor, textTransform: 'uppercase', letterSpacing: '0.06em',
              }}>
                {project.statusLabel}
              </span>
            </div>
            <p style={{ fontSize: '13px', color: project.color, margin: 0, fontWeight: 500 }}>{project.tagline}</p>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: `linear-gradient(90deg, ${project.color}44, transparent)`, marginBottom: '24px' }} />

        {/* Slideshow */}
        <Slideshow
          screenshots={project.screenshots}
          color={project.color}
          border={project.border}
          domain={project.domain}
        />

        {/* Description */}
        <div style={{ marginBottom: '22px' }}>
          <h4 style={{ fontSize: '11px', fontWeight: 700, color: project.color, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '10px' }}>Overview</h4>
          <p style={{ fontSize: '14px', lineHeight: 1.75, color: 'rgba(160,174,192,0.9)', margin: 0 }}>{project.longDescription}</p>
        </div>

        {/* Features */}
        <div style={{ marginBottom: '22px' }}>
          <h4 style={{ fontSize: '11px', fontWeight: 700, color: project.color, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>Key Features</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {project.features.map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle2 size={14} color={project.color} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '13px', color: 'rgba(160,174,192,0.85)', lineHeight: 1.5 }}>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech stack */}
        <div style={{ marginBottom: '22px' }}>
          <h4 style={{ fontSize: '11px', fontWeight: 700, color: project.color, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '10px' }}>Tech Stack</h4>
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
<div style={{ background: project.bg, border: `1px solid ${project.border}`, borderRadius: '12px', padding: '16px 20px', marginBottom: '22px' }}>
          <h4 style={{ fontSize: '11px', fontWeight: 700, color: project.color, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>Project Goal</h4>
          <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'rgba(160,174,192,0.8)', margin: 0 }}>{project.goals}</p>
        </div>

        {/* Links */}
        <div>
          <h4 style={{ fontSize: '11px', fontWeight: 700, color: project.color, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>Links</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>

            {/* Live Demo */}
            {project.links?.demo ? (
              <a href={project.links.demo} target="_blank" rel="noopener noreferrer" style={{
                display: 'flex', alignItems: 'center', gap: '7px',
                padding: '10px 18px', borderRadius: '10px',
                background: `${project.color}18`, border: `1px solid ${project.color}33`,
                color: project.color, fontSize: '13px', fontWeight: 600,
                textDecoration: 'none', transition: 'all 0.2s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = `${project.color}28`; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = `${project.color}18`; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <ExternalLink size={14} /> Live Demo
              </a>
            ) : (
              <div style={{
                display: 'flex', alignItems: 'center', gap: '7px',
                padding: '10px 18px', borderRadius: '10px',
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                color: 'rgba(160,174,192,0.4)', fontSize: '13px', fontWeight: 600,
              }}>
                <Clock size={14} /> Live Demo — Coming Soon
              </div>
            )}

            {/* Frontend Repo */}
            {project.links?.frontend ? (
              <a href={project.links.frontend} target="_blank" rel="noopener noreferrer" style={{
                display: 'flex', alignItems: 'center', gap: '7px',
                padding: '10px 18px', borderRadius: '10px',
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)',
                color: 'rgba(255,255,255,0.85)', fontSize: '13px', fontWeight: 600,
                textDecoration: 'none', transition: 'all 0.2s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <GitBranch size={14} /> Frontend Repo
              </a>
            ) : (
              <div style={{
                display: 'flex', alignItems: 'center', gap: '7px',
                padding: '10px 18px', borderRadius: '10px',
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                color: 'rgba(160,174,192,0.4)', fontSize: '13px', fontWeight: 600,
              }}>
                <Clock size={14} /> Frontend — Coming Soon
              </div>
            )}

            {/* Backend Repo */}
            {project.links?.backend ? (
              <a href={project.links.backend} target="_blank" rel="noopener noreferrer" style={{
                display: 'flex', alignItems: 'center', gap: '7px',
                padding: '10px 18px', borderRadius: '10px',
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)',
                color: 'rgba(255,255,255,0.85)', fontSize: '13px', fontWeight: 600,
                textDecoration: 'none', transition: 'all 0.2s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <GitBranch size={14} /> Backend Repo
              </a>
            ) : (
              <div style={{
                display: 'flex', alignItems: 'center', gap: '7px',
                padding: '10px 18px', borderRadius: '10px',
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                color: 'rgba(160,174,192,0.4)', fontSize: '13px', fontWeight: 600,
              }}>
                <Clock size={14} /> Backend — Coming Soon
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}