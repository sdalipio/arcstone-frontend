// src/components/home/slides/SkillsSlide.jsx
import { useState, useEffect } from 'react';
import { Server, Monitor, Sparkles, Database, GitBranch } from 'lucide-react';

const skillGroups = [
  {
    label: 'Backend',
    color: '#4F8EF7',
    bg: 'rgba(79,142,247,0.08)',
    border: 'rgba(79,142,247,0.25)',
    icon: Server,
    skills: ['C# / .NET', 'Python', 'FastAPI', 'Entity Framework'],
  },
  {
    label: 'Frontend',
    color: '#22C989',
    bg: 'rgba(34,201,137,0.08)',
    border: 'rgba(34,201,137,0.25)',
    icon: Monitor,
    skills: ['React', 'Angular', 'Tailwind CSS', 'TypeScript'],
  },
  {
    label: 'AI / ML',
    color: '#7C5CFC',
    bg: 'rgba(124,92,252,0.08)',
    border: 'rgba(124,92,252,0.25)',
    icon: Sparkles,
    skills: ['LangChain', 'RAG', 'ChromaDB'],
  },
  {
    label: 'Databases',
    color: '#F472B6',
    bg: 'rgba(244,114,182,0.08)',
    border: 'rgba(244,114,182,0.25)',
    icon: Database,
    skills: ['SQL Server', 'SSMS', 'PostgreSQL'],
  },
  {
    label: 'DevOps / Tools',
    color: '#F59E0B',
    bg: 'rgba(245,158,11,0.08)',
    border: 'rgba(245,158,11,0.25)',
    icon: GitBranch,
    skills: ['Git', 'Docker', 'Azure'],
  },
];

const extraTags = ['Power BI', 'NSSM', 'REST APIs', 'Agile / Scrum', 'MSSQL'];

function SkillCard({ group, visible, index }) {
  const [hovered, setHovered] = useState(false);
  const Icon = group.icon;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered ? 'translateY(-3px)' : 'translateY(0)'
          : 'translateY(24px)',
        transition: `
          opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${0.15 + index * 0.1}s,
          transform 0.7s cubic-bezier(0.16,1,0.3,1) ${0.15 + index * 0.1}s,
          border-color 0.25s ease,
          box-shadow 0.25s ease
        `,
        background: 'rgba(13,13,31,0.85)',
        border: `1px solid ${hovered ? group.color + '55' : group.color + '22'}`,
        borderRadius: '16px',
        padding: 'clamp(14px, 2.5vw, 20px)',
        boxSizing: 'border-box',
        backdropFilter: 'blur(12px)',
        boxShadow: hovered ? `0 8px 32px ${group.color}18` : 'none',
        cursor: 'default',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
        <Icon size={14} color={group.color} style={{ flexShrink: 0, opacity: 0.9 }} />
        <span style={{
          fontSize: '11px', fontWeight: 700,
          color: group.color,
          letterSpacing: '0.1em', textTransform: 'uppercase',
        }}>
          {group.label}
        </span>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
        {group.skills.map(skill => (
          <span key={skill} style={{
            fontSize: 'clamp(11px, 1.5vw, 12px)', fontWeight: 500,
            padding: '5px 11px',
            borderRadius: '99px',
            background: group.bg,
            border: `1px solid ${group.border}`,
            color: group.color,
            lineHeight: 1,
          }}>
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function SkillsSlide({ isActive }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isActive) {
      const t = setTimeout(() => setVisible(true), 150);
      return () => clearTimeout(t);
    } else {
      setVisible(false);
    }
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
      <div style={{ maxWidth: '900px', width: '100%', display: 'flex', flexDirection: 'column', gap: 'clamp(20px, 3vw, 28px)' }}>

        {/* Header */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <div style={{ width: '28px', height: '2px', background: 'linear-gradient(90deg, #F59E0B, #7C5CFC)' }} />
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#F59E0B', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Capabilities
            </span>
          </div>
          <h2 style={{
            fontSize: 'clamp(24px, 4.5vw, 42px)', fontWeight: 900,
            color: '#ffffff', letterSpacing: '-0.02em', margin: 0, lineHeight: 1.1,
          }}>
            Technical{' '}
            <span style={{
              background: 'linear-gradient(135deg, #F59E0B, #7C5CFC)',
              backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent',
            }}>
              Skills
            </span>
          </h2>
          <p style={{
            marginTop: '10px', marginBottom: 0,
            fontSize: '13px', color: 'rgba(160,174,192,0.55)',
            fontWeight: 400, lineHeight: 1.5,
          }}>
            Technologies I work with day-to-day.
          </p>
        </div>

        {/* Skill cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))',
          gap: 'clamp(10px, 2vw, 16px)',
        }}>
          {skillGroups.map((group, gi) => (
            <SkillCard key={group.label} group={group} visible={visible} index={gi} />
          ))}
        </div>

        {/* Also familiar with */}
        <div style={{
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.8s ease 0.7s',
        }}>
          <p style={{
            fontSize: '11px', fontWeight: 700,
            color: 'rgba(160,174,192,0.45)',
            letterSpacing: '0.1em', textTransform: 'uppercase',
            marginBottom: '10px',
          }}>
            Also familiar with
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
            {extraTags.map(tag => (
              <span key={tag} style={{
                fontSize: '11px', fontWeight: 500,
                padding: '4px 11px', borderRadius: '99px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.09)',
                color: 'rgba(160,174,192,0.55)',
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}