export class EmpresasDTO {
  idempresa?: number | null;
  nombre?: string | null;
  cif?: string | null;
  direccion?: string | null; 
  telefono?: string | null;
  email?: string | null;

  constructor(data: any) {
    this.idempresa = data.id_empresa ?? data.idempresa ?? null;
    this.nombre = data.nombre ?? null;
    this.cif = data.cif ?? null;
    this.direccion = data.direccion ?? null;
    this.telefono = data.telefono ?? null;
    this.email = data.email ?? null;
  }
}
