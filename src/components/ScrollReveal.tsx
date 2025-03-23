import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom';
  delay?: number;
  threshold?: number;
  rootMargin?: string;
  className?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = 'fade-up',
  delay = 0,
  threshold = 0.1,
  rootMargin = '0px',
  className = ''
}) => {
  const ref = useScrollReveal({ threshold, rootMargin, delay });

  return (
    <div
      ref={ref as any}
      data-scroll={animation}
      className={`delay-${delay} ${className}`}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;