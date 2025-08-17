import { useCallback, useRef } from 'react';

interface UseScrollIntoViewOptions {
  offset?: number;
  behavior?: ScrollBehavior;
}

export const useScrollIntoView = ({
  offset = 48,
  behavior = 'smooth',
}: UseScrollIntoViewOptions = {}) => {
  const ref = useRef<HTMLLIElement>(null);

  const scrollToView = useCallback(() => {
    const element = ref.current;
    if (!element) return;

    const container = element.closest<HTMLElement>('[data-scroll-container]');
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const itemRect = element.getBoundingClientRect();

    const distanceToTop = itemRect.top - containerRect.top;

    const targetScrollTop = container.scrollTop + distanceToTop - offset;

    container.scrollTo({ top: targetScrollTop, behavior });
  }, [offset, behavior]);

  return { ref, scrollToView };
};
