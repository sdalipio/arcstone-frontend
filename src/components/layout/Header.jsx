import { useState, useRef, useEffect } from 'react';
import { FolderGit2, ChevronDown, Home, Briefcase, BarChart3, Layers, User, BookOpen, Sparkles } from 'lucide-react';

export default function Header({ currentProject, onProjectChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const projects = [
    { id: 'budget', name: 'Budget Tracker', description: 'Construction expense tracking', icon: Briefcase, color: '#4F8EF7', bg: '#EBF2FF' },
    { id: 'studyguide', name: 'Study Guide', description: 'AI-powered learning from PDFs (Coming soon)', icon: BookOpen, color: '#22C989', bg: '#E3FAF1' },
  ];

  const current = projects.find(p => p.id === currentProject) || projects[0];

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(248,249,252,0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid #E8EAF0',
        boxShadow: '0 1px 0 rgba(0,0,0,0.04)',
      }}
    >
      <div className="main-container">
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px' }}>

          {/* Left side - Home Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Home Button */}
            <button
              onClick={() => onProjectChange('home')}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '8px 14px',
                background: currentProject === 'home' ? '#EBF2FF' : 'transparent',
                border: currentProject === 'home' ? '1px solid #4F8EF7' : '1px solid transparent',
                borderRadius: '10px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (currentProject !== 'home') {
                  e.currentTarget.style.background = '#F3F4F8';
                  e.currentTarget.style.borderColor = '#E8EAF0';
                }
              }}
              onMouseLeave={(e) => {
                if (currentProject !== 'home') {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = 'transparent';
                }
              }}
            >
              <Home size={16} color={currentProject === 'home' ? '#4F8EF7' : 'var(--text-secondary)'} strokeWidth={2} />
              <span style={{
                fontSize: '13.5px', fontWeight: 600,
                color: currentProject === 'home' ? '#4F8EF7' : 'var(--text-secondary)',
              }}>Home</span>
            </button>

            {/* Logo/Name */}
            <button
              onClick={() => onProjectChange('home')}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0',
              }}
            >
              <div style={{
                width: '38px', height: '38px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #4F8EF7, #7C5CFC)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(79,142,247,0.3)',
                flexShrink: 0,
              }}>
                <Layers size={18} color="#fff" strokeWidth={2} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <p style={{
                  fontFamily: 'var(--font-sans)', fontWeight: 700,
                  fontSize: '15px', color: 'var(--text-primary)',
                  lineHeight: 1.2, letterSpacing: '-0.3px',
                }}>
                  Shaun's Portfolio
                </p>
                <p style={{ fontSize: '11.5px', color: 'var(--text-tertiary)', lineHeight: 1 }}>
                  Full-Stack Developer
                </p>
              </div>
            </button>
          </div>

          {/* Projects Dropdown */}
          <div ref={dropdownRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '8px 14px',
                background: isOpen ? '#F3F4F8' : 'var(--surface-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '10px',
                cursor: 'pointer',
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                fontFamily: 'var(--font-body)',
              }}
            >
              <div style={{
                width: '22px', height: '22px', borderRadius: '6px',
                background: current.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <current.icon size={12} color={current.color} strokeWidth={2.5} />
              </div>
              <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-primary)' }}>
                Projects
              </span>
              <ChevronDown
                size={14}
                color="var(--text-secondary)"
                style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}
              />
            </button>

            {isOpen && (
              <div
                className="animate-scaleIn"
                style={{
                  position: 'absolute', right: 0, top: 'calc(100% + 8px)',
                  width: '280px',
                  background: 'var(--surface-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-lg)',
                  overflow: 'hidden',
                  transformOrigin: 'top right',
                }}
              >
                <div style={{ padding: '6px' }}>
                  {projects.map((project) => (
                    <button
                      key={project.id}
                      onClick={() => { onProjectChange(project.id); setIsOpen(false); }}
                      style={{
                        width: '100%', textAlign: 'left',
                        display: 'flex', alignItems: 'center', gap: '10px',
                        padding: '10px 12px',
                        borderRadius: '10px',
                        background: currentProject === project.id ? project.bg : 'transparent',
                        border: currentProject === project.id ? `1px solid ${project.color}22` : '1px solid transparent',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <div style={{
                        width: '34px', height: '34px', borderRadius: '9px',
                        background: project.bg, flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        border: `1px solid ${project.color}22`,
                      }}>
                        <project.icon size={16} color={project.color} strokeWidth={2} />
                      </div>
                      <div>
                        <p style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                          {project.name}
                        </p>
                        <p style={{ fontSize: '11.5px', color: 'var(--text-tertiary)', lineHeight: 1.4 }}>
                          {project.description}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}