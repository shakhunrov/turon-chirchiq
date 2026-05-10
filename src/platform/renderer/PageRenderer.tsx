import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { fetchPageConfig } from '../cms/api';
import { applyThemeTokens } from '../cms/theme';
import type { PageConfig, RenderContext, UserRole } from '../cms/types';
import { registry as defaultRegistry } from './registry';
import { RegistryRenderer } from './RegistryRenderer';
import './renderer.css';

type PageRendererProps = {
  slug: string;
  legacyFallback?: ReactNode;
  backendEnabled?: boolean;
  role?: UserRole;
  permissions?: string[];
  featureFlags?: string[];
  locale?: string;
  allowMock?: boolean;
};

function applySeo(page: PageConfig) {
  if (typeof document === 'undefined') return;
  if (page.seo?.title || page.title) document.title = page.seo?.title ?? page.title ?? '';

  const upsertMeta = (name: string, content?: string) => {
    if (!content) return;
    let element = document.querySelector(`meta[name="${name}"]`);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute('name', name);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };

  upsertMeta('description', page.seo?.description);
  upsertMeta('robots', page.seo?.robots);
}

export function PageRenderer({
  slug,
  legacyFallback,
  backendEnabled = import.meta.env.VITE_BACKEND_RENDERER_ENABLED === 'true',
  role = 'guest',
  permissions = [],
  featureFlags = [],
  locale = 'uz',
  allowMock = false,
}: PageRendererProps) {
  const [page, setPage] = useState<PageConfig | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    if (!backendEnabled && legacyFallback) {
      setStatus('error');
      return undefined;
    }

    let active = true;
    setStatus('loading');
    setPage(null);

    fetchPageConfig(slug, { allowMock })
      .then((config) => {
        if (!active) return;
        setPage(config);
        setStatus('ready');
      })
      .catch(() => {
        if (!active) return;
        setStatus('error');
      });

    return () => {
      active = false;
    };
  }, [allowMock, backendEnabled, legacyFallback, slug]);

  useEffect(() => {
    if (!page) return undefined;
    applySeo(page);
    return applyThemeTokens(page.theme);
  }, [page]);

  const context = useMemo<RenderContext>(
    () => ({
      role,
      permissions,
      featureFlags,
      locale: page?.locale ?? locale,
      reusableBlocks: page?.reusableBlocks ?? {},
    }),
    [featureFlags, locale, page, permissions, role],
  );

  if (status === 'loading' && !legacyFallback) {
    return <div className="renderer-loading">Loading page...</div>;
  }

  if (status === 'error') {
    return legacyFallback ? <>{legacyFallback}</> : <div className="renderer-error">Page is unavailable.</div>;
  }

  if (!page) {
    return legacyFallback ? <>{legacyFallback}</> : <div className="renderer-empty">No page config.</div>;
  }

  return (
    <main className="renderer-page" data-page={page.slug}>
      {page.sections.map((node, index) => (
        <RegistryRenderer
          key={node.id ?? `${page.slug}-${node.type}-${index}`}
          node={node}
          registry={defaultRegistry}
          context={context}
        />
      ))}
    </main>
  );
}
