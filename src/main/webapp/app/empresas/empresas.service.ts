import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { EmpresasDTO } from 'app/empresas/empresas.model';


@Injectable({
  providedIn: 'root',
})
export class EmpresasService {

  http = inject(HttpClient);
  resourcePath = environment.apiPath + '/api/empresass';

  getAllEmpresases() {
    return this.http.get<EmpresasDTO[]>(this.resourcePath);
  }

  getEmpresas(idempresa: number) {
    return this.http.get<EmpresasDTO>(this.resourcePath + '/' + idempresa);
  }

  createEmpresas(empresasDTO: EmpresasDTO) {
    return this.http.post<number>(this.resourcePath, empresasDTO);
  }

  updateEmpresas(idempresa: number, empresasDTO: EmpresasDTO) {
    return this.http.put<number>(this.resourcePath + '/' + idempresa, empresasDTO);
  }

  deleteEmpresas(idempresa: number) {
    return this.http.delete(this.resourcePath + '/' + idempresa);
  }

}
