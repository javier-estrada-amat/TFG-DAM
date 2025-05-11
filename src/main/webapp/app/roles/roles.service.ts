import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';
import { transformRecordToMap } from 'app/common/utils';
import { RolesDTO } from 'app/roles/roles.model';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  private resourcePath = environment.apiPath + 'roles';

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  getAllRoleses() {
    return this.http.get<RolesDTO[]>(this.resourcePath + '/getAll', this.getAuthHeaders());
  }

  getRolesValues() {
    return this.http.get<Record<string, number>>(`${this.resourcePath}/values`, this.getAuthHeaders())
      .pipe(map(transformRecordToMap));
  }

  getRoles(idrol: number) {
    return this.http.get<RolesDTO>(this.resourcePath + '/' + idrol, this.getAuthHeaders());
  }

  createRoles(rolesDTO: RolesDTO) {
    return this.http.post<number>(this.resourcePath + '/add', rolesDTO, this.getAuthHeaders());
  }

  updateRoles(idrol: number, rolesDTO: RolesDTO) {
    return this.http.put<number>(this.resourcePath + '/' + idrol, rolesDTO, this.getAuthHeaders());
  }

  deleteRoles(idrol: number) {
    return this.http.delete(this.resourcePath + '/' + idrol, this.getAuthHeaders());
  }
}
