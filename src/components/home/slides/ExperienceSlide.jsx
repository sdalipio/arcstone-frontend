// src/components/home/slides/ExperienceSlide.jsx
import { useState, useEffect } from 'react';
import { MessageCircle, Calendar, Database, GitBranch } from 'lucide-react';

const experiences = [
  {
    icon: MessageCircle,
    color: '#4F8EF7',
    bg: 'rgba(79,142,247,0.1)',
    border: 'rgba(79,142,247,0.2)',
    title: 'AI-Powered Customer Support System',
    bullets: [
      'Architected three-tier system: Angular frontend + .NET API middleware + Python/FastAPI backend',
      'Built chatbot with LangChain RAG pipeline for FAQ responses and HR policy document querying',
      'Implemented ChromaDB knowledge base for undocumented internal systems',
      'Configured NSSM to run FastAPI as persistent Windows service',
    ],
  },
  {
    icon: Calendar,
    color: '#22C989',
    bg: 'rgba(34,201,137,0.1)',
    border: 'rgba(34,201,137,0.2)',
    title: 'Employee & Managerial View for Payroll System',
    bullets: [
      'Built employee self-service view for leave credits, attendance, and paydays',
      'Implemented calendar-based attendance tracker with visual indicators',
      'Created managerial dashboard for attendance monitoring and approval workflows',
    ],
  },
  {
    icon: Database,
    color: '#F59E0B',
    bg: 'rgba(245,158,11,0.1)',
    border: 'rgba(245,158,11,0.2)',
    title: 'ETL & Legacy Systems',
    bullets: [
      'Designed ETL processes and SQL scripts for offline data ingestion',
      'QA tested Power BI dashboards for client presentations',
      'Debugged and enhanced legacy enterprise systems in production',
    ],
  },
  {
    icon: GitBranch,
    color: '#7C5CFC',
    bg: 'rgba(124,92,252,0.1)',
    border: 'rgba(124,92,252,0.2)',
    title: 'N-PAX Technical Training — Full Stack Track',
    bullets: [
      'Intensive training in C#, ASP.NET Core, React, MSSQL, Entity Framework Core, Tailwind CSS, Git, Docker, Azure DevOps',
      'Built full-stack capstone project using Agile methodology',
    ],
    isTraining: true,
    period: 'Aug 2025 – Dec 2025',
  },
];

export default function ExperienceSlide({ isActive }) {
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
      <div style={{ maxWidth: '860px', width: '100%', display: 'flex', flexDirection: 'column', gap: 'clamp(20px, 3vw, 32px)' }}>

        {/* Header */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div style={{ width: '32px', height: '2px', background: 'linear-gradient(90deg, #22C989, #4F8EF7)' }} />
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#22C989', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Work History
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', flexWrap: 'wrap' }}>
            <h2 style={{
              fontSize: 'clamp(24px, 4.5vw, 44px)', fontWeight: 900,
              color: '#ffffff', letterSpacing: '-0.02em', margin: 0, lineHeight: 1.1,
            }}>
              N-PAX{' '}
              <span style={{
                background: 'linear-gradient(135deg, #22C989, #4F8EF7)',
                backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent',
              }}>
                Philippines
              </span>
            </h2>
            <span style={{
              fontSize: '13px', color: 'rgba(160,174,192,0.6)',
              background: 'rgba(34,201,137,0.08)',
              border: '1px solid rgba(34,201,137,0.2)',
              padding: '3px 10px', borderRadius: '99px',
            }}>
              Jan 2026 – May 2026
            </span>
          </div>
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '0' }}>
          {/* Vertical line — hidden on very small screens */}
          <div style={{
            position: 'absolute',
            left: '19px',
            top: '20px',
            bottom: '20px',
            width: '2px',
            background: 'linear-gradient(180deg, #4F8EF7, #7C5CFC, #22C989, rgba(124,92,252,0.2))',
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.6s ease 0.4s',
          }} />

          {experiences.map((exp, i) => {
            const Icon = exp.icon;
            return (
              <div key={exp.title} style={{
                display: 'flex',
                gap: 'clamp(12px, 2vw, 20px)',
                paddingBottom: i < experiences.length - 1 ? 'clamp(14px, 2.5vw, 20px)' : '0',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateX(0)' : 'translateX(-32px)',
                transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${0.25 + i * 0.15}s`,
              }}>
                {/* Icon dot */}
                <div style={{ flexShrink: 0, zIndex: 1 }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    background: exp.bg,
                    border: `2px solid ${exp.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: `0 0 16px ${exp.color}33`,
                  }}>
                    <Icon size={16} color={exp.color} />
                  </div>
                </div>

                {/* Content card */}
                <div style={{
                  flex: 1,
                  minWidth: 0,
                  background: 'rgba(13,13,31,0.7)',
                  border: `1px solid ${exp.border}`,
                  borderRadius: '14px',
                  padding: 'clamp(12px, 2vw, 16px) clamp(14px, 2.5vw, 20px)',
                  backdropFilter: 'blur(12px)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
                    <h3 style={{ fontSize: 'clamp(12px, 1.8vw, 14px)', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                      {exp.title}
                    </h3>
                    {exp.isTraining && (
                      <span style={{
                        fontSize: '10px', fontWeight: 600,
                        padding: '2px 8px', borderRadius: '99px',
                        background: 'rgba(124,92,252,0.15)',
                        border: '1px solid rgba(124,92,252,0.3)',
                        color: '#7C5CFC',
                        whiteSpace: 'nowrap',
                      }}>
                        {exp.period}
                      </span>
                    )}
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {exp.bullets.map((b) => (
                      <li key={b} style={{ fontSize: 'clamp(11px, 1.5vw, 12.5px)', color: 'rgba(160,174,192,0.8)', lineHeight: 1.5 }}>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}