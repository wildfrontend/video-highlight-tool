import { useCallback, useRef } from 'react';

export const useScrollIntoView = () => {
  const ref = useRef<HTMLLIElement>(null);

  const scrollToView = useCallback(() => {
    if (!ref.current) return;
    const container = ref.current.closest<HTMLElement>('[data-scroll-container]');
    if (container) {
      const itemTop = ref.current.offsetTop;
      container.scrollTo({
        top: itemTop - 8, // 可自訂偏移
        behavior: 'smooth',
      });
    } else {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, []);

  return {
    ref,
    scrollToView,
  };
};
