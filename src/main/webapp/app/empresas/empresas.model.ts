export class EmpresasDTO {

  constructor(data:Partial<EmpresasDTO>) {
    Object.assign(this, data);
  }

  idempresa?: number|null;
  nombre?: string|null;
  direccion?: string|null;
  telefono?: string|null;
  email?: string|null;

}
