// src/components/home/slides/SummarySlide.jsx
import { useState, useEffect, useRef } from 'react';
import { Award, Briefcase, Rocket, Brain } from 'lucide-react';

function AnimatedCounter({ target, suffix = '', isActive }) {
  const [count, setCount] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      setCount(0);
      const duration = 1600;
      const steps = 60;
      const increment = target / steps;
      let current = 0;
      timerRef.current = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timerRef.current);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
    } else {
      clearInterval(timerRef.current);
      setCount(0);
    }
    return () => clearInterval(timerRef.current);
  }, [isActive, target]);

  return <span>{count}{suffix}</span>;
}

const stats = [
  { icon: Briefcase, value: 9, suffix: '', label: 'Months Experience', sub: 'at N-PAX Philippines', color: '#4F8EF7', bg: 'rgba(79,142,247,0.1)', border: 'rgba(79,142,247,0.2)' },
  { icon: Rocket, value: 2, suffix: '', label: 'Personal Projects', sub: 'currently in progress', color: '#22C989', bg: 'rgba(34,201,137,0.1)', border: 'rgba(34,201,137,0.2)' },
  { icon: Brain, value: 1, suffix: '', label: 'AI Systems Built', sub: 'RAG pipelines & chatbots', color: '#7C5CFC', bg: 'rgba(124,92,252,0.1)', border: 'rgba(124,92,252,0.2)' },
];

export default function SummarySlide({ isActive }) {
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
    }}>
      <div style={{ maxWidth: '860px', width: '100%', display: 'flex', flexDirection: 'column', gap: 'clamp(24px, 4vw, 36px)' }}>

        {/* Section label */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div style={{ width: '32px', height: '2px', background: 'linear-gradient(90deg, #4F8EF7, #7C5CFC)' }} />
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#4F8EF7', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              About Me
            </span>
          </div>
          <h2 style={{
            fontSize: 'clamp(26px, 5vw, 48px)',
            fontWeight: 900,
            color: '#ffffff',
            letterSpacing: '-0.02em',
            margin: 0,
            lineHeight: 1.1,
          }}>
            Professional{' '}
            <span style={{
              background: 'linear-gradient(135deg, #4F8EF7, #7C5CFC)',
              backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent',
            }}>
              Summary
            </span>
          </h2>
        </div>

        {/* Summary text */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s',
          background: 'rgba(13,13,31,0.8)',
          border: '1px solid rgba(79,142,247,0.15)',
          borderRadius: '16px',
          padding: 'clamp(16px, 3vw, 24px) clamp(16px, 3vw, 28px)',
          backdropFilter: 'blur(12px)',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
            <Award size={20} color="#4F8EF7" style={{ flexShrink: 0, marginTop: '2px' }} />
            <p style={{
              fontSize: 'clamp(13px, 1.6vw, 15px)',
              lineHeight: 1.75,
              color: 'rgba(160,174,192,0.9)',
              margin: 0,
            }}>
              Junior Software Engineer with hands-on experience in AI-powered applications and full-stack development.
              Skilled in building <span style={{ color: '#4F8EF7', fontWeight: 600 }}>RAG pipelines</span>, developing web platforms, and integrating modern frameworks such as{' '}
              <span style={{ color: '#7C5CFC', fontWeight: 600 }}>Python, Angular, and .NET</span>.
              Quick learner with strong problem-solving abilities, eager to contribute to collaborative teams and grow expertise in scalable software solutions.
              Passionate about applying <span style={{ color: '#22C989', fontWeight: 600 }}>emerging technologies</span> to real-world challenges.
            </p>
          </div>
        </div>

        {/* Stat counters */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 'clamp(10px, 2vw, 16px)',
        }}>
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
                transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${0.3 + i * 0.12}s`,
                background: stat.bg,
                border: `1px solid ${stat.border}`,
                borderRadius: '16px',
                padding: 'clamp(14px, 2.5vw, 20px) clamp(14px, 2.5vw, 24px)',
                backdropFilter: 'blur(12px)',
              }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '10px',
                  background: stat.bg,
                  border: `1px solid ${stat.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '12px',
                }}>
                  <Icon size={18} color={stat.color} />
                </div>
                <p style={{
                  fontSize: 'clamp(28px, 5vw, 36px)', fontWeight: 900,
                  color: stat.color, margin: '0 0 4px 0', lineHeight: 1,
                }}>
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} isActive={isActive} />
                </p>
                <p style={{ fontSize: 'clamp(11px, 1.5vw, 13px)', fontWeight: 600, color: '#ffffff', margin: '0 0 2px 0' }}>{stat.label}</p>
                <p style={{ fontSize: '11px', color: 'rgba(160,174,192,0.6)', margin: 0 }}>{stat.sub}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}