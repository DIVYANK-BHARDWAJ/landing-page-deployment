'use client';

import { useEffect, useRef, useState } from 'react';
import './ScrambledText.css';

const ScrambledText = ({
  radius = 100,
  duration = 0.6,
  scrambleChars = '!@#$%^&*()_+{}|:<>?-=[]\;/.,',
  className = '',
  children
}: {
  radius?: number;
  duration?: number;
  scrambleChars?: string;
  className?: string;
  children: string;
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [displayText, setDisplayText] = useState(children);
  const originalText = children;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent | PointerEvent) => {
      if (!rootRef.current) return;
      
      const rect = rootRef.current.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      const dist = Math.hypot(dx, dy);

      if (dist < radius) {
        // Scramble logic
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        
        let scrambled = '';
        for (let i = 0; i < originalText.length; i++) {
          if (originalText[i] === ' ') {
            scrambled += ' ';
          } else {
            scrambled += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          }
        }
        setDisplayText(scrambled);

        // Resolve back after a delay
        timeoutRef.current = setTimeout(() => {
          setDisplayText(originalText);
        }, duration * 1000);
      }
    };

    const el = window;
    el.addEventListener('pointermove', handleMove as any);

    return () => {
      el.removeEventListener('pointermove', handleMove as any);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [radius, duration, scrambleChars, originalText]);

  return (
    <div ref={rootRef} className={`scrambled-text-container ${className}`}>
      <span className="font-mono">{displayText}</span>
    </div>
  );
};

export default ScrambledText;
