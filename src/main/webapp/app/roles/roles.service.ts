import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { RolesDTO } from 'app/roles/roles.model';


@Injectable({
  providedIn: 'root',
})
export class RolesService {

  http = inject(HttpClient);
  resourcePath = environment.apiPath + '/api/roless';

  getAllRoleses() {
    return this.http.get<RolesDTO[]>(this.resourcePath);
  }

  getRoles(idrol: number) {
    return this.http.get<RolesDTO>(this.resourcePath + '/' + idrol);
  }

  createRoles(rolesDTO: RolesDTO) {
    return this.http.post<number>(this.resourcePath, rolesDTO);
  }

  updateRoles(idrol: number, rolesDTO: RolesDTO) {
    return this.http.put<number>(this.resourcePath + '/' + idrol, rolesDTO);
  }

  deleteRoles(idrol: number) {
    return this.http.delete(this.resourcePath + '/' + idrol);
  }

}
