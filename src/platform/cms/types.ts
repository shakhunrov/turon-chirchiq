import type { ComponentType, ReactNode } from 'react';

export type UserRole = 'admin' | 'teacher' | 'student' | 'guest';
export type Breakpoint = 'base' | 'sm' | 'md' | 'lg' | 'xl';

export type VisibilityRule = {
  roles?: UserRole[];
  permissions?: string[];
  featureFlags?: string[];
  audience?: 'public' | 'authenticated' | 'staff';
};

export type ResponsiveValue<T> = Partial<Record<Breakpoint, T>>;

export type SpacingConfig = {
  padding?: ResponsiveValue<'none' | 'sm' | 'md' | 'lg' | 'xl'>;
  margin?: ResponsiveValue<'none' | 'sm' | 'md' | 'lg' | 'xl'>;
  gap?: ResponsiveValue<'none' | 'sm' | 'md' | 'lg' | 'xl'>;
};

export type LayoutConfig = SpacingConfig & {
  container?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between';
  columns?: number | ResponsiveValue<number>;
  variant?: 'section' | 'surface' | 'dashboard' | 'plain';
};

export type ThemeMode = 'light' | 'dark' | 'system';

export type ThemeTokens = {
  mode?: ThemeMode;
  colors?: {
    primary?: string;
    primaryForeground?: string;
    secondary?: string;
    accent?: string;
    background?: string;
    surface?: string;
    text?: string;
    muted?: string;
    border?: string;
  };
  typography?: {
    heading?: string;
    body?: string;
    scale?: 'compact' | 'comfortable' | 'large';
  };
  radius?: 'sm' | 'md' | 'lg' | string;
  shadows?: 'none' | 'soft' | 'medium' | 'strong';
  spacing?: 'compact' | 'comfortable' | 'spacious';
};

export type SeoConfig = {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
  robots?: 'index,follow' | 'noindex,nofollow';
};

export type RenderNode<Props = Record<string, unknown>> = {
  id?: string;
  type: string;
  props?: Props;
  children?: RenderNode[];
  layout?: LayoutConfig;
  visibility?: VisibilityRule;
  responsive?: Partial<Record<Breakpoint, Partial<Props>>>;
};

export type MenuItem = {
  label: string;
  href: string;
  icon?: string;
  visibility?: VisibilityRule;
  children?: MenuItem[];
};

export type PageConfig = {
  slug: string;
  title?: string;
  version?: number;
  locale?: string;
  seo?: SeoConfig;
  theme?: ThemeTokens;
  navigation?: MenuItem[];
  footer?: RenderNode[];
  sections: RenderNode[];
  reusableBlocks?: Record<string, RenderNode[]>;
  permissions?: VisibilityRule;
  cache?: {
    ttlSeconds?: number;
    tags?: string[];
    staleWhileRevalidate?: boolean;
  };
};

export type RenderContext = {
  role: UserRole;
  permissions: string[];
  featureFlags: string[];
  locale: string;
  reusableBlocks: Record<string, RenderNode[]>;
};

export type RendererComponent<Props = Record<string, unknown>> = ComponentType<
  Props & {
    node?: RenderNode<Props>;
    children?: ReactNode;
  }
>;

export type ComponentRegistry = Record<string, RendererComponent<any>>;
