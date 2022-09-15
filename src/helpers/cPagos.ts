import db from '../db/conex';

import dotenv from 'dotenv'
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

export const pagos_by_nro_proceso = async(nro:string) => {
  const q = `select pro.id as id_proceso, pro.nro_proceso as numero_proceso, pro.cite, pro.fecha_emision as fecha_ingreso,
  pro.referencia, pro.descripcion_doc as desripcion, dep.nombre as autorizado, pro.beneficiario_documento as ci, 
  pro.beneficiario_nombre, mot.nombre as motivo, pro.monto as cantidad
  FROM pag_procesos pro, per_dependencias dep, pag_motivos mot  
  WHERE pro.dependencia_id = dep.id and
        pro.motivo_id = mot.id and
        pro.nro_proceso = ${nro}`;

  const [results]= await db.query(q);

  return results;
}



//usuario por IDUSUARIO
// export const datos_persona_byCI = async(ter:string) => {
//   const resultado = await Persona.findAll({
//     attributes: ['perid', 'documento', 'nombre', 'paterno', 'materno'],
//     where:{documento:{
//       [Op.like]: `${ter}%`
//     }}
//   });
//   return resultado;
// }
