// src/components/home/slides/ProjectsSlide.jsx
import { useState, useEffect, useRef, useCallback } from 'react';
import { HardHat, BookOpen, ExternalLink, ScanLine, Bot, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';
import budgetDashboard from '../../../assets/budget-tracker/budget-dashboard.png';
import sgPreview from '../../../assets/study-guide/studyguide-chat.png';
import rsPreview from '../../../assets/receipt-scanner/preview.png';
import raPreview from '../../../assets/research-agent/preview.png';
import nbaPreview from '../../../assets/nba-ai/preview.png';

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
    domain: 'studyguide.app',
    statusLabel: 'Completed',
    statusColor: '#22C989',
    preview: sgPreview,
  },
  {
    id: 'receiptscanner',
    icon: ScanLine,
    title: 'Receipt Scanner AI',
    description: 'Vision-AI expense tracker — snap a receipt and AI extracts merchant, items, and totals, categorizes the expense, and generates spending insights.',
    features: ['Photo → structured data (vision AI)', 'JWT auth & per-user data', 'Spending analytics & AI insights', '43 automated tests with CI'],
    tech: ['React', 'FastAPI', 'Groq Vision', 'Playwright'],
    color: '#14B8A6',
    bg: 'rgba(20,184,166,0.08)',
    border: 'rgba(20,184,166,0.2)',
    glow: 'rgba(20,184,166,0.15)',
    domain: 'github.com/sdalipio/receipt-scanner',
    statusLabel: 'Completed',
    statusColor: '#22C989',
    preview: rsPreview,
  },
  {
    id: 'researchagent',
    icon: Bot,
    title: 'Autonomous Research Agent',
    description: 'Agentic AI that plans its own multi-step research — autonomously calling web search and calculator tools, self-correcting, and streaming its reasoning live.',
    features: ['LangGraph tool-calling loop', 'Live reasoning timeline UI', 'Self-correction & guardrails', 'Source-cited answers'],
    tech: ['LangGraph', 'Groq', 'FastAPI', 'React'],
    color: '#8B5CF6',
    bg: 'rgba(139,92,246,0.08)',
    border: 'rgba(139,92,246,0.2)',
    glow: 'rgba(139,92,246,0.15)',
    domain: 'github.com/sdalipio/research-agent',
    statusLabel: 'Completed',
    statusColor: '#22C989',
    preview: raPreview,
  },
  {
    id: 'nbaai',
    icon: TrendingUp,
    title: 'NBA Betting AI',
    description: 'Machine-learning pipeline that predicts NBA outcomes with XGBoost, backtests the strategy over 3 seasons, and flags value bets against bookmaker odds.',
    features: ['XGBoost model (61% holdout accuracy)', 'Backtesting engine with Kelly sizing', 'Value-bet detection vs. implied odds', 'Streamlit analytics dashboard'],
    tech: ['Python', 'XGBoost', 'pandas', 'Streamlit'],
    color: '#F97316',
    bg: 'rgba(249,115,22,0.08)',
    border: 'rgba(249,115,22,0.2)',
    glow: 'rgba(249,115,22,0.15)',
    domain: 'github.com/sdalipio/nba-betting-ai',
    statusLabel: 'Completed',
    statusColor: '#22C989',
    preview: nbaPreview,
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
        height: '100%',
        boxSizing: 'border-box',
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

      {/* CTA — marginTop:auto pins it to the bottom so all cards align */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
        marginTop: 'auto',
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

// ─── Auto-flowing marquee carousel ───────────────────────────────
// Cards drift horizontally in a seamless loop (the list is rendered twice
// and the offset wraps at the halfway point). Pauses on hover/drag, arrows
// nudge one card at a time. Honors prefers-reduced-motion by not auto-drifting.
const DRIFT_SPEED = 22;   // px per second
const CARD_WIDTH = 380;   // fixed card width inside the strip
const CARD_GAP = 20;

function MarqueeCarousel({ children, cardCount }) {
  const trackRef = useRef(null);
  const offsetRef = useRef(0);
  const pausedRef = useRef(false);
  const dragRef = useRef(null); // { startX, startOffset, moved }
  const [reducedMotion, setReducedMotion] = useState(false);

  const loopWidth = cardCount * (CARD_WIDTH + CARD_GAP);

  const apply = useCallback((offset) => {
    // Wrap into [0, loopWidth) so the duplicated list loops seamlessly.
    const wrapped = ((offset % loopWidth) + loopWidth) % loopWidth;
    offsetRef.current = wrapped;
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${-wrapped}px)`;
    }
  }, [loopWidth]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = (e) => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return; // no auto-drift for reduced-motion users
    let raf;
    let last = performance.now();
    const tick = (now) => {
      const dt = (now - last) / 1000;
      last = now;
      if (!pausedRef.current && !dragRef.current) {
        apply(offsetRef.current + DRIFT_SPEED * dt);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [apply, reducedMotion]);

  const nudge = (dir) => apply(offsetRef.current + dir * (CARD_WIDTH + CARD_GAP));

  // Drag / swipe support (pointer events cover mouse + touch).
  const onPointerDown = (e) => {
    dragRef.current = { startX: e.clientX, startOffset: offsetRef.current, moved: false };
  };
  const onPointerMove = (e) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    if (Math.abs(dx) > 5) dragRef.current.moved = true;
    apply(dragRef.current.startOffset - dx);
  };
  const endDrag = (e) => {
    if (dragRef.current?.moved) {
      // Swallow the click that follows a drag so cards don't open accidentally.
      e.currentTarget.setAttribute('data-just-dragged', '1');
      setTimeout(() => e.currentTarget?.removeAttribute('data-just-dragged'), 0);
    }
    dragRef.current = null;
  };

  const arrowStyle = {
    position: 'absolute', top: '50%', transform: 'translateY(-50%)', zIndex: 2,
    width: '38px', height: '38px', borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: 'rgba(15,18,32,0.85)', border: '1px solid rgba(255,255,255,0.15)',
    color: 'rgba(255,255,255,0.8)', cursor: 'pointer',
    transition: 'background 0.2s ease, border-color 0.2s ease',
  };

  return (
    <div
      style={{ position: 'relative' }}
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; dragRef.current = null; }}
    >
      <button aria-label="Previous project" style={{ ...arrowStyle, left: '-14px' }}
        onClick={() => nudge(-1)}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(124,92,252,0.3)'; e.currentTarget.style.borderColor = 'rgba(124,92,252,0.6)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(15,18,32,0.85)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}
      >
        <ChevronLeft size={19} />
      </button>
      <button aria-label="Next project" style={{ ...arrowStyle, right: '-14px' }}
        onClick={() => nudge(1)}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(124,92,252,0.3)'; e.currentTarget.style.borderColor = 'rgba(124,92,252,0.6)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(15,18,32,0.85)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}
      >
        <ChevronRight size={19} />
      </button>

      <div
        style={{
          overflow: 'hidden',
          // Soft fade at the edges so cards visibly "flow" in and out.
          WebkitMaskImage: 'linear-gradient(90deg, transparent, black 6%, black 94%, transparent)',
          maskImage: 'linear-gradient(90deg, transparent, black 6%, black 94%, transparent)',
          cursor: 'grab',
          touchAction: 'pan-y',
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={(e) => {
          if (e.currentTarget.getAttribute('data-just-dragged')) {
            e.stopPropagation();
            e.preventDefault();
          }
        }}
      >
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            gap: `${CARD_GAP}px`,
            width: 'max-content',
            willChange: 'transform',
            padding: '8px 0 16px',
          }}
        >
          {children}
        </div>
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
      <div style={{ maxWidth: '1060px', width: '100%', display: 'flex', flexDirection: 'column', gap: 'clamp(24px, 4vw, 36px)' }}>

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
            Selected full-stack and AI projects. Click a card for details, screenshots, and a demo.
          </p>
        </div>

        {/* Flowing card strip — auto-drifts, pauses on hover, drag or use arrows */}
        <MarqueeCarousel cardCount={projects.length}>
          {[...projects, ...projects].map((project, i) => (
            <div key={`${project.id}-${i}`} style={{ flex: `0 0 ${CARD_WIDTH}px`, width: `${CARD_WIDTH}px`, display: 'flex' }}>
              <TiltCard
                project={project}
                visible={visible}
                delay={0.2 + (i % projects.length) * 0.12}
                onOpen={onOpenProject}
              />
            </div>
          ))}
        </MarqueeCarousel>
      </div>
    </div>
  );
}