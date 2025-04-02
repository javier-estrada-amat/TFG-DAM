import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { HistorialactividadDTO } from 'app/historialactividad/historialactividad.model';
import { map } from 'rxjs';
import { transformRecordToMap } from 'app/common/utils';


@Injectable({
  providedIn: 'root',
})
export class HistorialactividadService {

  http = inject(HttpClient);
  resourcePath = environment.apiPath + '/api/historialactividads';

  getAllHistorialactividads() {
    return this.http.get<HistorialactividadDTO[]>(this.resourcePath);
  }

  getHistorialactividad(idhistorial: number) {
    return this.http.get<HistorialactividadDTO>(this.resourcePath + '/' + idhistorial);
  }

  createHistorialactividad(historialactividadDTO: HistorialactividadDTO) {
    return this.http.post<number>(this.resourcePath, historialactividadDTO);
  }

  updateHistorialactividad(idhistorial: number, historialactividadDTO: HistorialactividadDTO) {
    return this.http.put<number>(this.resourcePath + '/' + idhistorial, historialactividadDTO);
  }

  deleteHistorialactividad(idhistorial: number) {
    return this.http.delete(this.resourcePath + '/' + idhistorial);
  }

  getUsuariosValues() {
    return this.http.get<Record<string, number>>(this.resourcePath + '/usuariosValues')
        .pipe(map(transformRecordToMap));
  }

}
