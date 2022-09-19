export interface Tconsulta {
  tipo:          number;
  numeroProceso: number;
  fechaInicio:   Date;
  fechaFin:      Date;
  beneficiario:  string;
}

export interface Tpagos {
  id_proceso:          number;
  numero_proceso:      number;
  cite:                string;
  fecha_ingreso:       Date;
  referencia:          string;
  desripcion:          string;
  autorizado:          string;
  ci:                  string;
  beneficiario_nombre: string;
  motivo:              string;
  cantidad:            number;
}
