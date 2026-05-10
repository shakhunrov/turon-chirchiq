import api from './axiosInstance';

export const websiteService = {
  // Static content and translations
  getTranslations: async (lang, branchId) => {
    const { data } = await api.get('/website-sources/public/translations/', {
      params: { locale: lang, branch: branchId }
    });
    return data;
  },

  // News
  getNews: async (params) => {
    const { data } = await api.get('/website-sources/public/news/', { params });
    return data;
  },
  getNewsById: async (id) => {
    const { data } = await api.get(`/website-sources/public/news/${id}/`);
    return data.data;
  },

  // Admissions
  submitAdmission: async (payload) => {
    const { data } = await api.post('/website-sources/admissions/', payload);
    return data;
  },

  // Contact
  submitContact: async (payload) => {
    const { data } = await api.post('/website-sources/contact/', payload);
    return data;
  },

  // Careers
  getJobPositions: async (params) => {
    const { data } = await api.get('/website-sources/careers/positions/', { params });
    return data;
  },
  applyForJob: async (formData) => {
    const { data } = await api.post('/website-sources/careers/apply/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data;
  },

  // Lists
  getStats: async (lang, branchId) => {
    const { data } = await api.get('/website-sources/public/stats/', {
      params: { locale: lang, branch: branchId }
    });
    return data;
  },
  getTestimonials: async (lang, branchId) => {
    const { data } = await api.get('/website-sources/public/testimonials/', {
      params: { locale: lang, branch: branchId }
    });
    return data;
  },
  getPartners: async (lang, branchId) => {
    const { data } = await api.get('/website-sources/public/partners/', {
      params: { locale: lang, branch: branchId }
    });
    return data;
  },
  getLeadership: async (lang, branchId) => {
    const { data } = await api.get('/website-sources/public/leadership/', {
      params: { locale: lang, branch: branchId }
    });
    return data;
  }
};
