// src/components/common/StarfieldBackground.jsx
import { useEffect, useRef } from 'react';

export default function StarfieldBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let stars = [];
    let orbs = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initStars = () => {
      stars = Array.from({ length: 180 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.4 + 0.2,
        alpha: Math.random() * 0.7 + 0.2,
        speed: Math.random() * 0.3 + 0.05,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleDir: Math.random() > 0.5 ? 1 : -1,
      }));
    };

    const initOrbs = () => {
      orbs = [
        {
          x: canvas.width * 0.15,
          y: canvas.height * 0.25,
          r: 320,
          color: '79,142,247',
          alpha: 0.07,
          vx: 0.12,
          vy: 0.08,
        },
        {
          x: canvas.width * 0.82,
          y: canvas.height * 0.6,
          r: 280,
          color: '124,92,252',
          alpha: 0.07,
          vx: -0.1,
          vy: 0.12,
        },
        {
          x: canvas.width * 0.5,
          y: canvas.height * 0.85,
          r: 200,
          color: '6,182,212',
          alpha: 0.05,
          vx: 0.08,
          vy: -0.09,
        },
      ];
    };

    const drawStars = () => {
      stars.forEach(star => {
        star.alpha += star.twinkleSpeed * star.twinkleDir;
        if (star.alpha >= 0.9 || star.alpha <= 0.1) star.twinkleDir *= -1;
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,220,255,${star.alpha})`;
        ctx.fill();
      });
    };

    const drawOrbs = () => {
      orbs.forEach(orb => {
        orb.x += orb.vx;
        orb.y += orb.vy;
        if (orb.x < -orb.r || orb.x > canvas.width + orb.r) orb.vx *= -1;
        if (orb.y < -orb.r || orb.y > canvas.height + orb.r) orb.vy *= -1;

        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
        grad.addColorStop(0, `rgba(${orb.color},${orb.alpha})`);
        grad.addColorStop(1, `rgba(${orb.color},0)`);
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });
    };

    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(79,142,247,0.03)';
      ctx.lineWidth = 1;
      const spacing = 60;
      for (let x = 0; x < canvas.width; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += spacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawGrid();
      drawOrbs();
      drawStars();
      animationId = requestAnimationFrame(animate);
    };

    resize();
    initStars();
    initOrbs();
    animate();

    window.addEventListener('resize', () => {
      resize();
      initStars();
      initOrbs();
    });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        background: 'linear-gradient(135deg, #05050F 0%, #090918 50%, #05050F 100%)',
      }}
    />
  );
}