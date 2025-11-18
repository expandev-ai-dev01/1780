import { Card, CardContent } from '@/core/components/Card';
import { cn } from '@/core/utils';
import type { VehicleInfoProps } from './types';

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);
};

const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'disponível':
      return 'bg-green-100 text-green-800 border-green-300';
    case 'reservado':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'vendido':
      return 'bg-red-100 text-red-800 border-red-300';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};

export const VehicleInfo = ({ vehicle }: VehicleInfoProps) => {
  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">{vehicle.titulo_anuncio}</h1>
            <div
              className={cn(
                'inline-flex items-center px-3 py-1 rounded-sm text-sm font-medium border',
                getStatusColor(vehicle.status_veiculo)
              )}
            >
              {vehicle.status_veiculo}
            </div>
          </div>

          <div className="text-right">
            <p className="text-sm text-muted-foreground mb-1">Preço</p>
            <p className="text-3xl font-bold text-primary-600">{formatPrice(vehicle.preco)}</p>
          </div>
        </div>

        {vehicle.status_veiculo.toLowerCase() === 'vendido' && (
          <div className="bg-red-50 border border-red-200 rounded-sm p-4">
            <p className="text-red-800 font-medium">Este veículo já foi vendido.</p>
            <p className="text-red-600 text-sm mt-1">
              Confira outros veículos similares disponíveis em nosso catálogo.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
