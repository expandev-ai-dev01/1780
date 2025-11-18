import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import { Button } from '@/core/components/Button';
import { useVehicleDetail } from '@/domain/vehicle';
import { ContactForm } from '@/domain/contact';
import { VehicleGallery } from './_impl/VehicleGallery';
import { VehicleInfo } from './_impl/VehicleInfo';
import { VehicleSpecifications } from './_impl/VehicleSpecifications';
import { VehicleItems } from './_impl/VehicleItems';
import { VehicleHistory } from './_impl/VehicleHistory';
import { VehicleSaleConditions } from './_impl/VehicleSaleConditions';

export const VehicleDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showContactForm, setShowContactForm] = useState(false);

  const { vehicle, isLoading, error, refetch } = useVehicleDetail({
    vehicleId: id || '',
  });

  if (!id) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <h2 className="text-2xl font-bold text-red-600">ID do veículo não fornecido</h2>
        <Button onClick={() => navigate('/')}>Voltar para listagem</Button>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-red-600">Erro ao carregar veículo</h2>
          <p className="text-muted-foreground">
            Ocorreu um erro ao carregar os detalhes do veículo. Por favor, tente novamente.
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => refetch()}>Tentar novamente</Button>
          <Button variant="outline" onClick={() => navigate('/')}>
            Voltar para listagem
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!vehicle) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">Veículo não encontrado</h2>
          <p className="text-muted-foreground">
            O veículo solicitado não foi encontrado ou foi removido do catálogo.
          </p>
        </div>
        <Button onClick={() => navigate('/')}>Voltar para listagem</Button>
      </div>
    );
  }

  const isVehicleAvailable = vehicle.status_veiculo.toLowerCase() === 'disponível';

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => navigate(-1)}>
          ← Voltar
        </Button>
      </div>

      <VehicleInfo vehicle={vehicle} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <VehicleGallery photos={vehicle.fotos} />
        <VehicleSpecifications specifications={vehicle.especificacoes} />
      </div>

      <VehicleItems items={vehicle.itens} />

      <VehicleHistory history={vehicle.historico} />

      <VehicleSaleConditions conditions={vehicle.condicoes_venda} />

      {isVehicleAvailable && !showContactForm && (
        <div className="flex justify-center py-8">
          <Button size="lg" onClick={() => setShowContactForm(true)}>
            Tenho Interesse - Entrar em Contato
          </Button>
        </div>
      )}

      {showContactForm && (
        <div id="contact-form">
          <ContactForm
            vehicleId={vehicle.id_veiculo}
            vehicleModel={`${vehicle.especificacoes.marca} ${vehicle.especificacoes.modelo} (${vehicle.especificacoes.ano_modelo})`}
            onSuccess={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onCancel={() => setShowContactForm(false)}
          />
        </div>
      )}
    </div>
  );
};
