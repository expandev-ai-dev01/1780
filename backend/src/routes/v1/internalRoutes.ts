import { Router } from 'express';
import * as vehicleController from '@/api/v1/internal/vehicle/controller';
import * as vehicleDetailController from '@/api/v1/internal/vehicle/detail/controller';

const router = Router();

router.get('/vehicle', vehicleController.listHandler);
router.get('/vehicle/:id', vehicleDetailController.getHandler);

export default router;
