import api from '../../shared/api/axiosInstance';
import { MOCK_PAGE_CONFIGS } from './mockPageConfigs';
import type { PageConfig } from './types';

const pageCache = new Map<string, { expiresAt: number; page: PageConfig }>();

function getCachedPage(slug: string) {
  const cached = pageCache.get(slug);
  if (!cached || cached.expiresAt < Date.now()) {
    pageCache.delete(slug);
    return null;
  }
  return cached.page;
}

function setCachedPage(page: PageConfig) {
  const ttl = page.cache?.ttlSeconds ?? 60;
  pageCache.set(page.slug, {
    page,
    expiresAt: Date.now() + ttl * 1000,
  });
}

export async function fetchPageConfig(slug: string, options?: { allowMock?: boolean }) {
  const cached = getCachedPage(slug);
  if (cached) return cached;

  try {
    const { data } = await api.get<PageConfig>(`/website-sources/cms/pages/${slug}/render/`);
    setCachedPage(data);
    return data;
  } catch (error) {
    if (options?.allowMock && MOCK_PAGE_CONFIGS[slug]) {
      return MOCK_PAGE_CONFIGS[slug];
    }
    throw error;
  }
}
