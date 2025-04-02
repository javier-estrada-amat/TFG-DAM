export class HistorialactividadDTO {

  constructor(data:Partial<HistorialactividadDTO>) {
    Object.assign(this, data);
  }

  idhistorial?: number|null;
  usuarioid?: number|null;
  accion?: string|null;
  entidadafectada?: string|null;
  descripcion?: string|null;
  fecha?: string|null;
  usuarios?: number|null;

}
