export class RegistrocambioscontraseniaDTO {

  constructor(data:Partial<RegistrocambioscontraseniaDTO>) {
    Object.assign(this, data);
  }

  idregistro?: number|null;
  usuarioid?: number|null;
  fechacambio?: string|null;
  usuarios?: number|null;

}
