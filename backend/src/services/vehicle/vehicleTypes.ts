/**
 * @interface VehicleEntity
 * @description Represents a vehicle entity in the system
 *
 * @property {string} id_veiculo - Unique vehicle identifier
 * @property {string} modelo - Vehicle model name
 * @property {string} marca - Vehicle brand
 * @property {number} ano - Vehicle year
 * @property {number} preco - Vehicle price in BRL
 * @property {string} imagem_principal - Main image URL
 * @property {number} [quilometragem] - Vehicle mileage (optional)
 * @property {string} [cambio] - Transmission type (optional)
 */
export interface VehicleEntity {
  id_veiculo: string;
  modelo: string;
  marca: string;
  ano: number;
  preco: number;
  imagem_principal: string;
  quilometragem?: number;
  cambio?: string;
}

/**
 * @interface VehicleListFilters
 * @description Filters for vehicle listing
 *
 * @property {string[]} [marca] - Filter by brand(s)
 * @property {string[]} [modelo] - Filter by model(s)
 * @property {number} [anoMin] - Minimum year filter
 * @property {number} [anoMax] - Maximum year filter
 * @property {number} [precoMin] - Minimum price filter
 * @property {number} [precoMax] - Maximum price filter
 * @property {string[]} [cambio] - Filter by transmission type(s)
 * @property {string} ordenacao - Sort criteria
 * @property {number} pagina - Page number
 * @property {number} itensPorPagina - Items per page
 */
export interface VehicleListFilters {
  marca?: string[];
  modelo?: string[];
  anoMin?: number;
  anoMax?: number;
  precoMin?: number;
  precoMax?: number;
  cambio?: string[];
  ordenacao: string;
  pagina: number;
  itensPorPagina: number;
}

/**
 * @interface VehicleListResponse
 * @description Response structure for vehicle listing
 *
 * @property {VehicleEntity[]} data - Array of vehicles
 * @property {number} page - Current page number
 * @property {number} pageSize - Items per page
 * @property {number} total - Total number of vehicles
 */
export interface VehicleListResponse {
  data: VehicleEntity[];
  page: number;
  pageSize: number;
  total: number;
}

/**
 * @interface VehiclePhoto
 * @description Represents a vehicle photo
 *
 * @property {string} url - Photo URL
 * @property {string} [legenda] - Photo caption
 * @property {boolean} principal - Is main photo
 */
export interface VehiclePhoto {
  url: string;
  legenda?: string;
  principal: boolean;
}

/**
 * @interface VehicleSpecifications
 * @description Technical specifications of a vehicle
 *
 * @property {string} marca - Brand
 * @property {string} modelo - Model
 * @property {number} ano_fabricacao - Manufacturing year
 * @property {number} ano_modelo - Model year
 * @property {number} quilometragem - Mileage
 * @property {string} combustivel - Fuel type
 * @property {string} cambio - Transmission
 * @property {string} potencia - Engine power
 * @property {string} cor - Color
 * @property {number} portas - Number of doors
 * @property {string} carroceria - Body type
 * @property {string} motor - Engine displacement
 * @property {number} final_placa - License plate final digit
 */
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

/**
 * @interface VehicleItem
 * @description Represents a vehicle item or feature
 *
 * @property {string} nome - Item name
 * @property {string} categoria - Item category
 */
export interface VehicleItem {
  nome: string;
  categoria: string;
}

/**
 * @interface VehicleItems
 * @description Vehicle items and features
 *
 * @property {VehicleItem[]} itens_serie - Standard items
 * @property {VehicleItem[]} [opcionais] - Optional items
 */
export interface VehicleItems {
  itens_serie: VehicleItem[];
  opcionais?: VehicleItem[];
}

/**
 * @interface VehicleServiceRecord
 * @description Service record entry
 *
 * @property {Date} data - Service date
 * @property {number} quilometragem - Mileage at service
 * @property {string} local - Service location
 */
