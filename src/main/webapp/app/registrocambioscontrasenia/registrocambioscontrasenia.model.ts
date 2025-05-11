export class RegistrocambioscontraseniaDTO {

  constructor(data:Partial<RegistrocambioscontraseniaDTO>) {
    Object.assign(this, data);
  }

  idRegistro?: number|null;
  usuarioId?: number|null;
  fechaCambio?: string|null;

}
