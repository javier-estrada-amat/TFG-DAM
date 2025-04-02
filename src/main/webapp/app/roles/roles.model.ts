export class RolesDTO {

  constructor(data:Partial<RolesDTO>) {
    Object.assign(this, data);
  }

  idrol?: number|null;
  nombre?: string|null;
  descripcion?: string|null;

}
