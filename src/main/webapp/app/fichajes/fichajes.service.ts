import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { FichajesDTO } from 'app/fichajes/fichajes.model';
import { map } from 'rxjs';
import { transformRecordToMap } from 'app/common/utils';


@Injectable({
  providedIn: 'root',
})
export class FichajesService {

  http = inject(HttpClient);
  resourcePath = environment.apiPath + '/api/fichajess';

  getAllFichajeses() {
    return this.http.get<FichajesDTO[]>(this.resourcePath);
  }

  getFichajes(idfichaje: number) {
    return this.http.get<FichajesDTO>(this.resourcePath + '/' + idfichaje);
  }

  createFichajes(fichajesDTO: FichajesDTO) {
    return this.http.post<number>(this.resourcePath, fichajesDTO);
  }

  updateFichajes(idfichaje: number, fichajesDTO: FichajesDTO) {
    return this.http.put<number>(this.resourcePath + '/' + idfichaje, fichajesDTO);
  }

  deleteFichajes(idfichaje: number) {
    return this.http.delete(this.resourcePath + '/' + idfichaje);
  }

  getUsuariosValues() {
    return this.http.get<Record<string, number>>(this.resourcePath + '/usuariosValues')
        .pipe(map(transformRecordToMap));
  }

}
