"use client";

import { useRef, useEffect, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: 'chars' | 'words' | 'lines';
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  textAlign?: 'left' | 'center' | 'right';
  tag?: keyof JSX.IntrinsicElements;
  onLetterAnimationComplete?: () => void;
  showCallback?: boolean;
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 50,
  duration = 1.25,
  ease = 'power3.out',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  rootMargin = '-100px',
  textAlign = 'center',
  tag: Tag = 'p',
  onLetterAnimationComplete
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  // Split text into characters manually to avoid GSAP Premium dependency
  const letters = useMemo(() => text.split(''), [text]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  useGSAP(() => {
    if (!inView || !containerRef.current) return;

    const charElements = containerRef.current.querySelectorAll('.split-char');
    
    gsap.fromTo(charElements, 
      { ...from },
      {
        ...to,
        duration,
        ease,
        stagger: delay / 1000,
        onComplete: () => {
          onLetterAnimationComplete?.();
        }
      }
    );
  }, { dependencies: [inView, from, to, delay, duration, ease], scope: containerRef });

  return (
    <Tag
      ref={containerRef as any}
      className={`split-parent ${className}`}
      style={{
        textAlign,
        display: 'inline-block',
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
        overflow: 'hidden'
      }}
    >
      {letters.map((char, index) => (
        <span
          key={index}
          className="split-char"
          style={{
            display: 'inline-block',
            willChange: 'transform, opacity'
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </Tag>
  );
};

export default SplitText;
