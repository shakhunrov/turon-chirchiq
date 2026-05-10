import { createContext, useContext, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../api';
import en from './en';
import ru from './ru';
import uz from './uz';

const fallbacks = { en, ru, uz };
const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'uz');
  const branchId = 6;

  const { data: remoteTranslations, isLoading } = useQuery({
    queryKey: ['translations', lang, branchId],
    queryFn: async () => {
      const { data } = await api.get('/website-sources/public/translations/', {
        params: { locale: lang, branch: branchId }
      });
      return data;
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  // Deep merge helper
  const deepMerge = (target, source) => {
    const output = { ...target };
    if (source && typeof source === 'object') {
      Object.keys(source).forEach(key => {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
          output[key] = deepMerge(target[key] || {}, source[key]);
        } else {
          output[key] = source[key];
        }
      });
    }
    return output;
  };

  const t = deepMerge(fallbacks[lang], remoteTranslations || {});

  return (
    <LangContext.Provider value={{ lang, setLang, t, isLoading }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const context = useContext(LangContext);
  if (!context) throw new Error('useLang must be used within LangProvider');
  return context;
}
