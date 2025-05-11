export class FichajesDTO {

  constructor(data:Partial<FichajesDTO>) {
    Object.assign(this, data);
  }

  id_fichaje?: number|null;
  usuario_id?: number|null;
  fecha?: string|null;
  hora_entrada?: string|null;
  hora_salida?: string|null;
  estado?: string|null;
  usuarios?: number|null;

}
