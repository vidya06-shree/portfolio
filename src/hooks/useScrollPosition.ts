import { useState, useEffect } from 'react';

interface ScrollPosition {
  x: number;
  y: number;
  progress: number;
}

export function useScrollPosition(): ScrollPosition {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0,
    progress: 0,
  });

  useEffect(() => {
    const updatePosition = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;

      setScrollPosition({
        x: window.scrollX,
        y: scrollTop,
        progress,
      });
    };

    window.addEventListener('scroll', updatePosition);
    updatePosition();

    return () => window.removeEventListener('scroll', updatePosition);
  }, []);

  return scrollPosition;
}
