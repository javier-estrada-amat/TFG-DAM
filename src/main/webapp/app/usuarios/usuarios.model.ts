import { EmpresasDTO } from '../empresas/empresas.model';
export class UsuariosDTO {

  id_usuario?: number|null;
  nombre?: string|null;
  apellidos?: string|null;
  email?: string|null;
  password?: string | null;
  fecha_registro?: Date|null;
  empresa?: EmpresasDTO|null;
  roles?: number[]|null;
  configuracionautenticacion?: number|null;
  horasextrasusuarios?: number|null;

  constructor(data:Partial<UsuariosDTO>) {
    Object.assign(this, data);
  }

}
