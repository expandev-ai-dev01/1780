import { Card, CardContent } from '@/core/components/Card';
import { cn } from '@/core/utils';
import type { VehicleCardProps } from './types';

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);
};

const formatMileage = (mileage: number): string => {
  return new Intl.NumberFormat('pt-BR').format(mileage) + ' km';
};

export const VehicleCard = ({ vehicle, onClick }: VehicleCardProps) => {
  const handleClick = () => {
    onClick?.(vehicle.id_veiculo);
  };

  return (
    <Card
      className={cn(
        'cursor-pointer transition-all duration-300',
        'hover:shadow-lg hover:scale-105',
        'focus-visible:outline-hidden focus-visible:ring-3 focus-visible:ring-primary-500'
      )}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={`Ver detalhes do ${vehicle.marca} ${vehicle.modelo}`}
    >
      <CardContent className="p-0">
        <div className="aspect-video w-full overflow-hidden rounded-t-sm">
          <img
            src={vehicle.imagem_principal || '/placeholder-car.jpg'}
            alt={`${vehicle.marca} ${vehicle.modelo}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        <div className="p-4 space-y-2">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {vehicle.marca} {vehicle.modelo}
            </h3>
            <p className="text-sm text-muted-foreground">Ano: {vehicle.ano}</p>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-xl font-bold text-primary-600">{formatPrice(vehicle.preco)}</p>
          </div>

          {(vehicle.quilometragem || vehicle.cambio) && (
            <div className="flex gap-4 text-sm text-muted-foreground pt-2 border-t border-border">
              {vehicle.quilometragem && <span>{formatMileage(vehicle.quilometragem)}</span>}
              {vehicle.cambio && <span>{vehicle.cambio}</span>}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
