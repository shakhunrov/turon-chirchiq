import type { PageConfig } from './types';

export const MOCK_PAGE_CONFIGS: Record<string, PageConfig> = {
  'renderer-demo': {
    slug: 'renderer-demo',
    title: 'Renderer Demo',
    seo: {
      title: 'Backend Driven Renderer Demo',
      description: 'Hybrid backend-controlled page rendered by the frontend registry.',
    },
    theme: {
      colors: {
        primary: '#1a2b6b',
        primaryForeground: '#ffffff',
        accent: '#c9a535',
        background: '#f8f9fc',
        surface: '#ffffff',
        text: '#0d1a3a',
        border: 'rgba(26,43,107,0.15)',
      },
      radius: 'md',
      spacing: 'comfortable',
      shadows: 'soft',
    },
    sections: [
      {
        id: 'hero',
        type: 'hero',
        props: {
          eyebrow: 'Hybrid architecture',
          title: 'Backend controls structure. Frontend keeps the intelligence.',
          subtitle:
            'A typed renderer, component registry, theme engine, permissions, and reusable blocks ready for Django REST Framework.',
          actions: [
            { label: 'Admissions', href: '/admissions', variant: 'primary' },
            { label: 'Contact', href: '/contact', variant: 'outline' },
          ],
        },
      },
      {
        id: 'stats',
        type: 'stats',
        props: {
          eyebrow: 'Platform',
          title: 'Renderer capabilities',
          items: [
            { label: 'Typed components', value: '12+' },
            { label: 'Roles', value: '4' },
            { label: 'Reusable blocks', value: 'Yes' },
            { label: 'SSR ready', value: 'Yes' },
          ],
        },
      },
      {
        id: 'grid',
        type: 'grid',
        layout: { columns: { base: 1, md: 3 }, gap: { base: 'md', lg: 'lg' }, container: 'lg' },
        children: [
          {
            type: 'card',
            props: {
              title: 'Registry first',
              text: 'Backend sends component keys and props. Frontend owns implementation and behavior.',
            },
          },
          {
            type: 'card',
            props: {
              title: 'Layout aware',
              text: 'Rows, grids, sections, and nested blocks are rendered by a dedicated layout engine.',
            },
          },
          {
            type: 'card',
            visibility: { roles: ['admin', 'teacher'] },
            props: {
              title: 'Role controlled',
              text: 'This block appears only for admin or teacher roles.',
            },
          },
        ],
      },
      {
        id: 'cta',
        type: 'cta',
        props: {
          title: 'Use this as the migration target, not as a rewrite.',
          text: 'Existing pages can be wrapped with PageRenderer fallbacks while Django starts serving page configs.',
          action: { label: 'View legacy home', href: '/' },
        },
      },
    ],
  },
};
