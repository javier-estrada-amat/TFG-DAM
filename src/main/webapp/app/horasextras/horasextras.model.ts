import { UsuariosDTO } from 'app/usuarios/usuarios.model';

export class HorasextrasDTO {
  constructor(data: Partial<HorasextrasDTO>) {
    Object.assign(this, data);
  }

  id_hora_extra?: number | null;
  usuario?: UsuariosDTO | null;
  fecha?: string | null;
  horasSolicitadas?: string | null;
  horasAprobadas?: string | null;
  motivo?: string | null;
  estado?: string | null;
  aprobadoPor?: UsuariosDTO | null;
}
