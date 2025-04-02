export class ConfiguracionautenticacionDTO {

  constructor(data:Partial<ConfiguracionautenticacionDTO>) {
    Object.assign(this, data);
  }

  idautenticacion?: number|null;
  usuarioid?: number|null;
  codigosecreto?: string|null;
  activado?: boolean|null;

}
