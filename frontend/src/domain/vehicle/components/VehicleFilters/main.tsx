import { useState, useEffect } from 'react';
import { Button } from '@/core/components/Button';
import { Input } from '@/core/components/Input';
import type { VehicleFiltersProps } from './types';
import type { VehicleListParams } from '../../types';

export const VehicleFilters = ({
  filters,
  onFiltersChange,
  availableOptions,
}: VehicleFiltersProps) => {
  const [localFilters, setLocalFilters] = useState<VehicleListParams>(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleMarcaChange = (marca: string) => {
    const currentMarcas = localFilters.marca || [];
    const newMarcas = currentMarcas.includes(marca)
      ? currentMarcas.filter((m) => m !== marca)
      : [...currentMarcas, marca];

    const updatedFilters = { ...localFilters, marca: newMarcas.length > 0 ? newMarcas : undefined };

    if (newMarcas.length === 0) {
      updatedFilters.modelo = undefined;
    } else if (localFilters.modelo) {
      const availableModelos = availableOptions.modelos.filter((modelo) =>
        newMarcas.some((m) => modelo.includes(m))
      );
      updatedFilters.modelo = localFilters.modelo.filter((m) => availableModelos.includes(m));
      if (updatedFilters.modelo.length === 0) {
        updatedFilters.modelo = undefined;
      }
    }

    setLocalFilters(updatedFilters);
  };

  const handleModeloChange = (modelo: string) => {
    const currentModelos = localFilters.modelo || [];
    const newModelos = currentModelos.includes(modelo)
      ? currentModelos.filter((m) => m !== modelo)
      : [...currentModelos, modelo];

    setLocalFilters({
      ...localFilters,
      modelo: newModelos.length > 0 ? newModelos : undefined,
    });
  };

  const handleCambioChange = (cambio: string) => {
    const currentCambios = localFilters.cambio || [];
    const newCambios = currentCambios.includes(cambio)
      ? currentCambios.filter((c) => c !== cambio)
      : [...currentCambios, cambio];

    setLocalFilters({
      ...localFilters,
      cambio: newCambios.length > 0 ? newCambios : undefined,
    });
  };

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters: VehicleListParams = {
      ordenacao: localFilters.ordenacao,
      pagina: 1,
      itensPorPagina: localFilters.itensPorPagina,
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const availableModelos =
    localFilters.marca && localFilters.marca.length > 0
      ? availableOptions.modelos.filter((modelo) =>
          localFilters.marca!.some((m) => modelo.includes(m))
        )
      : availableOptions.modelos;

  return (
    <div className="space-y-6 p-4 bg-muted rounded-sm">
      <div>
        <h3 className="text-lg font-semibold mb-3">Filtros</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Marca</label>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {availableOptions.marcas.map((marca) => (
              <label key={marca} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={localFilters.marca?.includes(marca) || false}
                  onChange={() => handleMarcaChange(marca)}
                  className="rounded border-gray-300"
                />
                <span className="text-sm">{marca}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Modelo</label>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {availableModelos.map((modelo) => (
              <label key={modelo} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={localFilters.modelo?.includes(modelo) || false}
                  onChange={() => handleModeloChange(modelo)}
                  className="rounded border-gray-300"
                />
                <span className="text-sm">{modelo}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Ano</label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Mínimo</label>
              <select
                value={localFilters.anoMin || ''}
                onChange={(e) =>
                  setLocalFilters({
                    ...localFilters,
                    anoMin: e.target.value ? parseInt(e.target.value) : undefined,
                  })
                }
                className="w-full h-10 rounded-sm border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Selecione</option>
                {availableOptions.anos.map((ano) => (
                  <option key={ano} value={ano}>
                    {ano}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Máximo</label>
              <select
                value={localFilters.anoMax || ''}
                onChange={(e) =>
                  setLocalFilters({
                    ...localFilters,
                    anoMax: e.target.value ? parseInt(e.target.value) : undefined,
                  })
                }
                className="w-full h-10 rounded-sm border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Selecione</option>
                {availableOptions.anos.map((ano) => (
                  <option key={ano} value={ano}>
                    {ano}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Preço</label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Mínimo</label>
              <Input
                type="number"
                placeholder="R$ 0"
                value={localFilters.precoMin || ''}
                onChange={(e) =>
                  setLocalFilters({
                    ...localFilters,
                    precoMin: e.target.value ? parseFloat(e.target.value) : undefined,
                  })
                }
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Máximo</label>
              <Input
                type="number"
                placeholder="R$ 0"
                value={localFilters.precoMax || ''}
                onChange={(e) =>
                  setLocalFilters({
                    ...localFilters,
                    precoMax: e.target.value ? parseFloat(e.target.value) : undefined,
                  })
                }
              />
            </div>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Câmbio</label>
          <div className="space-y-2">
            {availableOptions.cambios.map((cambio) => (
              <label key={cambio} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={localFilters.cambio?.includes(cambio) || false}
                  onChange={() => handleCambioChange(cambio)}
                  className="rounded border-gray-300"
                />
                <span className="text-sm">{cambio}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-2 pt-4 border-t border-border">
        <Button onClick={handleApplyFilters} className="flex-1">
          Aplicar Filtros
        </Button>
        <Button onClick={handleClearFilters} variant="outline" className="flex-1">
          Limpar
        </Button>
      </div>
    </div>
  );
};
