import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { RegistrocambioscontraseniaDTO } from 'app/registrocambioscontrasenia/registrocambioscontrasenia.model';
import { map } from 'rxjs';
import { transformRecordToMap } from 'app/common/utils';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class RegistrocambioscontraseniaService {

  resourcePath = environment.apiPath + 'registrocambioscontrasenias';

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  getAllRegistrocambioscontrasenias() {
    return this.http.get<RegistrocambioscontraseniaDTO[]>(`${this.resourcePath}/getAll`,this.getAuthHeaders());
  }

  getRegistrocambioscontrasenia(idregistro: number) {
      return this.http.get<RegistrocambioscontraseniaDTO>(`${this.resourcePath}/${idregistro}`, this.getAuthHeaders());
    }

    createRegistrocambioscontrasenia(dto: RegistrocambioscontraseniaDTO) {
      return this.http.post<number>(this.resourcePath, dto, this.getAuthHeaders());
    }

    updateRegistrocambioscontrasenia(idregistro: number, dto: RegistrocambioscontraseniaDTO) {
      return this.http.put<number>(`${this.resourcePath}/${idregistro}`, dto, this.getAuthHeaders());
    }

    deleteRegistrocambioscontrasenia(idregistro: number) {
      return this.http.delete(`${this.resourcePath}/${idregistro}`, this.getAuthHeaders());
    }

    getUsuariosValues() {
      return this.http.get<Record<string, number>>(`${this.resourcePath}/usuariosValues`, this.getAuthHeaders())
          .pipe(map(transformRecordToMap));
    }
}
