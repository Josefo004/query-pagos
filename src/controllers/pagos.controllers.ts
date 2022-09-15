import { Request, Response } from "express";
import { pagos_by_nro_proceso } from '../helpers/cPagos';

export const get_pagos= async (req: Request, res: Response) => { //by numero_proceso, cite
  const {termino} = req.params;
  //let campo = '';
  //esNumero(termino)? campo='nro_proceso' : campo='cite'
  const buscarnp = await pagos_by_nro_proceso(termino);
  const estado = buscarnp.length > 0 ? 200 : 400;
  res.status(estado).json(buscarnp);
}