import { Card, CardHeader, CardTitle, CardContent } from '@/core/components/Card';
import type { VehicleSpecificationsProps } from './types';

const formatMileage = (mileage: number): string => {
  return new Intl.NumberFormat('pt-BR').format(mileage) + ' km';
};

export const VehicleSpecifications = ({ specifications }: VehicleSpecificationsProps) => {
  const specs = [
    { label: 'Marca', value: specifications.marca },
    { label: 'Modelo', value: specifications.modelo },
    { label: 'Ano Fabricação', value: specifications.ano_fabricacao },
    { label: 'Ano Modelo', value: specifications.ano_modelo },
    { label: 'Quilometragem', value: formatMileage(specifications.quilometragem) },
    { label: 'Combustível', value: specifications.combustivel },
    { label: 'Câmbio', value: specifications.cambio },
    { label: 'Potência', value: specifications.potencia },
    { label: 'Cor', value: specifications.cor },
    { label: 'Portas', value: specifications.portas },
    { label: 'Carroceria', value: specifications.carroceria },
    { label: 'Motor', value: specifications.motor },
    { label: 'Final da Placa', value: specifications.final_placa },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Especificações Técnicas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {specs.map((spec, index) => (
            <div key={index} className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">{spec.label}</p>
              <p className="text-base font-semibold text-foreground">{spec.value}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
