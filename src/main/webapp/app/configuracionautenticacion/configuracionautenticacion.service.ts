import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { ConfiguracionautenticacionDTO } from 'app/configuracionautenticacion/configuracionautenticacion.model';


@Injectable({
  providedIn: 'root',
})
export class ConfiguracionautenticacionService {

  http = inject(HttpClient);
  resourcePath = environment.apiPath + '/api/configuracionautenticacions';

  getAllConfiguracionautenticacions() {
    return this.http.get<ConfiguracionautenticacionDTO[]>(this.resourcePath);
  }

  getConfiguracionautenticacion(idautenticacion: number) {
    return this.http.get<ConfiguracionautenticacionDTO>(this.resourcePath + '/' + idautenticacion);
  }

  createConfiguracionautenticacion(configuracionautenticacionDTO: ConfiguracionautenticacionDTO) {
    return this.http.post<number>(this.resourcePath, configuracionautenticacionDTO);
  }

  updateConfiguracionautenticacion(idautenticacion: number, configuracionautenticacionDTO: ConfiguracionautenticacionDTO) {
    return this.http.put<number>(this.resourcePath + '/' + idautenticacion, configuracionautenticacionDTO);
  }

  deleteConfiguracionautenticacion(idautenticacion: number) {
    return this.http.delete(this.resourcePath + '/' + idautenticacion);
  }

}
