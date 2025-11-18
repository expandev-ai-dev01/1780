import { Card, CardHeader, CardTitle, CardContent } from '@/core/components/Card';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { VehicleHistoryProps } from './types';

export const VehicleHistory = ({ history }: VehicleHistoryProps) => {
  const hasNoAccidents = !history.sinistros || history.sinistros.length === 0;
  const hasAllRevisionsInDealer =
    history.revisoes &&
    history.revisoes.length > 0 &&
    history.revisoes.every((r) => r.local.toLowerCase().includes('concessionária'));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico do Veículo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Procedência</p>
            <p className="text-base font-semibold text-foreground">{history.procedencia}</p>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Proprietários</p>
            <p className="text-base font-semibold text-foreground">{history.proprietarios}</p>
          </div>

          {history.garantia && (
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Garantia</p>
              <p className="text-base font-semibold text-foreground">{history.garantia}</p>
            </div>
          )}
        </div>

        {hasNoAccidents && (
          <div className="bg-green-50 border border-green-200 rounded-sm p-4">
            <p className="text-green-800 font-medium flex items-center gap-2">
              <span className="text-xl">✓</span>
              Sem registro de sinistros
            </p>
          </div>
        )}

        {hasAllRevisionsInDealer && (
          <div className="bg-blue-50 border border-blue-200 rounded-sm p-4">
            <p className="text-blue-800 font-medium flex items-center gap-2">
              <span className="text-xl">✓</span>
              Revisões em dia na concessionária
            </p>
          </div>
        )}

        {history.revisoes && history.revisoes.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-foreground">Histórico de Revisões</h4>
            <div className="space-y-2">
              {history.revisoes.map((revisao, index) => (
                <div key={index} className="border border-border rounded-sm p-3 space-y-1">
                  <div className="flex justify-between items-start">
                    <p className="font-medium text-foreground">
                      {format(new Date(revisao.data), "dd 'de' MMMM 'de' yyyy", {
                        locale: ptBR,
                      })}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Intl.NumberFormat('pt-BR').format(revisao.quilometragem)} km
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">{revisao.local}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {history.sinistros && history.sinistros.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-red-600">Histórico de Sinistros</h4>
            <div className="space-y-2">
              {history.sinistros.map((sinistro, index) => (
                <div
                  key={index}
                  className="border border-red-200 bg-red-50 rounded-sm p-3 space-y-1"
                >
                  <div className="flex justify-between items-start">
                    <p className="font-medium text-red-800">
                      {format(new Date(sinistro.data), "dd 'de' MMMM 'de' yyyy", {
                        locale: ptBR,
                      })}
                    </p>
                    <p className="text-sm text-red-600">{sinistro.tipo}</p>
                  </div>
                  <p className="text-sm text-red-700">{sinistro.descricao}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {history.laudo_tecnico && (
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-foreground">Laudo Técnico</h4>
            <div className="border border-border rounded-sm p-4 space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">Data da Inspeção</p>
                <p className="font-medium text-foreground">
                  {format(new Date(history.laudo_tecnico.data), "dd 'de' MMMM 'de' yyyy", {
                    locale: ptBR,
                  })}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">Resultado</p>
                <p className="font-medium text-foreground">{history.laudo_tecnico.resultado}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
