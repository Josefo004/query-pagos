select pro.id as id_proceso, pro.nro_proceso as numero_proceso, pro.cite, pro.fecha_emision as fecha_ingreso,
       pro.referencia, pro.descripcion_doc as desripcion, dep.nombre as autorizado, pro.beneficiario_documento as ci, 
       pro.beneficiario_nombre, mot.nombre as motivo, pro.monto as cantidad
FROM pag_procesos pro, per_dependencias dep, pag_motivos mot  
WHERE pro.dependencia_id = dep.id and
      pro.motivo_id = mot.id and
      pro.id = 109947;

select est.id as estado_id, est.fecha_envio as envio_date, est.fecha_recepcion as recepcion_date, est.proceso_id as id_proceso,
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
      est.proceso_id=109947

select obs.modified as fecha, obs.descripcion as observacion, 
	(
	 	select concat(per.nombres,' ',per.apellidos) from int_usuarios usr, per_servidores_publicos per
	 	where per.usuario_id = usr.id and
	              usr.id = obs.usuario_analista_id
	) as analista 
from pag_observaciones obs
where obs.proceso_id=109947;
