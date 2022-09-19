
import { Router } from 'express'
//import { check } from 'express-validator';
import { get_pagos } from '../controllers/pagos.controllers';
//import { validarCampos } from '../middlewares/validar-campos';

const router = Router();

router.post('/', get_pagos);

export default router;


