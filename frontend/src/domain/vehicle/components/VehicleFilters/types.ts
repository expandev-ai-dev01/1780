import type { VehicleListParams } from '../../types';

export interface VehicleFiltersProps {
  filters: VehicleListParams;
  onFiltersChange: (filters: VehicleListParams) => void;
  availableOptions: {
    marcas: string[];
    modelos: string[];
    anos: number[];
    cambios: string[];
  };
}
