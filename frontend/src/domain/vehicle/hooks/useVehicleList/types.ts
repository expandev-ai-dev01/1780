import type { VehicleListParams, Vehicle } from '../../types';

export interface UseVehicleListOptions {
  filters: VehicleListParams;
}

export interface UseVehicleListReturn {
  vehicles: Vehicle[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
  total: number;
  page: number;
  pageSize: number;
}
