import {
  VehicleEntity,
  VehicleListFilters,
  VehicleListResponse,
  VehicleDetailEntity,
} from './vehicleTypes';

const vehicles: VehicleEntity[] = [
  {
    id_veiculo: '1',
    modelo: 'Civic',
    marca: 'Honda',
    ano: 2023,
    preco: 135000,
    imagem_principal: 'https://via.placeholder.com/300x169?text=Honda+Civic',
    quilometragem: 15000,
    cambio: 'Automático',
  },
  {
    id_veiculo: '2',
    modelo: 'Corolla',
    marca: 'Toyota',
    ano: 2022,
    preco: 125000,
    imagem_principal: 'https://via.placeholder.com/300x169?text=Toyota+Corolla',
    quilometragem: 25000,
    cambio: 'CVT',
  },
  {
    id_veiculo: '3',
    modelo: 'Onix',
    marca: 'Chevrolet',
    ano: 2024,
    preco: 85000,
    imagem_principal: 'https://via.placeholder.com/300x169?text=Chevrolet+Onix',
    quilometragem: 5000,
    cambio: 'Manual',
  },
  {
    id_veiculo: '4',
    modelo: 'HB20',
    marca: 'Hyundai',
    ano: 2023,
    preco: 78000,
    imagem_principal: 'https://via.placeholder.com/300x169?text=Hyundai+HB20',
    quilometragem: 12000,
    cambio: 'Automático',
  },
  {
    id_veiculo: '5',
    modelo: 'Gol',
    marca: 'Volkswagen',
    ano: 2021,
    preco: 65000,
    imagem_principal: 'https://via.placeholder.com/300x169?text=VW+Gol',
    quilometragem: 35000,
    cambio: 'Manual',
  },
];

