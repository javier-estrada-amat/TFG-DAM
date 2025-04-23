import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { FichajesDTO } from 'app/fichajes/fichajes.model';
import { map } from 'rxjs';
import { transformRecordToMap } from 'app/common/utils';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class FichajesService {

    private resourcePath = environment.apiPath + 'fichajes';

    constructor(
      private http: HttpClient
    ) {}

  getAuthHeaders(): { headers: HttpHeaders } {
    const token = localStorage.getItem('jwt');
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
      }),
    };
  }

  iniciarFichaje() {
    return this.http.post<FichajesDTO>(`${this.resourcePath}/iniciar`, {}, this.getAuthHeaders());
  }

  finalizarFichaje() {
    return this.http.put<FichajesDTO>(`${this.resourcePath}/finalizar`, {}, this.getAuthHeaders());
  }

 getAllFichajes() {
   return this.http.get<FichajesDTO[]>(`${this.resourcePath}/getAll`, this.getAuthHeaders());
 }

 verEstadoFichaje() {
   return this.http.get<boolean>(`${this.resourcePath}/estado`, this.getAuthHeaders());
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
