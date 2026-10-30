import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    jQuery: any;
    $: any;
  }
}

export function useLightgallery<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const $ = window.jQuery || window.$;
    if (!ref.current || !$ || !$.fn?.lightGallery) return;
    const $el = $(ref.current);
    $el.lightGallery({
      selector: '[data-lightgallery="item"]',
      thumbnail: true,
      loop: true,
      mode: 'lg-slide',
    });
    return () => $el.data('lightGallery')?.destroy(true);
  }, []);

  return ref;
}