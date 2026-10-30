import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    Swiper: any;
  }
}

export function useSwiper(options: Record<string, unknown>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current || !window.Swiper) return;
    instanceRef.current = new window.Swiper(containerRef.current, options);
    return () => instanceRef.current?.destroy?.(true, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return containerRef;
}