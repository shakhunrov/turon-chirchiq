import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../shared/api/axiosInstance';

export function useCMSPages() {
  return useQuery({
    queryKey: ['cms-pages'],
    queryFn: async () => {
      const res = await api.get('/website-sources/cms/admin/pages/');
      return res.data;
    }
  });
}

export function useCMSPage(id: string | null) {
  return useQuery({
    queryKey: ['cms-page', id],
    queryFn: async () => {
      if (!id) return null;
      const res = await api.get(`/website-sources/cms/admin/pages/${id}/`);
      return res.data;
    },
    enabled: !!id
  });
}

export function useCMSComponents() {
  return useQuery({
    queryKey: ['cms-components'],
    queryFn: async () => {
      const res = await api.get('/website-sources/cms/admin/components/');
      return res.data;
    }
  });
}

export function useUpdatePage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string, data: any }) => {
      const res = await api.patch(`/website-sources/cms/admin/pages/${id}/`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cms-pages'] });
    }
  });
}

export function useCreatePage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await api.post('/website-sources/cms/admin/pages/', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cms-pages'] });
    }
  });
}

export function useMediaAssets() {
  return useQuery({
    queryKey: ['media-assets'],
    queryFn: async () => {
      const res = await api.get('/website-sources/cms/admin/media/');
      return res.data;
    }
  });
}

export function useUploadMedia() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await api.post('/website-sources/cms/admin/media/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media-assets'] });
    }
  });
}

export function useDeleteMedia() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/website-sources/cms/admin/media/${id}/`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media-assets'] });
    }
  });
}

export function useTranslations() {
  return useQuery({
    queryKey: ['translations'],
    queryFn: async () => {
      const res = await api.get('/website-sources/cms/admin/translations/');
      return res.data;
    }
  });
}

export function useUpdateTranslation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: number, data: any }) => {
      const res = await api.patch(`/website-sources/cms/admin/translations/${id}/`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['translations'] });
    }
  });
}

export function useCreateTranslation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await api.post('/website-sources/cms/admin/translations/', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['translations'] });
    }
  });
}

export function useMenus() {
  return useQuery({
    queryKey: ['menus'],
    queryFn: async () => {
      const res = await api.get('/website-sources/cms/admin/menus/');
      return res.data;
    }
  });
}

export function useUpdateMenu() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: number, data: any }) => {
      const res = await api.patch(`/website-sources/cms/admin/menus/${id}/`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menus'] });
    }
  });
}

export function useCreateComponent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await api.post('/website-sources/cms/admin/components/', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['components'] });
    }
  });
}

export function useDeleteComponent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/website-sources/cms/admin/components/${id}/`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['components'] });
    }
  });
}

export function useDynamicForms() {
  return useQuery({
    queryKey: ['dynamic-forms'],
    queryFn: async () => {
      const res = await api.get('/website-sources/cms/admin/forms/');
      return res.data;
    }
  });
}

export function useCreateForm() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await api.post('/website-sources/cms/admin/forms/', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dynamic-forms'] });
    }
  });
}

export function useUpdateForm() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: number, data: any }) => {
      const res = await api.patch(`/website-sources/cms/admin/forms/${id}/`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dynamic-forms'] });
    }
  });
}

export function useDeleteForm() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/website-sources/cms/admin/forms/${id}/`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dynamic-forms'] });
    }
  });
}

export function useNews() {
  return useQuery({
    queryKey: ['news'],
    queryFn: async () => {
      const res = await api.get('/website-sources/cms/admin/news/');
      return res.data;
    }
  });
}

export function useAdmissions() {
  return useQuery({
    queryKey: ['admissions'],
    queryFn: async () => {
      const res = await api.get('/website-sources/cms/admin/admissions/');
      return res.data;
    }
  });
}

export function useContacts() {
  return useQuery({
    queryKey: ['contacts'],
    queryFn: async () => {
      const res = await api.get('/website-sources/cms/admin/contacts/');
      return res.data;
    }
  });
}
