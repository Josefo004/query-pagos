
import { Router } from 'express'
import { get_seguimiento } from '../controllers/seguimiento.controllers';


const router = Router();

router.get('/:id', get_seguimiento);

export default router;


