import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { EmpresasDTO } from 'app/empresas/empresas.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class EmpresasService {

  http = inject(HttpClient);
  resourcePath = environment.apiPath + 'empresas';

  getAllEmpresas() {
    return this.http.get<any[]>(this.resourcePath+'/getAll').pipe(
      map(data => {
        console.log('Datos crudos desde API:', data);
        return data.map(item => new EmpresasDTO(item));
      })
    );
  }
  
  getEmpresas(idempresa: number) {
    return this.http.get<any>(this.resourcePath + '/' + idempresa).pipe(
      map(item => new EmpresasDTO(item))
    );
  }

  createEmpresas(empresasDTO: EmpresasDTO) {
    return this.http.post<number>(this.resourcePath, empresasDTO);
  }

  updateEmpresas(idempresa: number, empresasDTO: EmpresasDTO) {
    return this.http.put<number>(this.resourcePath + '/update' + idempresa, empresasDTO);
  }

  deleteEmpresas(idempresa: number) {
    return this.http.delete(this.resourcePath + '/' + idempresa);
  }

}
