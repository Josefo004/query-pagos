import { Request, Response } from "express";
import { obtener_pagos } from '../helpers/cPagos';

export const get_pagos= async (req: Request, res: Response) => { //by numero_proceso, cite
  const body = req.body;
  const pagos = await obtener_pagos(body);
  const estado = pagos.length > 0 ? 200 : 400;
  res.status(estado).json(pagos);
}