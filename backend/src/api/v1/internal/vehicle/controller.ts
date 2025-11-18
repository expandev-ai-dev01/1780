import { Request, Response, NextFunction } from 'express';
import { successResponse, errorResponse } from '@/utils/response';
import { vehicleList } from '@/services/vehicle';

/**
 * @api {get} /internal/vehicle List Vehicles
 * @apiName ListVehicles
 * @apiGroup Vehicle
 * @apiVersion 1.0.0
 *
 * @apiDescription Retrieves a paginated list of vehicles with optional filtering and sorting
 *
 * @apiParam {String[]} [marca] Filter by brand(s)
 * @apiParam {String[]} [modelo] Filter by model(s)
 * @apiParam {Number} [anoMin] Minimum year filter
 * @apiParam {Number} [anoMax] Maximum year filter
 * @apiParam {Number} [precoMin] Minimum price filter
 * @apiParam {Number} [precoMax] Maximum price filter
 * @apiParam {String[]} [cambio] Filter by transmission type(s)
 * @apiParam {String} [ordenacao] Sort criteria (default: 'Relevância')
 * @apiParam {Number} [pagina] Page number (default: 1)
 * @apiParam {Number} [itensPorPagina] Items per page (default: 12)
 *
 * @apiSuccess {Object[]} data Array of vehicle objects
 * @apiSuccess {Number} data.id_veiculo Vehicle identifier
 * @apiSuccess {String} data.modelo Vehicle model
 * @apiSuccess {String} data.marca Vehicle brand
 * @apiSuccess {Number} data.ano Vehicle year
 * @apiSuccess {Number} data.preco Vehicle price
 * @apiSuccess {String} data.imagem_principal Main image URL
 * @apiSuccess {Number} [data.quilometragem] Vehicle mileage
 * @apiSuccess {String} [data.cambio] Transmission type
 * @apiSuccess {Object} metadata Pagination metadata
 * @apiSuccess {Number} metadata.page Current page
 * @apiSuccess {Number} metadata.pageSize Items per page
 * @apiSuccess {Number} metadata.total Total items
 *
 * @apiError {String} ValidationError Invalid parameters provided
 * @apiError {String} ServerError Internal server error
 */
export async function listHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const filters = {
      marca: req.query.marca
        ? Array.isArray(req.query.marca)
          ? (req.query.marca as string[])
          : [req.query.marca as string]
        : undefined,
      modelo: req.query.modelo
        ? Array.isArray(req.query.modelo)
          ? (req.query.modelo as string[])
          : [req.query.modelo as string]
        : undefined,
      anoMin: req.query.anoMin ? parseInt(req.query.anoMin as string) : undefined,
      anoMax: req.query.anoMax ? parseInt(req.query.anoMax as string) : undefined,
      precoMin: req.query.precoMin ? parseFloat(req.query.precoMin as string) : undefined,
      precoMax: req.query.precoMax ? parseFloat(req.query.precoMax as string) : undefined,
      cambio: req.query.cambio
        ? Array.isArray(req.query.cambio)
          ? (req.query.cambio as string[])
          : [req.query.cambio as string]
        : undefined,
      ordenacao: (req.query.ordenacao as string) || 'Relevância',
      pagina: req.query.pagina ? parseInt(req.query.pagina as string) : 1,
      itensPorPagina: req.query.itensPorPagina ? parseInt(req.query.itensPorPagina as string) : 12,
    };

    const result = await vehicleList(filters);

    res.json(
      successResponse(result.data, {
        page: result.page,
        pageSize: result.pageSize,
        total: result.total,
      })
    );
  } catch (error: any) {
    next(error);
  }
}
