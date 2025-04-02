export class HorasextrasDTO {

  constructor(data:Partial<HorasextrasDTO>) {
    Object.assign(this, data);
  }

  idhoraextra?: number|null;
  usuarioid?: number|null;
  fecha?: string|null;
  horassolicitadas?: string|null;
  horasaprobadas?: string|null;
  motivo?: string|null;
  estado?: string|null;
  aprobadopor?: number|null;
  usuarios?: number|null;

}