const vehicleDetails: Map<string, VehicleDetailEntity> = new Map([
  [
    '1',
    {
      id_veiculo: '1',
      titulo_anuncio: 'Honda Civic 2023',
      preco: 135000,
      status_veiculo: 'Disponível',
      fotos: [
        {
          url: 'https://via.placeholder.com/800x600?text=Honda+Civic+Front',
          legenda: 'Vista frontal',
          principal: true,
        },
        {
          url: 'https://via.placeholder.com/800x600?text=Honda+Civic+Side',
          legenda: 'Vista lateral',
          principal: false,
        },
        {
          url: 'https://via.placeholder.com/800x600?text=Honda+Civic+Interior',
          legenda: 'Interior',
          principal: false,
        },
        {
          url: 'https://via.placeholder.com/800x600?text=Honda+Civic+Dashboard',
          legenda: 'Painel',
          principal: false,
        },
      ],
      especificacoes: {
        marca: 'Honda',
        modelo: 'Civic',
        ano_fabricacao: 2023,
        ano_modelo: 2023,
        quilometragem: 15000,
        combustivel: 'Flex',
        cambio: 'Automático',
        potencia: '155 cv',
        cor: 'Prata',
        portas: 4,
        carroceria: 'Sedan',
        motor: '2.0',
        final_placa: 5,
      },
      itens: {
        itens_serie: [
          { nome: 'Ar-condicionado', categoria: 'Conforto' },
          { nome: 'Direção elétrica', categoria: 'Conforto' },
          { nome: 'Vidros elétricos', categoria: 'Conforto' },
          { nome: 'Travas elétricas', categoria: 'Conforto' },
          { nome: 'Airbag duplo', categoria: 'Segurança' },
          { nome: 'Freios ABS', categoria: 'Segurança' },
          { nome: 'Controle de estabilidade', categoria: 'Segurança' },
          { nome: 'Sensor de estacionamento', categoria: 'Tecnologia' },
          { nome: 'Câmera de ré', categoria: 'Tecnologia' },
          { nome: 'Central multimídia', categoria: 'Tecnologia' },
        ],
        opcionais: [
          { nome: 'Teto solar', categoria: 'Conforto' },
          { nome: 'Bancos de couro', categoria: 'Conforto' },
          { nome: 'Rodas de liga leve', categoria: 'Estética' },
        ],
      },
      historico: {
        procedencia: 'Concessionária',
        proprietarios: 1,
        garantia: 'Até 12/2025',
        revisoes: [
          {
            data: new Date('2023-06-15'),
            quilometragem: 10000,
            local: 'Concessionária Honda',
          },
        ],
        sinistros: [],
        laudo_tecnico: {
          data: new Date('2024-01-10'),
          resultado: 'Aprovado',
        },
      },
      condicoes_venda: {
        formas_pagamento: ['À vista', 'Financiamento'],
        condicoes_financiamento: {
          entrada_minima: 27000,
          taxa_juros: 1.49,
          prazo_maximo: 60,
        },
        aceita_troca: true,
        observacoes_venda: 'Aceita veículo como parte do pagamento',
        documentacao_necessaria: [
          { nome: 'RG', observacoes: 'Original' },
          { nome: 'CPF', observacoes: 'Original' },
          { nome: 'Comprovante de residência', observacoes: 'Atualizado' },
          { nome: 'CNH', observacoes: 'Válida' },
        ],
        situacao_documental: {
          status: 'Regular',
          pendencias: [],
          observacoes: 'Documentação completa e regularizada',
        },
      },
    },
  ],
  [
    '2',
    {
      id_veiculo: '2',
      titulo_anuncio: 'Toyota Corolla 2022',
      preco: 125000,
      status_veiculo: 'Disponível',
      fotos: [
        {
          url: 'https://via.placeholder.com/800x600?text=Toyota+Corolla+Front',
          legenda: 'Vista frontal',
          principal: true,
        },
        {
          url: 'https://via.placeholder.com/800x600?text=Toyota+Corolla+Side',
          legenda: 'Vista lateral',
          principal: false,
        },
        {
          url: 'https://via.placeholder.com/800x600?text=Toyota+Corolla+Interior',
          legenda: 'Interior',
          principal: false,
        },
      ],
      especificacoes: {
        marca: 'Toyota',
        modelo: 'Corolla',
        ano_fabricacao: 2022,
        ano_modelo: 2022,
        quilometragem: 25000,
        combustivel: 'Flex',
        cambio: 'CVT',
        potencia: '144 cv',
        cor: 'Branco',
        portas: 4,
        carroceria: 'Sedan',
        motor: '2.0',
        final_placa: 3,
      },
      itens: {
        itens_serie: [
          { nome: 'Ar-condicionado', categoria: 'Conforto' },
          { nome: 'Direção elétrica', categoria: 'Conforto' },
          { nome: 'Vidros elétricos', categoria: 'Conforto' },
          { nome: 'Airbag duplo', categoria: 'Segurança' },
          { nome: 'Freios ABS', categoria: 'Segurança' },
          { nome: 'Central multimídia', categoria: 'Tecnologia' },
        ],
        opcionais: [
          { nome: 'Sensor de estacionamento', categoria: 'Tecnologia' },
          { nome: 'Câmera de ré', categoria: 'Tecnologia' },
        ],
      },
      historico: {
        procedencia: 'Particular',
        proprietarios: 1,
        garantia: 'Até 06/2024',
        revisoes: [
          {
            data: new Date('2022-12-10'),
            quilometragem: 15000,
            local: 'Concessionária Toyota',
          },
        ],
        sinistros: [],
      },
      condicoes_venda: {
        formas_pagamento: ['À vista', 'Financiamento'],
        condicoes_financiamento: {
          entrada_minima: 25000,
          taxa_juros: 1.59,
          prazo_maximo: 48,
        },
        aceita_troca: true,
        documentacao_necessaria: [
          { nome: 'RG', observacoes: 'Original' },
          { nome: 'CPF', observacoes: 'Original' },
          { nome: 'Comprovante de residência', observacoes: 'Atualizado' },
        ],
        situacao_documental: {
          status: 'Regular',
          pendencias: [],
        },
      },
    },
  ],
  [
    '3',
    {
      id_veiculo: '3',
      titulo_anuncio: 'Chevrolet Onix 2024',
      preco: 85000,
      status_veiculo: 'Disponível',
      fotos: [
        {
          url: 'https://via.placeholder.com/800x600?text=Chevrolet+Onix+Front',
          legenda: 'Vista frontal',
          principal: true,
        },
        {
          url: 'https://via.placeholder.com/800x600?text=Chevrolet+Onix+Side',
          legenda: 'Vista lateral',
          principal: false,
        },
      ],
      especificacoes: {
        marca: 'Chevrolet',
        modelo: 'Onix',
        ano_fabricacao: 2024,
        ano_modelo: 2024,
        quilometragem: 5000,
        combustivel: 'Flex',
        cambio: 'Manual',
        potencia: '116 cv',
        cor: 'Preto',
        portas: 4,
        carroceria: 'Hatch',
        motor: '1.0',
        final_placa: 8,
      },
      itens: {
        itens_serie: [
          { nome: 'Ar-condicionado', categoria: 'Conforto' },
          { nome: 'Direção elétrica', categoria: 'Conforto' },
          { nome: 'Vidros elétricos', categoria: 'Conforto' },
          { nome: 'Airbag duplo', categoria: 'Segurança' },
          { nome: 'Freios ABS', categoria: 'Segurança' },
        ],
      },
      historico: {
        procedencia: 'Concessionária',
        proprietarios: 0,
        garantia: 'Até 12/2027',
        revisoes: [],
        sinistros: [],
      },
      condicoes_venda: {
        formas_pagamento: ['À vista', 'Financiamento', 'Consórcio'],
        condicoes_financiamento: {
          entrada_minima: 17000,
          taxa_juros: 1.39,
          prazo_maximo: 60,
        },
        aceita_troca: true,
        documentacao_necessaria: [
          { nome: 'RG', observacoes: 'Original' },
          { nome: 'CPF', observacoes: 'Original' },
          { nome: 'Comprovante de residência' },
        ],
        situacao_documental: {
          status: 'Regular',
          pendencias: [],
        },
      },
    },
  ],
  [
    '4',
    {
      id_veiculo: '4',
      titulo_anuncio: 'Hyundai HB20 2023',
      preco: 78000,
      status_veiculo: 'Disponível',
      fotos: [
        {
          url: 'https://via.placeholder.com/800x600?text=Hyundai+HB20+Front',
          legenda: 'Vista frontal',
          principal: true,
        },
        {
          url: 'https://via.placeholder.com/800x600?text=Hyundai+HB20+Side',
          legenda: 'Vista lateral',
          principal: false,
        },
      ],
      especificacoes: {
        marca: 'Hyundai',
        modelo: 'HB20',
        ano_fabricacao: 2023,
        ano_modelo: 2023,
        quilometragem: 12000,
        combustivel: 'Flex',
        cambio: 'Automático',
        potencia: '128 cv',
        cor: 'Vermelho',
        portas: 4,
        carroceria: 'Hatch',
        motor: '1.0',
        final_placa: 2,
      },
      itens: {
        itens_serie: [
          { nome: 'Ar-condicionado', categoria: 'Conforto' },
          { nome: 'Direção elétrica', categoria: 'Conforto' },
          { nome: 'Vidros elétricos', categoria: 'Conforto' },
          { nome: 'Airbag duplo', categoria: 'Segurança' },
          { nome: 'Freios ABS', categoria: 'Segurança' },
        ],
      },
      historico: {
        procedencia: 'Particular',
        proprietarios: 1,
        garantia: 'Até 08/2025',
        revisoes: [],
        sinistros: [],
      },
      condicoes_venda: {
        formas_pagamento: ['À vista', 'Financiamento'],
        condicoes_financiamento: {
          entrada_minima: 15600,
          taxa_juros: 1.49,
          prazo_maximo: 48,
        },
        aceita_troca: true,
        documentacao_necessaria: [
          { nome: 'RG' },
          { nome: 'CPF' },
          { nome: 'Comprovante de residência' },
        ],
        situacao_documental: {
          status: 'Regular',
          pendencias: [],
        },
      },
    },
  ],
  [
    '5',
    {
      id_veiculo: '5',
      titulo_anuncio: 'Volkswagen Gol 2021',
      preco: 65000,
      status_veiculo: 'Disponível',
      fotos: [
        {
          url: 'https://via.placeholder.com/800x600?text=VW+Gol+Front',
          legenda: 'Vista frontal',
          principal: true,
        },
        {
          url: 'https://via.placeholder.com/800x600?text=VW+Gol+Side',
          legenda: 'Vista lateral',
          principal: false,
        },
      ],
      especificacoes: {
        marca: 'Volkswagen',
        modelo: 'Gol',
        ano_fabricacao: 2021,
        ano_modelo: 2021,
        quilometragem: 35000,
        combustivel: 'Flex',
        cambio: 'Manual',
        potencia: '82 cv',
        cor: 'Azul',
        portas: 4,
        carroceria: 'Hatch',
        motor: '1.0',
        final_placa: 7,
      },
      itens: {
        itens_serie: [
          { nome: 'Ar-condicionado', categoria: 'Conforto' },
          { nome: 'Direção hidráulica', categoria: 'Conforto' },
          { nome: 'Vidros elétricos', categoria: 'Conforto' },
          { nome: 'Airbag duplo', categoria: 'Segurança' },
        ],
      },
      historico: {
        procedencia: 'Particular',
        proprietarios: 2,
        revisoes: [
          {
            data: new Date('2022-05-20'),
            quilometragem: 20000,
            local: 'Oficina autorizada',
          },
        ],
        sinistros: [],
      },
      condicoes_venda: {
        formas_pagamento: ['À vista', 'Financiamento'],
        condicoes_financiamento: {
          entrada_minima: 13000,
          taxa_juros: 1.69,
          prazo_maximo: 48,
        },
        aceita_troca: true,
        documentacao_necessaria: [
          { nome: 'RG' },
          { nome: 'CPF' },
          { nome: 'Comprovante de residência' },
        ],
        situacao_documental: {
          status: 'Regular',
          pendencias: [],
        },
      },
    },
  ],
]);

