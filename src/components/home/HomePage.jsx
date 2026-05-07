import { useState, useEffect } from 'react';
import { 
  User, Briefcase, BookOpen, Sparkles, Code2, 
  Brain, ExternalLink, Users, Award, TrendingUp,
  Database, Cloud, Shield, Rocket, Target, Clock,
  Wrench, GitBranch, MessageCircle, FileText, Calendar,
  HardHat, Hammer, Truck, Zap
} from 'lucide-react';
import profilePhoto from '../../assets/profile-photo.jpg';
export default function HomePage({ onProjectChange }) {
  const [typedText, setTypedText] = useState('');
  const fullText = "Junior Software Engineer with experience in AI-powered applications and full-stack development";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const skills = [
    { name: 'C# / .NET', level: 85, color: '#7C5CFC', bg: '#EEE9FF' },
    { name: 'Python / FastAPI', level: 82, color: '#4F8EF7', bg: '#EBF2FF' },
    { name: 'Angular', level: 80, color: '#DD1B16', bg: '#FEE2E2' },
    { name: 'React', level: 78, color: '#06B6D4', bg: '#ECFEFF' },
    { name: 'LangChain / RAG', level: 75, color: '#22C989', bg: '#E3FAF1' },
    { name: 'SQL / Databases', level: 80, color: '#F59E0B', bg: '#FEF3C7' },
  ];

  const personalProjects = [
    {
      id: 'budget',
      title: 'Construction Budget Tracker',
      description: 'Personal portfolio project I\'m building to demonstrate full-stack capabilities with React, .NET 8, and PostgreSQL.',
      longDescription: 'A complete expense management system for construction businesses. This is a personal MVP project to showcase my skills in full-stack development, database design, and UI/UX.',
      icon: HardHat,
      color: '#4F8EF7',
      bg: '#EBF2FF',
      features: ['Worker payroll tracking', 'Daily/Monthly expense views', 'Category budget alerts', 'Visual analytics dashboard'],
      tech: ['React', '.NET 8', 'PostgreSQL', 'Tailwind CSS'],
      status: 'in-progress',
      statusLabel: 'Personal Project - Building',
      statusColor: '#F59E0B',
      statusBg: '#FEF3C7'
    },
    {
      id: 'studyguide',
      title: 'Study Guide AI',
      description: 'Personal portfolio project exploring AI integration - generates quizzes and flashcards from PDF documents.',
      longDescription: 'An AI-powered learning platform that creates study materials from uploaded PDFs. This project demonstrates my interest in AI/ML and RAG pipelines.',
      icon: BookOpen,
      color: '#22C989',
      bg: '#E3FAF1',
      features: ['PDF upload & parsing', 'AI question generation', 'Flashcards system', 'Quiz mode'],
      tech: ['React', 'Python', 'OpenAI API', 'FastAPI'],
      status: 'in-progress',
      statusLabel: 'Personal Project - Planning',
      statusColor: '#F59E0B',
      statusBg: '#FEF3C7'
    },
  ];

  return (
    <div style={{ paddingBottom: '4rem' }}>
{/* Hero Section */}
<div style={{
  background: 'linear-gradient(135deg, #F8FAFF 0%, #F0F4FE 100%)',
  borderRadius: 'var(--radius-2xl)',
  padding: '48px 40px',
  marginBottom: '32px',
  border: '1px solid var(--border-subtle)',
}}>
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'center' }}>
    
    {/* Profile Photo */}
    <div style={{ flexShrink: 0 }}>
      <img 
        src={profilePhoto}  // Change this to your photo path
        alt="Shaundyl Alipio"
        style={{
          width: '120px',
          height: '120px',
          borderRadius: '60px',
          objectFit: 'cover',
          boxShadow: '0 8px 24px rgba(79,142,247,0.25)',
          border: '3px solid white',
        }}
      />
    </div>
    
    <div style={{ flex: 1 }}>
      <h1 style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 'clamp(28px, 5vw, 42px)',
        fontWeight: 800,
        background: 'linear-gradient(135deg, #1A2A4F, #4F8EF7)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        marginBottom: '12px',
        letterSpacing: '-0.02em',
      }}>
        Shaundyl Alipio
      </h1>
      <p style={{
        fontSize: '18px', fontWeight: 600,
        color: 'var(--text-primary)',
        marginBottom: '8px',
      }}>
        Junior Software Engineer
      </p>
      <p style={{
        fontSize: '15px', color: 'var(--text-secondary)',
        lineHeight: 1.5, maxWidth: '600px',
      }}>
        {typedText}
        <span style={{
          display: 'inline-block',
          width: '3px', height: '20px',
          background: '#4F8EF7',
          marginLeft: '4px',
          animation: 'blink 1s infinite',
        }} />
      </p>
    </div>
  </div>
