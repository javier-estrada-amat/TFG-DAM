import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { UsuariosDTO } from './usuarios.model';
import { map } from 'rxjs';
import { transformRecordToMap } from 'app/common/utils';
import { AuthService } from 'app/auth/auth.service';


@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private resourcePath = environment.apiPath + 'usuarios';

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

  getAllUsuarios() {
    return this.http.get<UsuariosDTO[]>(`${this.resourcePath}/getAll`,this.getAuthHeaders());
  }

  getUsuarios(idusuario: number) {
    return this.http.get<UsuariosDTO>(`${this.resourcePath}/${idusuario}`, this.getAuthHeaders());
  }

  createUsuarios(usuariosDTO: UsuariosDTO) {
    return this.http.post<number>(`${this.resourcePath}/add`, usuariosDTO, this.getAuthHeaders());
  }

  updateUsuarios(idusuario: number, usuariosDTO: UsuariosDTO) {
    return this.http.put<number>(`${this.resourcePath}/update`, usuariosDTO, this.getAuthHeaders());
  }

  deleteUsuarios(idusuario: number) {
    return this.http.delete(`${this.resourcePath}/${idusuario}`, this.getAuthHeaders());
  }

  getRolesValues() {
    return this.http.get<Record<string, number>>(`${this.resourcePath}/rolesValues`, this.getAuthHeaders())
        .pipe(map(transformRecordToMap));
  }

  getConfiguracionautenticacionValues() {
    return this.http.get<Record<string, number>>(`${this.resourcePath}/configuracionautenticacionValues`, this.getAuthHeaders())
        .pipe(map(transformRecordToMap));
  }

  getHorasextrasusuariosValues() {
    return this.http.get<Record<string, number>>(`${this.resourcePath}/horasextrasusuariosValues`, this.getAuthHeaders())
        .pipe(map(transformRecordToMap));
  }

}
