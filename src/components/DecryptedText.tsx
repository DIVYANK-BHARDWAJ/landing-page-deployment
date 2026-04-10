'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  characters?: string;
  className?: string;
  parentClassName?: string;
  encryptedClassName?: string;
  animateOn?: 'view' | 'hover' | 'click';
  revealDelay?: number;
  sequential?: boolean;
}

export default function DecryptedText({
  text,
  speed = 40,
  maxIterations = 10,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+',
  className = '',
  parentClassName = '',
  encryptedClassName = '',
  animateOn = 'view',
  sequential = true,
  ...props
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDecrypted, setIsDecrypted] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });

  const getNextChar = useCallback(() => {
    return characters[Math.floor(Math.random() * characters.length)];
  }, [characters]);

  const triggerDecrypt = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsDecrypted(false);
  }, [isAnimating]);

  useEffect(() => {
    if (animateOn === 'view' && isInView) {
      triggerDecrypt();
    }
  }, [animateOn, isInView, triggerDecrypt]);

  useEffect(() => {
    if (!isAnimating) return;

    let iteration = 0;
    const interval = setInterval(() => {
      const newText = text
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          
          if (sequential) {
            if (index < iteration / (maxIterations / text.length)) {
                return text[index];
            }
          } else {
            if (iteration >= maxIterations) return text[index];
          }

          return getNextChar();
        })
        .join('');

      setDisplayText(newText);
      iteration++;

      if (iteration >= maxIterations) {
        setDisplayText(text);
        setIsAnimating(false);
        setIsDecrypted(true);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [isAnimating, text, maxIterations, speed, getNextChar, sequential]);

  const animateProps = 
    animateOn === 'hover' ? { onMouseEnter: triggerDecrypt } : 
    animateOn === 'click' ? { onClick: triggerDecrypt } : {};

  return (
    <motion.span
      className={parentClassName}
      ref={containerRef}
      style={{ display: 'inline-block', whiteSpace: 'pre-wrap', position: 'relative' }}
      {...animateProps}
      {...props}
    >
      <span aria-hidden="true">
        {displayText.split('').map((char, index) => {
           const isRevealed = !isAnimating || (sequential && index < (displayText.length * (displayText === text ? 1 : 0))); // simplified logic
           // More accurately:
           const isOriginal = displayText[index] === text[index] && (!isAnimating || (sequential && index < (displayText.length))); 
           
           return (
            <span 
                key={index} 
                className={isOriginal ? className : encryptedClassName}
            >
              {char}
            </span>
          );
        })}
      </span>
      <span className="sr-only">{text}</span>
    </motion.span>
  );
}
