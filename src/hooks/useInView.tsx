import { useState, useEffect, useRef, RefObject } from 'react';

function useInView(): [RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    // Check if the IntersectionObserver API is available
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setInView(entry.isIntersecting);
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: 0.1,
        }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      // Cleanup
      return () => {
        if (ref.current) {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          observer.unobserve(ref.current);
        }
      };
    }
  }, []); // Empty dependency list to ensure this effect runs once after the component mounts

  return [ref, inView];
}

export default useInView;
