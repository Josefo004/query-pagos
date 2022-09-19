import { Request, Response } from "express";
import { obtener_seguimiento } from "../helpers/cSeguimiento";

export const get_seguimiento= async (req: Request, res: Response) => { 
  const {id} = req.params;
  const seguimiento = await obtener_seguimiento(Number(id));
  const estado = seguimiento.seguimiento.length > 0 ? 200 : 400;
  res.status(estado).json(seguimiento);
}