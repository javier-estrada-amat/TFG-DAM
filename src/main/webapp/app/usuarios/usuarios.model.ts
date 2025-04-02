export class UsuariosDTO {

  constructor(data:Partial<UsuariosDTO>) {
    Object.assign(this, data);
  }

  idusuario?: number|null;
  nombre?: string|null;
  apellidos?: string|null;
  email?: string|null;
  password?: string|null;
  activo?: boolean|null;
  primeracceso?: boolean|null;
  empresas?: number|null;
  roles?: number[]|null;
  configuracionautenticacion?: number|null;
  horasextrasusuarios?: number|null;

}
