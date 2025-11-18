export interface Vehicle {
  id_veiculo: string;
  modelo: string;
  marca: string;
  ano: number;
  preco: number;
  imagem_principal: string;
  quilometragem?: number;
  cambio?: string;
}

export interface VehicleListParams {
  marca?: string[];
  modelo?: string[];
  anoMin?: number;
  anoMax?: number;
  precoMin?: number;
  precoMax?: number;
  cambio?: string[];
  ordenacao?: string;
  pagina?: number;
  itensPorPagina?: number;
}

export interface VehicleListResponse {
  data: Vehicle[];
  metadata: {
    page: number;
    pageSize: number;
    total: number;
  };
}

export interface FilterOptions {
  marcas: string[];
  modelos: string[];
  anos: number[];
  cambios: string[];
}

export interface VehiclePhoto {
  url: string;
  legenda?: string;
  principal: boolean;
}

export interface VehicleSpecifications {
  marca: string;
  modelo: string;
  ano_fabricacao: number;
  ano_modelo: number;
  quilometragem: number;
  combustivel: string;
  cambio: string;
  potencia: string;
  cor: string;
  portas: number;
  carroceria: string;
  motor: string;
  final_placa: number;
}

export interface VehicleItem {
  nome: string;
  categoria: string;
}

export interface VehicleItems {
  itens_serie: VehicleItem[];
  opcionais?: VehicleItem[];
}

export interface VehicleRevision {
  data: string;
  quilometragem: number;
  local: string;
}

export interface VehicleAccident {
  data: string;
  tipo: string;
  descricao: string;
}

export interface VehicleTechnicalReport {
  data: string;
  resultado: string;
}

export interface VehicleHistory {
  procedencia: string;
  proprietarios: number;
  garantia?: string;
  revisoes?: VehicleRevision[];
  sinistros?: VehicleAccident[];
  laudo_tecnico?: VehicleTechnicalReport;
}

export interface VehicleFinancingConditions {
  entrada_minima: number;
  taxa_juros: number;
  prazo_maximo: number;
}

export interface VehicleDocument {
  nome: string;
  observacoes?: string;
}

export interface VehicleDocumentStatus {
  status: string;
  pendencias?: string[];
  observacoes?: string;
}

export interface VehicleSaleConditions {
  formas_pagamento: string[];
  condicoes_financiamento?: VehicleFinancingConditions;
  aceita_troca: boolean;
  observacoes_venda?: string;
  documentacao_necessaria: VehicleDocument[];
  situacao_documental: VehicleDocumentStatus;
}

export interface VehicleDetail {
  id_veiculo: string;
  titulo_anuncio: string;
  preco: number;
  status_veiculo: string;
  fotos: VehiclePhoto[];
  especificacoes: VehicleSpecifications;
  itens: VehicleItems;
  historico: VehicleHistory;
  condicoes_venda: VehicleSaleConditions;
}
