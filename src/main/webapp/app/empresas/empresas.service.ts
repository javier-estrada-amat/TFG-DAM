import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { EmpresasDTO } from 'app/empresas/empresas.model';
import { catchError, map } from 'rxjs/operators';
import { transformRecordToMap } from 'app/common/utils';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmpresasService {
  private resourcePath = environment.apiPath + 'empresas';

  constructor(
    private http: HttpClient
  ) {}

  private getAuthHeaders() {
        const token = localStorage.getItem('token');
        return {
          headers: new HttpHeaders({
            'Authorization': `Bearer ${token}`
          })
        };
      }

  getAllEmpresas() {
    return this.http.get<any[]>(`${this.resourcePath}/getAll`, this.getAuthHeaders()).pipe(
      map(data => {
        console.log('Datos crudos desde API:', data);
        return data.map(item => new EmpresasDTO(item));
      })
    );
  }

  getEmpresas(idempresa: number) {
    return this.http.get<any>(`${this.resourcePath}/${idempresa}`, this.getAuthHeaders()).pipe(
      map(item => new EmpresasDTO(item))
    );
  }

  
  createEmpresa(empresa: EmpresasDTO): Observable<any> {
    return this.http.post(`${this.resourcePath}/add`, empresa,this.getAuthHeaders()).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }


  updateEmpresas(idempresa: number, empresasDTO: EmpresasDTO) {
    return this.http.put<number>(`${this.resourcePath}/update/${idempresa}`, empresasDTO, this.getAuthHeaders());
  }

  deleteEmpresas(idempresa: number) {
    return this.http.delete(`${this.resourcePath}/${idempresa}`, this.getAuthHeaders());
  }

  getEmpresasValues() {
    return this.http.get<Record<string, number>>(`${this.resourcePath}/values`, this.getAuthHeaders())
        .pipe(map(transformRecordToMap));
  }

}
