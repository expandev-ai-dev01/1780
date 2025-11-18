import { Card, CardHeader, CardTitle, CardContent } from '@/core/components/Card';
import { cn } from '@/core/utils';
import type { VehicleSaleConditionsProps } from './types';

const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'regular':
      return 'bg-green-100 text-green-800 border-green-300';
    case 'pendente':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'em andamento':
      return 'bg-blue-100 text-blue-800 border-blue-300';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};

export const VehicleSaleConditions = ({ conditions }: VehicleSaleConditionsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Condições de Venda</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-foreground">Formas de Pagamento</h4>
          <div className="flex flex-wrap gap-2">
            {conditions.formas_pagamento.map((forma, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-sm text-sm font-medium bg-primary-100 text-primary-800 border border-primary-300"
              >
                {forma}
              </span>
            ))}
          </div>
        </div>

        {conditions.condicoes_financiamento && (
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-foreground">Condições de Financiamento</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Entrada Mínima</p>
                <p className="text-base font-semibold text-foreground">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(conditions.condicoes_financiamento.entrada_minima)}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Taxa de Juros</p>
                <p className="text-base font-semibold text-foreground">
                  {conditions.condicoes_financiamento.taxa_juros}% a.m.
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Prazo Máximo</p>
                <p className="text-base font-semibold text-foreground">
                  {conditions.condicoes_financiamento.prazo_maximo} meses
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-foreground">Aceita Troca</h4>
          <p className="text-base text-foreground">
            {conditions.aceita_troca ? 'Sim, aceita troca por outro veículo' : 'Não aceita troca'}
          </p>
        </div>

        {conditions.observacoes_venda && (
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-foreground">Observações</h4>
            <p className="text-base text-muted-foreground">{conditions.observacoes_venda}</p>
          </div>
        )}

        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-foreground">Documentação Necessária</h4>
          <ul className="space-y-2">
            {conditions.documentacao_necessaria.map((doc, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-primary-500 mt-1">•</span>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{doc.nome}</p>
                  {doc.observacoes && (
                    <p className="text-sm text-muted-foreground">{doc.observacoes}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-foreground">Situação Documental</h4>
          <div className="border border-border rounded-sm p-4 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">Status:</span>
              <span
                className={cn(
                  'inline-flex items-center px-3 py-1 rounded-sm text-sm font-medium border',
                  getStatusColor(conditions.situacao_documental.status)
                )}
              >
                {conditions.situacao_documental.status}
              </span>
            </div>

            {conditions.situacao_documental.pendencias &&
              conditions.situacao_documental.pendencias.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Pendências:</p>
                  <ul className="space-y-1">
                    {conditions.situacao_documental.pendencias.map((pendencia, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-yellow-600 mt-0.5">⚠</span>
                        <span className="text-foreground">{pendencia}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            {conditions.situacao_documental.observacoes && (
              <p className="text-sm text-muted-foreground">
                {conditions.situacao_documental.observacoes}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
