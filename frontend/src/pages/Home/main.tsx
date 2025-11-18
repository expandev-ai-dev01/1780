import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import { Button } from '@/core/components/Button';
import {
  useVehicleList,
  VehicleCard,
  VehicleFilters,
  VehicleSort,
  VehiclePagination,
  type VehicleListParams,
} from '@/domain/vehicle';

const mockFilterOptions = {
  marcas: ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'Volkswagen'],
  modelos: ['Corolla', 'Civic', 'Fusion', 'Cruze', 'Jetta'],
  anos: [2024, 2023, 2022, 2021, 2020, 2019, 2018],
  cambios: ['Manual', 'Automático', 'CVT', 'Semi-automático'],
};

export const HomePage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const getFiltersFromUrl = (): VehicleListParams => {
    const marca = searchParams.getAll('marca');
    const modelo = searchParams.getAll('modelo');
    const cambio = searchParams.getAll('cambio');

    return {
      marca: marca.length > 0 ? marca : undefined,
      modelo: modelo.length > 0 ? modelo : undefined,
      anoMin: searchParams.get('anoMin') ? parseInt(searchParams.get('anoMin')!) : undefined,
      anoMax: searchParams.get('anoMax') ? parseInt(searchParams.get('anoMax')!) : undefined,
      precoMin: searchParams.get('precoMin')
        ? parseFloat(searchParams.get('precoMin')!)
        : undefined,
      precoMax: searchParams.get('precoMax')
        ? parseFloat(searchParams.get('precoMax')!)
        : undefined,
      cambio: cambio.length > 0 ? cambio : undefined,
      ordenacao: searchParams.get('ordenacao') || 'Relevância',
      pagina: searchParams.get('pagina') ? parseInt(searchParams.get('pagina')!) : 1,
      itensPorPagina: searchParams.get('itensPorPagina')
        ? parseInt(searchParams.get('itensPorPagina')!)
        : 12,
    };
  };

  const [filters, setFilters] = useState<VehicleListParams>(getFiltersFromUrl());

  const { vehicles, isLoading, error, refetch, total, page, pageSize } = useVehicleList({
    filters,
  });

  const totalPages = Math.ceil(total / pageSize);

  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.marca) filters.marca.forEach((m) => params.append('marca', m));
    if (filters.modelo) filters.modelo.forEach((m) => params.append('modelo', m));
    if (filters.anoMin) params.set('anoMin', filters.anoMin.toString());
    if (filters.anoMax) params.set('anoMax', filters.anoMax.toString());
    if (filters.precoMin) params.set('precoMin', filters.precoMin.toString());
    if (filters.precoMax) params.set('precoMax', filters.precoMax.toString());
    if (filters.cambio) filters.cambio.forEach((c) => params.append('cambio', c));
    if (filters.ordenacao) params.set('ordenacao', filters.ordenacao);
    if (filters.pagina) params.set('pagina', filters.pagina.toString());
    if (filters.itensPorPagina) params.set('itensPorPagina', filters.itensPorPagina.toString());

    setSearchParams(params);
  }, [filters, setSearchParams]);

  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      handlePageChange(totalPages);
    }
  }, [page, totalPages]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  const handleFiltersChange = (newFilters: VehicleListParams) => {
    setFilters({ ...newFilters, pagina: 1 });
  };

  const handleSortChange = (ordenacao: string) => {
    setFilters({ ...filters, ordenacao });
  };

  const handlePageChange = (pagina: number) => {
    setFilters({ ...filters, pagina });
  };

  const handleItemsPerPageChange = (itensPorPagina: number) => {
    setFilters({ ...filters, itensPorPagina, pagina: 1 });
  };

  const handleVehicleClick = (vehicleId: string) => {
    navigate(`/vehicle/${vehicleId}`);
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-red-600">Erro ao carregar veículos</h2>
          <p className="text-muted-foreground">
            Ocorreu um erro ao carregar a lista de veículos. Por favor, tente novamente.
          </p>
        </div>
        <Button onClick={() => refetch()}>Tentar novamente</Button>
      </div>
    );
  }

  const hasNoVehicles = !isLoading && total === 0 && !filters.marca && !filters.modelo;
  const hasNoResults = !isLoading && total === 0 && (filters.marca || filters.modelo);

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-3xl font-bold mb-2">Catálogo de Veículos</h1>
        <p className="text-lg text-muted-foreground">
          Explore nossa coleção de veículos disponíveis. Clique em qualquer carro para ver mais
          detalhes.
        </p>
      </section>

      <div className="flex flex-col lg:flex-row gap-6">
        <aside className="lg:w-64 flex-shrink-0">
          <div className="lg:hidden mb-4">
            <Button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              variant="outline"
              className="w-full"
            >
              {showMobileFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
            </Button>
          </div>

          <div className={`${showMobileFilters ? 'block' : 'hidden'} lg:block`}>
            <VehicleFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
              availableOptions={mockFilterOptions}
            />
          </div>
        </aside>

        <main className="flex-1 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              {total > 0 &&
                `${total} veículo${total !== 1 ? 's' : ''} encontrado${total !== 1 ? 's' : ''}`}
            </div>
            <VehicleSort value={filters.ordenacao || 'Relevância'} onChange={handleSortChange} />
          </div>

          {isLoading && <LoadingSpinner />}

          {hasNoVehicles && (
            <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4 text-center">
              <h2 className="text-2xl font-bold">Catálogo vazio</h2>
              <p className="text-muted-foreground max-w-md">
                Não há veículos disponíveis no catálogo no momento. Por favor, volte mais tarde ou
                entre em contato conosco para mais informações.
              </p>
            </div>
          )}

          {hasNoResults && (
            <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4 text-center">
              <h2 className="text-2xl font-bold">Nenhum veículo encontrado</h2>
              <p className="text-muted-foreground max-w-md">
                Não encontramos veículos com os filtros selecionados. Tente remover alguns filtros
                ou alterar os critérios de busca para ampliar os resultados.
              </p>
            </div>
          )}

          {!isLoading && vehicles.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {vehicles.map((vehicle) => (
                  <VehicleCard
                    key={vehicle.id_veiculo}
                    vehicle={vehicle}
                    onClick={handleVehicleClick}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <VehiclePagination
                  currentPage={page}
                  totalPages={totalPages}
                  itemsPerPage={pageSize}
                  totalItems={total}
                  onPageChange={handlePageChange}
                  onItemsPerPageChange={handleItemsPerPageChange}
                />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};
