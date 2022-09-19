import db from '../db/conex';

export const obtener_seguimiento = async (pid:number) => {
  const seguimiento = await seguimiento_by_idproceso(pid);
  const observaciones = await observaciones_by_idproceso(pid);
  return {
    seguimiento,
    observaciones
  };
}

const seguimiento_by_idproceso = async(pid:number) => {
  const q = `select est.id as estado_id, est.fecha_envio as envio_date, est.fecha_recepcion as recepcion_date, est.proceso_id as id_proceso,
       est.estado_id as id_estado, pes.nombre as estado, pes.descripcion as descipcion_est,
	   (
		   select concat(per.nombres,' ',per.apellidos) from int_usuarios usr, per_servidores_publicos per
		   where per.usuario_id = usr.id and
		         usr.id = est.usuario_envio_id
	   ) as usr_envio,
	   (
		   select concat(per.nombres,' ',per.apellidos) from int_usuarios usr, per_servidores_publicos per
		   where per.usuario_id = usr.id and
		         usr.id = est.usuario_recepcion_id
	   ) as usr_recepcion, est.reingreso 
  from pag_procesos_estados est, pag_estados pes
  where est.estado_id = pes.id and
        est.proceso_id=${pid} 
  order by est.fecha_envio;`;
  const [results]= await db.query(q);
  return results;
}

const observaciones_by_idproceso = async(pid:number) => {
  const q = `select obs.modified as fecha, obs.descripcion as observacion,  
	(
	 	select concat(per.nombres,' ',per.apellidos) from int_usuarios usr, per_servidores_publicos per
	 	where per.usuario_id = usr.id and
	              usr.id = obs.usuario_analista_id
	) as analista, obs.procesos_estados_id as estado_id  
  from pag_observaciones obs
  where obs.proceso_id=${pid} 
  order by obs.modified;`;
  const [results]= await db.query(q);
  return results;
}
