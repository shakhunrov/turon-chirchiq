import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { websiteService } from './services';

export const useNews = (params) => {
  return useQuery({
    queryKey: ['news', params],
    queryFn: () => websiteService.getNews(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useAdmissionMutation = () => {
  return useMutation({
    mutationFn: websiteService.submitAdmission,
  });
};

export const useContactMutation = () => {
  return useMutation({
    mutationFn: websiteService.submitContact,
  });
};

export const useJobPositions = (params) => {
  return useQuery({
    queryKey: ['jobPositions', params],
    queryFn: () => websiteService.getJobPositions(params),
  });
};

export const useJobApplicationMutation = () => {
  return useMutation({
    mutationFn: websiteService.applyForJob,
  });
};

export const useStats = (lang, branchId) => {
  return useQuery({
    queryKey: ['stats', lang, branchId],
    queryFn: () => websiteService.getStats(lang, branchId),
  });
};

export const useTestimonials = (lang, branchId) => {
  return useQuery({
    queryKey: ['testimonials', lang, branchId],
    queryFn: () => websiteService.getTestimonials(lang, branchId),
  });
};

export const usePartners = (lang, branchId) => {
  return useQuery({
    queryKey: ['partners', lang, branchId],
    queryFn: () => websiteService.getPartners(lang, branchId),
  });
};

export const useLeadership = (lang, branchId) => {
  return useQuery({
    queryKey: ['leadership', lang, branchId],
    queryFn: () => websiteService.getLeadership(lang, branchId),
  });
};
