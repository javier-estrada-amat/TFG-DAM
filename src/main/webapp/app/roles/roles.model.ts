export class RolesDTO {

  constructor(data:Partial<RolesDTO>) {
    Object.assign(this, data);
  }

  id_rol?: number|null;
  nombre?: string|null;
  descripcion?: string|null;

}
