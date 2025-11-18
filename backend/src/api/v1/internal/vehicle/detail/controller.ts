import { Request, Response, NextFunction } from 'express';
import { successResponse, errorResponse } from '@/utils/response';
import { vehicleGet } from '@/services/vehicle';

/**
 * @api {get} /internal/vehicle/:id Get Vehicle Details
 * @apiName GetVehicleDetails
 * @apiGroup Vehicle
 * @apiVersion 1.0.0
 *
 * @apiDescription Retrieves detailed information about a specific vehicle
 *
 * @apiParam {String} id Vehicle identifier
 *
 * @apiSuccess {Object} data Vehicle details object
 * @apiSuccess {String} data.id_veiculo Vehicle identifier
 * @apiSuccess {String} data.titulo_anuncio Vehicle title
 * @apiSuccess {Number} data.preco Vehicle price
 * @apiSuccess {String} data.status_veiculo Vehicle status
 * @apiSuccess {Object[]} data.fotos Photo gallery
 * @apiSuccess {String} data.fotos.url Photo URL
 * @apiSuccess {String} [data.fotos.legenda] Photo caption
 * @apiSuccess {Boolean} data.fotos.principal Is main photo
 * @apiSuccess {Object} data.especificacoes Technical specifications
 * @apiSuccess {String} data.especificacoes.marca Brand
 * @apiSuccess {String} data.especificacoes.modelo Model
 * @apiSuccess {Number} data.especificacoes.ano_fabricacao Manufacturing year
 * @apiSuccess {Number} data.especificacoes.ano_modelo Model year
 * @apiSuccess {Number} data.especificacoes.quilometragem Mileage
 * @apiSuccess {String} data.especificacoes.combustivel Fuel type
 * @apiSuccess {String} data.especificacoes.cambio Transmission
 * @apiSuccess {String} data.especificacoes.potencia Engine power
 * @apiSuccess {String} data.especificacoes.cor Color
 * @apiSuccess {Number} data.especificacoes.portas Number of doors
 * @apiSuccess {String} data.especificacoes.carroceria Body type
 * @apiSuccess {String} data.especificacoes.motor Engine displacement
 * @apiSuccess {Number} data.especificacoes.final_placa License plate final digit
 * @apiSuccess {Object} data.itens Items and features
 * @apiSuccess {Object[]} data.itens.itens_serie Standard items
 * @apiSuccess {String} data.itens.itens_serie.nome Item name
 * @apiSuccess {String} data.itens.itens_serie.categoria Item category
 * @apiSuccess {Object[]} [data.itens.opcionais] Optional items
 * @apiSuccess {String} data.itens.opcionais.nome Item name
 * @apiSuccess {String} data.itens.opcionais.categoria Item category
 * @apiSuccess {Object} data.historico Vehicle history
 * @apiSuccess {String} data.historico.procedencia Origin
 * @apiSuccess {Number} data.historico.proprietarios Number of previous owners
 * @apiSuccess {String} [data.historico.garantia] Warranty information
 * @apiSuccess {Object[]} [data.historico.revisoes] Service history
 * @apiSuccess {Date} data.historico.revisoes.data Service date
 * @apiSuccess {Number} data.historico.revisoes.quilometragem Mileage at service
 * @apiSuccess {String} data.historico.revisoes.local Service location
 * @apiSuccess {Object[]} [data.historico.sinistros] Accident history
 * @apiSuccess {Date} data.historico.sinistros.data Accident date
 * @apiSuccess {String} data.historico.sinistros.tipo Accident type
 * @apiSuccess {String} data.historico.sinistros.descricao Accident description
 * @apiSuccess {Object} [data.historico.laudo_tecnico] Technical inspection
 * @apiSuccess {Date} data.historico.laudo_tecnico.data Inspection date
 * @apiSuccess {String} data.historico.laudo_tecnico.resultado Inspection result
 * @apiSuccess {Object} data.condicoes_venda Sale conditions
 * @apiSuccess {String[]} data.condicoes_venda.formas_pagamento Payment methods
 * @apiSuccess {Object} [data.condicoes_venda.condicoes_financiamento] Financing conditions
 * @apiSuccess {Number} data.condicoes_venda.condicoes_financiamento.entrada_minima Minimum down payment
 * @apiSuccess {Number} data.condicoes_venda.condicoes_financiamento.taxa_juros Interest rate
 * @apiSuccess {Number} data.condicoes_venda.condicoes_financiamento.prazo_maximo Maximum term
 * @apiSuccess {Boolean} data.condicoes_venda.aceita_troca Accepts trade-in
 * @apiSuccess {String} [data.condicoes_venda.observacoes_venda] Sale notes
 * @apiSuccess {Object[]} data.condicoes_venda.documentacao_necessaria Required documentation
 * @apiSuccess {String} data.condicoes_venda.documentacao_necessaria.nome Document name
 * @apiSuccess {String} [data.condicoes_venda.documentacao_necessaria.observacoes] Document notes
 * @apiSuccess {Object} data.condicoes_venda.situacao_documental Document status
 * @apiSuccess {String} data.condicoes_venda.situacao_documental.status Status
 * @apiSuccess {String[]} [data.condicoes_venda.situacao_documental.pendencias] Pending items
 * @apiSuccess {String} [data.condicoes_venda.situacao_documental.observacoes] Status notes
 *
 * @apiError {String} NotFoundError Vehicle not found
 * @apiError {String} ValidationError Invalid vehicle ID
 * @apiError {String} ServerError Internal server error
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;

    /**
     * @validation Validate vehicle ID parameter
     */
    if (!id || id.trim() === '') {
      res.status(400).json(errorResponse('vehicleIdRequired', 'VALIDATION_ERROR'));
      return;
    }

    const vehicle = await vehicleGet(id);

    /**
     * @validation Check if vehicle exists
     */
    if (!vehicle) {
      res.status(404).json(errorResponse('vehicleNotFound', 'NOT_FOUND'));
      return;
    }

    res.json(successResponse(vehicle));
  } catch (error: any) {
    next(error);
  }
}
