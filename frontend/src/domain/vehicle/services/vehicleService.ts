import { authenticatedClient } from '@/core/lib/api';
import type { Vehicle, VehicleListParams, VehicleListResponse, VehicleDetail } from '../types';

export const vehicleService = {
  async list(params: VehicleListParams): Promise<VehicleListResponse> {
    const response = await authenticatedClient.get('/vehicle', { params });
    return {
      data: response.data.data,
      metadata: response.data.metadata,
    };
  },

  async getById(id: string): Promise<VehicleDetail> {
    const response = await authenticatedClient.get(`/vehicle/${id}`);
    return response.data.data;
  },
};
