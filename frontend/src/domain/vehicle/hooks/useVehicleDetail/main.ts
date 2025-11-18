import { useQuery } from '@tanstack/react-query';
import { vehicleService } from '../../services/vehicleService';
import type { UseVehicleDetailOptions, UseVehicleDetailReturn } from './types';

export const useVehicleDetail = (options: UseVehicleDetailOptions): UseVehicleDetailReturn => {
  const queryKey = ['vehicle', options.vehicleId];

  const { data, isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn: () => vehicleService.getById(options.vehicleId),
    enabled: !!options.vehicleId,
    retry: 3,
    retryDelay: 2000,
  });

  return {
    vehicle: data || null,
    isLoading,
    error: error as Error | null,
    refetch,
  };
};
