import React, { useEffect, useRef } from 'react';
import { useUIStore } from '../../store/uiStore';
import { gsap } from 'gsap';

export const CustomCursor: React.FC = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorFollowerRef = useRef<HTMLDivElement>(null);
  const { cursorVariant, cursorText } = useUIStore();

  useEffect(() => {
    // Only on pointer-fine devices (desktop mouse)
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const dot = cursorDotRef.current;
    const follower = cursorFollowerRef.current;
    if (!dot || !follower) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let followerX = mouseX;
    let followerY = mouseY;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.opacity = '1';
      follower.style.opacity = '1';
      gsap.to(dot, { x: mouseX, y: mouseY, duration: 0.05, ease: 'none' });
    };

    const onMouseLeave = () => {
      dot.style.opacity = '0';
      follower.style.opacity = '0';
    };

    const onMouseEnter = () => {
      dot.style.opacity = '1';
      follower.style.opacity = '1';
    };

    const updateFollower = () => {
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;
      if (follower) {
        follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
      }
      requestAnimationFrame(updateFollower);
    };

    const animFrame = requestAnimationFrame(updateFollower);
    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  // Determine size & styling based on cursor variant
  const getFollowerSize = () => {
    switch (cursorVariant) {
      case 'product':
        return 'w-24 h-24 -ml-12 -mt-12 bg-[#D6B36A] text-[#08090D] scale-100 border-none';
      case 'drag':
        return 'w-20 h-20 -ml-10 -mt-10 bg-white/20 backdrop-blur-md border border-[#D6B36A] text-[#F3D58A] scale-100';
      case 'hover':
        return 'w-12 h-12 -ml-6 -mt-6 border-[#D6B36A] bg-[#D6B36A]/10 scale-100';
      case 'magnetic':
        return 'w-16 h-16 -ml-8 -mt-8 border-[#F3D58A] bg-white/10 scale-100';
      default:
        return 'w-8 h-8 -ml-4 -mt-4 border-white/20 bg-transparent scale-100';
    }
  };

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Precision Core Dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-[#D6B36A] shadow-[0_0_8px_rgba(214,179,106,0.8)] pointer-events-none transition-opacity duration-200"
      />

      {/* Fluid Trailing Halo */}
      <div
        ref={cursorFollowerRef}
        className={`fixed top-0 left-0 rounded-full border flex items-center justify-center text-[10px] uppercase font-bold tracking-widest pointer-events-none transition-all duration-300 ease-out select-none ${getFollowerSize()}`}
      >
        {cursorText && (
          <span className="font-semibold text-center leading-none px-2 animate-fade-in">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
};