export interface VehicleServiceRecord {
  data: Date;
  quilometragem: number;
  local: string;
}

/**
 * @interface VehicleAccidentRecord
 * @description Accident record entry
 *
 * @property {Date} data - Accident date
 * @property {string} tipo - Accident type
 * @property {string} descricao - Accident description
 */
export interface VehicleAccidentRecord {
  data: Date;
  tipo: string;
  descricao: string;
}

/**
 * @interface VehicleTechnicalInspection
 * @description Technical inspection information
 *
 * @property {Date} data - Inspection date
 * @property {string} resultado - Inspection result
 */
export interface VehicleTechnicalInspection {
  data: Date;
  resultado: string;
}

/**
 * @interface VehicleHistory
 * @description Vehicle history information
 *
 * @property {string} procedencia - Origin
 * @property {number} proprietarios - Number of previous owners
 * @property {string} [garantia] - Warranty information
 * @property {VehicleServiceRecord[]} [revisoes] - Service history
 * @property {VehicleAccidentRecord[]} [sinistros] - Accident history
 * @property {VehicleTechnicalInspection} [laudo_tecnico] - Technical inspection
 */
export interface VehicleHistory {
  procedencia: string;
  proprietarios: number;
  garantia?: string;
  revisoes?: VehicleServiceRecord[];
  sinistros?: VehicleAccidentRecord[];
  laudo_tecnico?: VehicleTechnicalInspection;
}

/**
 * @interface VehicleFinancingConditions
 * @description Financing conditions
 *
 * @property {number} entrada_minima - Minimum down payment
 * @property {number} taxa_juros - Interest rate
 * @property {number} prazo_maximo - Maximum term
 */
export interface VehicleFinancingConditions {
  entrada_minima: number;
  taxa_juros: number;
  prazo_maximo: number;
}

/**
 * @interface VehicleDocument
 * @description Required document information
 *
 * @property {string} nome - Document name
 * @property {string} [observacoes] - Document notes
 */
export interface VehicleDocument {
  nome: string;
  observacoes?: string;
}

/**
 * @interface VehicleDocumentStatus
 * @description Document status information
 *
 * @property {string} status - Status
 * @property {string[]} [pendencias] - Pending items
 * @property {string} [observacoes] - Status notes
 */
export interface VehicleDocumentStatus {
  status: string;
  pendencias?: string[];
  observacoes?: string;
}

/**
 * @interface VehicleSaleConditions
 * @description Sale conditions information
 *
 * @property {string[]} formas_pagamento - Payment methods
 * @property {VehicleFinancingConditions} [condicoes_financiamento] - Financing conditions
 * @property {boolean} aceita_troca - Accepts trade-in
 * @property {string} [observacoes_venda] - Sale notes
 * @property {VehicleDocument[]} documentacao_necessaria - Required documentation
 * @property {VehicleDocumentStatus} situacao_documental - Document status
 */
export interface VehicleSaleConditions {
  formas_pagamento: string[];
  condicoes_financiamento?: VehicleFinancingConditions;
  aceita_troca: boolean;
  observacoes_venda?: string;
  documentacao_necessaria: VehicleDocument[];
  situacao_documental: VehicleDocumentStatus;
}

/**
 * @interface VehicleDetailEntity
 * @description Detailed vehicle information
 *
 * @property {string} id_veiculo - Vehicle identifier
 * @property {string} titulo_anuncio - Vehicle title
 * @property {number} preco - Vehicle price
 * @property {string} status_veiculo - Vehicle status
 * @property {VehiclePhoto[]} fotos - Photo gallery
 * @property {VehicleSpecifications} especificacoes - Technical specifications
 * @property {VehicleItems} itens - Items and features
 * @property {VehicleHistory} historico - Vehicle history
 * @property {VehicleSaleConditions} condicoes_venda - Sale conditions
 */
export interface VehicleDetailEntity {
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