</div>

      {/* Professional Summary */}
      <div style={{
        background: 'var(--surface-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-xl)',
        padding: '24px',
        marginBottom: '32px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <Award size={20} color="#4F8EF7" />
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>
            Professional Summary
          </h2>
        </div>
        <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
          Junior Software Engineer with hands-on experience in AI-powered applications and full-stack development. 
          Skilled in building RAG pipelines, developing web platforms, and integrating modern frameworks such as 
          Python, Angular, and .NET. Quick learner with strong problem-solving abilities, eager to contribute to 
          collaborative teams and grow expertise in scalable software solutions. Passionate about applying emerging 
          technologies to real-world challenges while continuously expanding technical and professional skills.
        </p>
      </div>

      {/* Quick Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '40px',
      }}>
        <div style={{
          background: 'var(--surface-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '16px 20px',
          display: 'flex', alignItems: 'center', gap: '12px',
        }}>
          <div style={{
            width: '44px', height: '44px', borderRadius: '11px',
            background: '#EBF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Briefcase size={20} color="#4F8EF7" />
          </div>
          <div>
            <p style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)' }}>5</p>
            <p style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>Months Experience</p>
            <p style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>at N-PAX</p>
          </div>
        </div>
        <div style={{
          background: 'var(--surface-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '16px 20px',
          display: 'flex', alignItems: 'center', gap: '12px',
        }}>
          <div style={{
            width: '44px', height: '44px', borderRadius: '11px',
            background: '#E3FAF1', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Rocket size={20} color="#22C989" />
          </div>
          <div>
            <p style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)' }}>2</p>
            <p style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>Personal Projects</p>
            <p style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>in progress</p>
          </div>
        </div>
        <div style={{
          background: 'var(--surface-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '16px 20px',
          display: 'flex', alignItems: 'center', gap: '12px',
        }}>
          <div style={{
            width: '44px', height: '44px', borderRadius: '11px',
            background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Brain size={20} color="#F59E0B" />
          </div>
          <div>
            <p style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)' }}>RAG</p>
            <p style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>AI Pipelines</p>
            <p style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>at work</p>
          </div>
        </div>
      </div>

      {/* Work Experience - What I did at N-PAX */}
      <div style={{
        background: 'linear-gradient(135deg, #F8FAFF, #F0F4FE)',
        borderRadius: 'var(--radius-2xl)',
        padding: '32px',
        marginBottom: '48px',
        border: '1px solid var(--border-subtle)',
      }}>
        <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Briefcase size={20} color="#4F8EF7" />
          Work Experience · N-PAX Philippines Inc.
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--text-tertiary)', marginBottom: '24px' }}>Jan 2026 – May 2026 (5 months)</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* AI Support System */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <MessageCircle size={16} color="#4F8EF7" />
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>AI-Powered Customer Support System</h3>
            </div>
            <ul style={{ paddingLeft: '20px', margin: 0 }}>
              <li style={{ fontSize: '13.5px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Architected three-tier system: Angular frontend + .NET API middleware + Python/FastAPI backend
              </li>
              <li style={{ fontSize: '13.5px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Built chatbot with LangChain RAG pipeline for FAQ responses and HR policy document querying
              </li>
              <li style={{ fontSize: '13.5px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Implemented ChromaDB knowledge base for undocumented internal systems
              </li>
              <li style={{ fontSize: '13.5px', color: 'var(--text-secondary)' }}>
                Configured NSSM to run FastAPI as persistent Windows service
              </li>
            </ul>
          </div>

          {/* Payroll System */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Calendar size={16} color="#22C989" />
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>Employee & Managerial View for Payroll System</h3>
            </div>
            <ul style={{ paddingLeft: '20px', margin: 0 }}>
              <li style={{ fontSize: '13.5px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Built employee self-service view for leave credits, attendance, and paydays
              </li>
              <li style={{ fontSize: '13.5px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Implemented calendar-based attendance tracker with visual indicators
              </li>
              <li style={{ fontSize: '13.5px', color: 'var(--text-secondary)' }}>
                Created managerial dashboard for attendance monitoring and approval workflows
              </li>
            </ul>
          </div>

          {/* ETL & Legacy */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Database size={16} color="#F59E0B" />
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>ETL & Legacy Systems</h3>
            </div>
            <ul style={{ paddingLeft: '20px', margin: 0 }}>
              <li style={{ fontSize: '13.5px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Designed ETL processes and SQL scripts for offline data ingestion
              </li>
              <li style={{ fontSize: '13.5px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                QA tested Power BI dashboards for client presentations
              </li>
              <li style={{ fontSize: '13.5px', color: 'var(--text-secondary)' }}>
                Debugged and enhanced legacy enterprise systems in production
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Personal Projects - What I'm building now */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{
          fontSize: '24px', fontWeight: 800,
          color: 'var(--text-primary)',
          marginBottom: '8px',
          display: 'flex', alignItems: 'center', gap: '8px',
        }}>
          <Wrench size={22} color="#7C5CFC" />
          Personal Projects (In Progress)
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--text-tertiary)', marginBottom: '20px' }}>
          These are portfolio projects I'm currently building to demonstrate my full-stack and AI capabilities.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '24px',
        marginBottom: '48px',
      }}>
        {personalProjects.map(project => {
          const Icon = project.icon;
          return (
            <div
              key={project.id}
              style={{
                background: 'var(--surface-card)',
                border: `1px solid ${project.color}22`,
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'pointer',
              }}
              onClick={() => onProjectChange(project.id)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                padding: '20px',
                borderBottom: `1px solid ${project.color}22`,
                background: project.bg,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '12px',
                    background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  }}>
                    <Icon size={24} color={project.color} strokeWidth={2} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {project.title}
                    </h3>
                    <span style={{
                      fontSize: '10px', fontWeight: 600,
                      padding: '2px 8px', borderRadius: '99px',
                      background: project.statusBg,
                      color: project.statusColor,
                    }}>
                      {project.statusLabel}
                    </span>
                  </div>
                </div>
                <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {project.description}
                </p>
              </div>
              
              <div style={{ padding: '16px 20px' }}>
                <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: '10px' }}>
                  Key Features:
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                  {project.features.map(feature => (
                    <span key={feature} style={{
                      fontSize: '11px', padding: '3px 8px', borderRadius: '6px',
                      background: project.bg, color: project.color,
                    }}>
                      {feature}
                    </span>
                  ))}
                </div>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                  {project.tech.map(tech => (
                    <span key={tech} style={{
                      fontSize: '10px', padding: '2px 8px', borderRadius: '4px',
                      background: '#F3F4F6', color: 'var(--text-tertiary)',
                    }}>
                      {tech}
                    </span>
                  ))}
                </div>
                
                <button
                  onClick={() => onProjectChange(project.id)}
                  style={{
                    width: '100%', padding: '10px',
                    borderRadius: '10px', border: `1.5px solid ${project.color}`,
                    background: 'transparent', color: project.color,
                    fontWeight: 600, fontSize: '13px',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                  }}
                >
                  View Project <ExternalLink size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Technical Skills Section */}
      <h2 style={{
        fontSize: '24px', fontWeight: 800,
        color: 'var(--text-primary)',
        marginBottom: '20px',
        display: 'flex', alignItems: 'center', gap: '8px',
      }}>
        <TrendingUp size={22} color="#7C5CFC" />
        Technical Skills
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '20px',
        marginBottom: '48px',
      }}>
        {skills.map(skill => (
          <div key={skill.name} style={{
            background: 'var(--surface-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '16px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>{skill.name}</span>
              <span style={{ fontSize: '12px', color: skill.color }}>{skill.level}%</span>
            </div>
            <div style={{ height: '8px', background: '#F3F4F6', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{
                height: '100%', width: `${skill.level}%`,
                background: `linear-gradient(90deg, ${skill.color}, ${skill.color}CC)`,
                borderRadius: '4px',
                transition: 'width 1s ease',
              }} />
            </div>
          </div>
        ))}
      </div>

      {/* Technical Training */}
      <div style={{
        background: 'var(--surface-card)',
        borderRadius: 'var(--radius-2xl)',
        padding: '32px',
        marginBottom: '32px',
        border: '1px solid var(--border-subtle)',
      }}>
        <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <GitBranch size={20} color="#7C5CFC" />
          Technical Training
        </h2>
        <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>N-PAX Fresh Graduate Technical Training – Full Stack Developer Track</p>
        <p style={{ fontSize: '13px', color: 'var(--text-tertiary)', marginBottom: '12px' }}>Aug 2025 – Dec 2025</p>
        <ul style={{ paddingLeft: '20px', margin: 0 }}>
          <li style={{ fontSize: '13.5px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
            Intensive training in C#, ASP.NET Core, React, MSSQL, Entity Framework Core, Tailwind CSS, Git, Docker, Azure DevOps
          </li>
          <li style={{ fontSize: '13.5px', color: 'var(--text-secondary)' }}>
            Built full-stack capstone project using Agile methodology
          </li>
        </ul>
      </div>

      {/* Contact Section */}
      <div style={{
        background: 'linear-gradient(135deg, #F8FAFF, #F0F4FE)',
        borderRadius: 'var(--radius-2xl)',
        padding: '32px',
        textAlign: 'center',
        border: '1px solid var(--border-subtle)',
      }}>
        <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px', color: 'var(--text-primary)' }}>
          Open to Opportunities
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
          Looking for junior full-stack or AI-focused roles where I can grow and contribute
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <a 
            href="mailto:shaun.delacruz@example.com"
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '10px 24px', borderRadius: '10px',
              background: 'white', border: '1px solid #4F8EF7',
              color: '#4F8EF7', fontWeight: 600, fontSize: '14px',
              cursor: 'pointer', textDecoration: 'none',
            }}
          >
            📧 Contact Me
          </a>
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}