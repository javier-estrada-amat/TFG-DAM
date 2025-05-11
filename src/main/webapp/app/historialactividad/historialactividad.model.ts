export class HistorialactividadDTO {

  constructor(data:Partial<HistorialactividadDTO>) {
    Object.assign(this, data);
  }

  idHistorial?: number|null;
  usuarioId?: number|null;
  accion?: string|null;
  entidadAfectada?: string|null;
  descripcion?: string|null;
  fecha?: string|null;
  nombreUsuario?: string|null;

}
