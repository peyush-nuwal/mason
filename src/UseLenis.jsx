import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

const useLenis = () => {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      direction: 'vertical',
      gestureDirection: 'vertical',
      smoothTouch: true,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const toggleSmoothScrolling = (enable) => {
    if (lenisRef.current) {
      lenisRef.current.options.smooth = enable;
    }
  };

  return { toggleSmoothScrolling };
};

export default useLenis;
