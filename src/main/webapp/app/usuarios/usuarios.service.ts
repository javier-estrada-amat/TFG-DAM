import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { UsuariosDTO } from 'app/usuarios/usuarios.model';
import { map } from 'rxjs';
import { transformRecordToMap } from 'app/common/utils';


@Injectable({
  providedIn: 'root',
})
export class UsuariosService {

  http = inject(HttpClient);
  resourcePath = environment.apiPath + 'usuarios';

  getAllUsuarioses() {
    return this.http.get<UsuariosDTO[]>(this.resourcePath+'/getAll');
  }

  getUsuarios(idusuario: number) {
    return this.http.get<UsuariosDTO>(this.resourcePath + '/' + idusuario);
  }

  createUsuarios(usuariosDTO: UsuariosDTO) {
    return this.http.post<number>(this.resourcePath, usuariosDTO);
  }

  updateUsuarios(idusuario: number, usuariosDTO: UsuariosDTO) {
    return this.http.put<number>(this.resourcePath + '/' + idusuario, usuariosDTO);
  }

  deleteUsuarios(idusuario: number) {
    return this.http.delete(this.resourcePath + '/' + idusuario);
  }

  getEmpresasValues() {
    return this.http.get<Record<string, number>>(this.resourcePath + '/empresasValues')
        .pipe(map(transformRecordToMap));
  }

  getRolesValues() {
    return this.http.get<Record<string, number>>(this.resourcePath + '/rolesValues')
        .pipe(map(transformRecordToMap));
  }

  getConfiguracionautenticacionValues() {
    return this.http.get<Record<string, number>>(this.resourcePath + '/configuracionautenticacionValues')
        .pipe(map(transformRecordToMap));
  }

  getHorasextrasusuariosValues() {
    return this.http.get<Record<string, number>>(this.resourcePath + '/horasextrasusuariosValues')
        .pipe(map(transformRecordToMap));
  }

}
