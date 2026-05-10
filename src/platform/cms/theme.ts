import type { ThemeTokens } from './types';

const TOKEN_MAP = {
  primary: '--primary',
  primaryForeground: '--primary-foreground',
  secondary: '--secondary',
  accent: '--accent',
  background: '--background',
  surface: '--surface',
  text: '--foreground',
  muted: '--muted-foreground',
  border: '--border',
} as const;

function normalizeRadius(radius: ThemeTokens['radius']) {
  if (!radius) return undefined;
  if (radius === 'sm') return '8px';
  if (radius === 'md') return '12px';
  if (radius === 'lg') return '16px';
  return radius;
}

export function applyThemeTokens(tokens?: ThemeTokens) {
  if (typeof document === 'undefined' || !tokens) return () => undefined;

  const root = document.documentElement;
  const previous = new Map<string, string>();

  const setToken = (name: string, value?: string) => {
    if (!value) return;
    previous.set(name, root.style.getPropertyValue(name));
    root.style.setProperty(name, value);
  };

  Object.entries(tokens.colors ?? {}).forEach(([key, value]) => {
    setToken(TOKEN_MAP[key as keyof typeof TOKEN_MAP], value);
  });

  setToken('--font-head', tokens.typography?.heading);
  setToken('--font-body', tokens.typography?.body);
  setToken('--radius', normalizeRadius(tokens.radius));
  setToken('--radius-md', normalizeRadius(tokens.radius));

  if (tokens.spacing) {
    const section = tokens.spacing === 'compact' ? '56px' : tokens.spacing === 'spacious' ? '112px' : '88px';
    setToken('--section-py', section);
  }

  if (tokens.shadows) {
    const shadow = {
      none: 'none',
      soft: '0 8px 24px rgba(13,26,58,0.08)',
      medium: '0 16px 42px rgba(13,26,58,0.12)',
      strong: '0 24px 64px rgba(13,26,58,0.18)',
    }[tokens.shadows];
    setToken('--shadow-app', shadow);
  }

  root.dataset.themeMode = tokens.mode ?? 'light';

  return () => {
    previous.forEach((value, name) => {
      if (value) root.style.setProperty(name, value);
      else root.style.removeProperty(name);
    });
    delete root.dataset.themeMode;
  };
}
