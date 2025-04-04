export class UsuariosDTO {

  constructor(data:Partial<UsuariosDTO>) {
    Object.assign(this, data);
  }

  id_usuario?: number|null;
  nombre?: string|null;
  apellidos?: string|null;
  email?: string|null;
  fechaRegistro?: boolean|null;
  empresas?: number|null;
  roles?: number[]|null;
  configuracionautenticacion?: number|null;
  horasextrasusuarios?: number|null;

}
