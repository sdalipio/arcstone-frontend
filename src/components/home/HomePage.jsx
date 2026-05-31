// src/components/home/HomePage.jsx
import { useState, useEffect, useRef, useCallback } from 'react';
import StarfieldBackground from '../common/StarfieldBackground';
import SlideNav from './SlideNav';
import ProjectModal from './ProjectModal';
import HeroSlide from './slides/HeroSlide';
import SummarySlide from './slides/SummarySlide';
import ExperienceSlide from './slides/ExperienceSlide';
import ProjectsSlide from './slides/ProjectsSlide';
import SkillsSlide from './slides/SkillsSlide';
import ContactSlide from './slides/ContactSlide';

const SLIDE_IDS = ['hero', 'summary', 'experience', 'projects', 'skills', 'contact'];

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState('hero');
  const [openProject, setOpenProject] = useState(null);
  const containerRef = useRef(null);
  const slideRefs = useRef({});

  useEffect(() => {
    const observers = [];
    SLIDE_IDS.forEach(id => {
      const el = slideRefs.current[id];
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            setActiveSlide(id);
          }
        },
        { root: containerRef.current, threshold: 0.5 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  // FIX: scroll the inner container, not the element itself
  const navigateTo = useCallback((id) => {
    const el = slideRefs.current[id];
    const container = containerRef.current;
    if (el && container) {
      container.scrollTo({
        top: el.offsetTop,
        behavior: 'smooth',
      });
    }
  }, []);

  const setSlideRef = (id) => (el) => {
    slideRefs.current[id] = el;
  };

  const slides = [
    { id: 'hero', component: <HeroSlide isActive={activeSlide === 'hero'} /> },
    { id: 'summary', component: <SummarySlide isActive={activeSlide === 'summary'} /> },
    { id: 'experience', component: <ExperienceSlide isActive={activeSlide === 'experience'} /> },
    {
      id: 'projects',
      component: (
        <ProjectsSlide
          isActive={activeSlide === 'projects'}
          onOpenProject={setOpenProject}
        />
      ),
    },
    { id: 'skills', component: <SkillsSlide isActive={activeSlide === 'skills'} /> },
    { id: 'contact', component: <ContactSlide isActive={activeSlide === 'contact'} /> },
  ];

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', background: '#05050F' }}>
      <StarfieldBackground />

      {/* SlideNav sits above the canvas (zIndex 100) and above the scroll container (zIndex 1) */}
      <SlideNav activeSlide={activeSlide} onNavigate={navigateTo} />

      <div
        ref={containerRef}
        style={{
          position: 'relative',
          zIndex: 1,
          height: '100vh',
          overflowY: 'scroll',
          scrollSnapType: 'y mandatory',
          scrollBehavior: 'smooth',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        <style>{`
          html { overflow-y: scroll; scrollbar-width: none; }
          html::-webkit-scrollbar { display: none; }
          div::-webkit-scrollbar { display: none; }
          * { box-sizing: border-box; }
          @media (max-width: 768px) {
            html, body { font-size: 14px; }
          }
        `}</style>

        {slides.map(slide => (
          <div
            key={slide.id}
            ref={setSlideRef(slide.id)}
            id={`slide-${slide.id}`}
            style={{
              minHeight: '100vh',
              width: '100%',
              scrollSnapAlign: 'start',
              scrollSnapStop: 'always',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            {slide.component}
          </div>
        ))}
      </div>

      <ProjectModal
        projectId={openProject}
        onClose={() => setOpenProject(null)}
      />
    </div>
  );
}