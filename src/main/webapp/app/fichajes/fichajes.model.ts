export class FichajesDTO {

  constructor(data:Partial<FichajesDTO>) {
    Object.assign(this, data);
  }

  idfichaje?: number|null;
  usuarioid?: number|null;
  fecha?: string|null;
  horaentrada?: string|null;
  horasalida?: string|null;
  estado?: string|null;
  usuarios?: number|null;

}
