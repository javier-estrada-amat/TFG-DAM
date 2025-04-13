import { EmpresasDTO } from '../empresas/empresas.model';
export class UsuariosDTO {

  id_usuario?: number|null;
  nombre?: string|null;
  apellidos?: string|null;
  email?: string|null;
  password?: string | null;
  fecha_registro?: Date | null;
  activo?: boolean | null;
  empresa?: EmpresasDTO|null;
  roles?: number[]|null;

  constructor(data:Partial<UsuariosDTO>) {
    Object.assign(this, data);
  }

}
