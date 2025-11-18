import type { VehicleSortProps } from './types';

const sortOptions = [
  { value: 'Relevância', label: 'Relevância' },
  { value: 'Preço (menor para maior)', label: 'Preço (menor para maior)' },
  { value: 'Preço (maior para menor)', label: 'Preço (maior para menor)' },
  { value: 'Ano (mais recente)', label: 'Ano (mais recente)' },
  { value: 'Ano (mais antigo)', label: 'Ano (mais antigo)' },
  { value: 'Modelo (A-Z)', label: 'Modelo (A-Z)' },
  { value: 'Modelo (Z-A)', label: 'Modelo (Z-A)' },
];

export const VehicleSort = ({ value, onChange }: VehicleSortProps) => {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort" className="text-sm font-medium">
        Ordenar por:
      </label>
      <select
        id="sort"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 rounded-sm border border-input bg-background px-3 py-2 text-sm focus-visible:outline-hidden focus-visible:ring-3 focus-visible:ring-ring"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
