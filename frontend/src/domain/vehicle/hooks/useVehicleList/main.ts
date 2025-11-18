import { useQuery } from '@tanstack/react-query';
import { vehicleService } from '../../services/vehicleService';
import type { UseVehicleListOptions, UseVehicleListReturn } from './types';

export const useVehicleList = (options: UseVehicleListOptions): UseVehicleListReturn => {
  const queryKey = ['vehicles', options.filters];

  const { data, isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn: () => vehicleService.list(options.filters),
    retry: 3,
    retryDelay: 2000,
  });

  return {
    vehicles: data?.data || [],
    isLoading,
    error: error as Error | null,
    refetch,
    total: data?.metadata.total || 0,
    page: data?.metadata.page || 1,
    pageSize: data?.metadata.pageSize || 12,
  };
};
