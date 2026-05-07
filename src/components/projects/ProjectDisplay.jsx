import { ExternalLink, Zap, Layers } from 'lucide-react';
import { projectsData } from '../../data/projectsData';
import BudgetTracker from './budget-tracker/BudgetTracker';
import Button from '../common/Button';

const TAG_COLORS = [
  { bg: '#EBF2FF', color: '#1D4ED8', border: '#BFDBFE' },
  { bg: '#EEE9FF', color: '#5B21B6', border: '#DDD6FE' },
  { bg: '#E3FAF1', color: '#065F46', border: '#A7F3D0' },
  { bg: '#FEF3C7', color: '#92400E', border: '#FDE68A' },
  { bg: '#ECFEFF', color: '#155E75', border: '#A5F3FC' },
  { bg: '#FDF2F8', color: '#831843', border: '#FBCFE8' },
];

export default function ProjectDisplay({ projectId }) {
  const project = projectsData[projectId];

  if (!project) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-tertiary)' }}>
        Project not found
      </div>
    );
  }

  if (projectId === 'budget') {
    return <BudgetTracker />;
  }

  // Coming Soon view
  return (
    <div className="main-container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>

      {/* Project header */}
      <div
        className="animate-fadeInUp"
        style={{
          background: 'var(--surface-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-md)',
          padding: 'clamp(20px, 4vw, 36px)',
          marginBottom: '20px',
        }}
      >
        {/* Title row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', marginBottom: '12px' }}>
          <div>
            <h2 style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(20px, 4vw, 28px)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              letterSpacing: '-0.6px',
              lineHeight: 1.15,
              marginBottom: '6px',
            }}>
              {project.title}
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '600px' }}>
              {project.description}
            </p>
          </div>

          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', flexShrink: 0 }}>
              <Button variant="secondary" icon={ExternalLink} size="sm">
                GitHub
              </Button>
            </a>
          )}
        </div>

        {/* Tech stack tags */}
        {project.techStack?.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
            {project.techStack.map((tech, idx) => {
              const c = TAG_COLORS[idx % TAG_COLORS.length];
              return (
                <span
                  key={idx}
                  style={{
                    padding: '4px 10px',
                    fontSize: '12px', fontWeight: 600,
                    background: c.bg, color: c.color,
                    border: `1px solid ${c.border}`,
                    borderRadius: '99px',
                  }}
                >
                  {tech}
                </span>
              );
            })}
          </div>
        )}

        {/* Features */}
        {project.features?.length > 0 && (
          <div style={{
            background: 'var(--surface-base)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '14px 16px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
              <Zap size={14} color="#F59E0B" strokeWidth={2.5} />
              <p style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                Key Features
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '6px' }}>
              {project.features.map((feature, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <div style={{
                    width: '16px', height: '16px', borderRadius: '4px',
                    background: '#EBF2FF', flexShrink: 0, marginTop: '1px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <div style={{ width: '5px', height: '5px', borderRadius: '99px', background: '#4F8EF7' }} />
                  </div>
                  <span style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Coming soon card */}
      <div
        className="animate-fadeInUp"
        style={{
          animationDelay: '80ms',
          background: 'var(--surface-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-sm)',
          padding: '48px 24px',
          textAlign: 'center',
        }}
      >
        <div style={{
          width: '64px', height: '64px', borderRadius: '18px',
          background: 'linear-gradient(135deg, #EBF2FF, #EEE9FF)',
          border: '1px solid #C6DBFD',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 16px',
        }}>
          <Layers size={28} color="#4F8EF7" strokeWidth={1.5} />
        </div>

        <h3 style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '20px', fontWeight: 800,
          color: 'var(--text-primary)', letterSpacing: '-0.4px',
          marginBottom: '8px',
        }}>
          Coming Soon
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px', maxWidth: '320px', margin: '0 auto 24px', lineHeight: 1.6 }}>
          This project is currently in development. Check back soon or follow the GitHub repo for updates.
        </p>

        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'inline-block' }}>
            <Button variant="primary" icon={ExternalLink}>
              View on GitHub
            </Button>
          </a>
        )}
      </div>

    </div>
  );
}