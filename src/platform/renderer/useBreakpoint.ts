import { useEffect, useState } from 'react';
import type { Breakpoint, ResponsiveValue } from '../cms/types';

const BREAKPOINT_ORDER: Breakpoint[] = ['base', 'sm', 'md', 'lg', 'xl'];

function currentBreakpoint(width: number): Breakpoint {
  if (width >= 1280) return 'xl';
  if (width >= 1024) return 'lg';
  if (width >= 768) return 'md';
  if (width >= 640) return 'sm';
  return 'base';
}

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(() => {
    if (typeof window === 'undefined') return 'base';
    return currentBreakpoint(window.innerWidth);
  });

  useEffect(() => {
    const onResize = () => setBreakpoint(currentBreakpoint(window.innerWidth));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return breakpoint;
}

export function resolveResponsiveValue<T>(
  value: T | ResponsiveValue<T> | undefined,
  breakpoint: Breakpoint,
  fallback: T,
) {
  if (!value || typeof value !== 'object') return (value as T) ?? fallback;

  const responsive = value as ResponsiveValue<T>;
  const activeIndex = BREAKPOINT_ORDER.indexOf(breakpoint);

  for (let index = activeIndex; index >= 0; index -= 1) {
    const candidate = responsive[BREAKPOINT_ORDER[index]];
    if (candidate !== undefined) return candidate;
  }

  return fallback;
}