/**
 * @summary
 * Retrieves a filtered, sorted, and paginated list of vehicles
 *
 * @function vehicleList
 * @module vehicle
 *
 * @param {VehicleListFilters} filters - Filtering, sorting, and pagination parameters
 *
 * @returns {Promise<VehicleListResponse>} Paginated vehicle list with metadata
 *
 * @example
 * const result = await vehicleList({
 *   marca: ['Honda', 'Toyota'],
 *   anoMin: 2020,
 *   ordenacao: 'Preço (menor para maior)',
 *   pagina: 1,
 *   itensPorPagina: 12
 * });
 */
export async function vehicleList(filters: VehicleListFilters): Promise<VehicleListResponse> {
  let filteredVehicles = [...vehicles];

  /**
   * @validation Apply brand filter
   */
  if (filters.marca && filters.marca.length > 0) {
    filteredVehicles = filteredVehicles.filter((v) => filters.marca!.includes(v.marca));
  }

  /**
   * @validation Apply model filter
   */
  if (filters.modelo && filters.modelo.length > 0) {
    filteredVehicles = filteredVehicles.filter((v) => filters.modelo!.includes(v.modelo));
  }

  /**
   * @validation Apply year range filter
   */
  if (filters.anoMin !== undefined) {
    filteredVehicles = filteredVehicles.filter((v) => v.ano >= filters.anoMin!);
  }
  if (filters.anoMax !== undefined) {
    filteredVehicles = filteredVehicles.filter((v) => v.ano <= filters.anoMax!);
  }

  /**
   * @validation Apply price range filter
   */
  if (filters.precoMin !== undefined) {
    filteredVehicles = filteredVehicles.filter((v) => v.preco >= filters.precoMin!);
  }
  if (filters.precoMax !== undefined) {
    filteredVehicles = filteredVehicles.filter((v) => v.preco <= filters.precoMax!);
  }

  /**
   * @validation Apply transmission filter
   */
  if (filters.cambio && filters.cambio.length > 0) {
    filteredVehicles = filteredVehicles.filter(
      (v) => v.cambio && filters.cambio!.includes(v.cambio)
    );
  }

  /**
   * @rule {be-sorting-logic} Apply sorting based on selected criteria
   */
  switch (filters.ordenacao) {
    case 'Preço (menor para maior)':
      filteredVehicles.sort((a, b) => a.preco - b.preco);
      break;
    case 'Preço (maior para menor)':
      filteredVehicles.sort((a, b) => b.preco - a.preco);
      break;
    case 'Ano (mais recente)':
      filteredVehicles.sort((a, b) => b.ano - a.ano);
      break;
    case 'Ano (mais antigo)':
      filteredVehicles.sort((a, b) => a.ano - b.ano);
      break;
    case 'Modelo (A-Z)':
      filteredVehicles.sort((a, b) => a.modelo.localeCompare(b.modelo));
      break;
    case 'Modelo (Z-A)':
      filteredVehicles.sort((a, b) => b.modelo.localeCompare(a.modelo));
      break;
    case 'Relevância':
    default:
      break;
  }

  const total = filteredVehicles.length;

  /**
   * @rule {be-pagination-logic} Apply pagination
   */
  const startIndex = (filters.pagina - 1) * filters.itensPorPagina;
  const endIndex = startIndex + filters.itensPorPagina;
  const paginatedVehicles = filteredVehicles.slice(startIndex, endIndex);

  return {
    data: paginatedVehicles,
    page: filters.pagina,
    pageSize: filters.itensPorPagina,
    total,
  };
}

/**
 * @summary
 * Retrieves detailed information about a specific vehicle
 *
 * @function vehicleGet
 * @module vehicle
 *
 * @param {string} id - Vehicle identifier
 *
 * @returns {Promise<VehicleDetailEntity | null>} Vehicle details or null if not found
 *
 * @example
 * const vehicle = await vehicleGet('1');
 */
export async function vehicleGet(id: string): Promise<VehicleDetailEntity | null> {
  /**
   * @validation Retrieve vehicle from in-memory storage
   */
  const vehicle = vehicleDetails.get(id);

  if (!vehicle) {
    return null;
  }

  return vehicle;
}
