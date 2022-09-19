import db from '../db/conex';

import dotenv from 'dotenv'
import { Tconsulta } from '../interfaces/interfaces';
dotenv.config();

//si una cadena es CI o nombre
export const esNumero = (cadx:string) => {
  let cnumero = 0;
  let cletra = 0;
  for (let i = 0; i < cadx.length; i++) Number(cadx[i])? cnumero++ : cletra++
  return cnumero > cletra ? true : false;  
  // console.log('numero ', cnumero);
  // console.log('letras', cletra);
}

export const obtener_pagos = (b:Tconsulta) => {
  switch(b.tipo) { 
    case 1: { 
      return pagos_by_nro_proceso(b.numeroProceso); 
    } 
    case 2: { 
      return pagos_by_fecha(b.fechaInicio, b.fechaFin); 
    }
    case 3: { 
      return pagos_by_beneficiario(b.beneficiario); 
    } 
    case 4: { 
      return pagos_by_combinacion(b.fechaInicio, b.fechaFin, b.beneficiario);  
   }
    default: { 
      return []; 
    } 
 } 
}

const pagos_by_nro_proceso = async(nro:number) => {
  const q = `select pro.id as id_proceso, pro.nro_proceso as numero_proceso, pro.cite, pro.fecha_emision as fecha_ingreso,
  pro.referencia, pro.descripcion_doc as desripcion, dep.nombre as autorizado, pro.beneficiario_documento as ci, 
  pro.beneficiario_nombre, mot.nombre as motivo, pro.monto as cantidad
  FROM pag_procesos pro, per_dependencias dep, pag_motivos mot  
  WHERE pro.dependencia_id = dep.id and
        pro.motivo_id = mot.id and
        pro.nro_proceso = ${nro}
  ORDER BY pro.fecha_emision`;

  const [results]= await db.query(q);

  return results;
}

const pagos_by_fecha = async(fi:Date, ff:Date) => {
  const q = `select pro.id as id_proceso, pro.nro_proceso as numero_proceso, pro.cite, pro.fecha_emision as fecha_ingreso,
  pro.referencia, pro.descripcion_doc as desripcion, dep.nombre as autorizado, pro.beneficiario_documento as ci, 
  pro.beneficiario_nombre, mot.nombre as motivo, pro.monto as cantidad
  FROM pag_procesos pro, per_dependencias dep, pag_motivos mot  
  WHERE pro.dependencia_id = dep.id and
        pro.motivo_id = mot.id and
        pro.fecha_emision BETWEEN '${fi}' AND '${ff}' 
  ORDER BY pro.fecha_emision
  LIMIT 15`;

  const [results]= await db.query(q);

  return results;
}

const pagos_by_beneficiario = async(ter:string) => {
  const q = `select pro.id as id_proceso, pro.nro_proceso as numero_proceso, pro.cite, pro.fecha_emision as fecha_ingreso,
  pro.referencia, pro.descripcion_doc as desripcion, dep.nombre as autorizado, pro.beneficiario_documento as ci, 
  pro.beneficiario_nombre, mot.nombre as motivo, pro.monto as cantidad
  FROM pag_procesos pro, per_dependencias dep, pag_motivos mot  
  WHERE pro.dependencia_id = dep.id and
        pro.motivo_id = mot.id and
        concat(pro.beneficiario_documento,' ', pro.beneficiario_nombre) LIKE '%${ter}%'
  ORDER BY pro.fecha_emision
  LIMIT 15`;

  const [results]= await db.query(q);

  return results;
}

const pagos_by_combinacion = async(fi:Date, ff:Date, ter:string) => {
  const q = `select pro.id as id_proceso, pro.nro_proceso as numero_proceso, pro.cite, pro.fecha_emision as fecha_ingreso,
  pro.referencia, pro.descripcion_doc as desripcion, dep.nombre as autorizado, pro.beneficiario_documento as ci, 
  pro.beneficiario_nombre, mot.nombre as motivo, pro.monto as cantidad
  FROM pag_procesos pro, per_dependencias dep, pag_motivos mot  
  WHERE pro.dependencia_id = dep.id and
        pro.motivo_id = mot.id and
        pro.fecha_emision BETWEEN '${fi}' AND '${ff}' and 
        concat(pro.beneficiario_documento,' ', pro.beneficiario_nombre) LIKE '%${ter}%'
  ORDER BY pro.fecha_emision
  LIMIT 15`;

  const [results]= await db.query(q);

  return results;
}
