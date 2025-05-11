import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { HorasextrasDTO } from 'app/horasextras/horasextras.model';
import { map } from 'rxjs';
import { transformRecordToMap } from 'app/common/utils';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class HorasextrasService {

  http = inject(HttpClient);
  private resourcePath = environment.apiPath + 'horasextras';

  getAuthHeaders(): { headers: HttpHeaders } {
      const token = localStorage.getItem('jwt');
      return {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`,
        }),
      };
    }

  getAllHorasextras() {
    return this.http.get<HorasextrasDTO[]>(`${this.resourcePath}/getAll`, this.getAuthHeaders());
  }

  getHorasextras(idhoraextra: number) {
    return this.http.get<HorasextrasDTO>(this.resourcePath + '/' + idhoraextra);
  }

  getHorasextrasPendientes() {
    return this.http.get<HorasextrasDTO[]>(
      `${this.resourcePath}/search?estado=PENDIENTE`,
      this.getAuthHeaders() // <-- AÑADE ESTA LÍNEA
    );
  }

  createHorasextras(horasextrasDTO: HorasextrasDTO) {
    return this.http.post(this.resourcePath + '/crear', horasextrasDTO, this.getAuthHeaders());

  }

  resolverHoraExtra(id: number, dto: { horasAprobadas: number; estado: string }) {
    return this.http.put<HorasextrasDTO>(`${this.resourcePath}/resolver/${id}`, dto);
  }

  updateHorasextras(idhoraextra: number, horasextrasDTO: HorasextrasDTO) {
    return this.http.put<number>(this.resourcePath + '/' + idhoraextra, horasextrasDTO);
  }

  deleteHorasextras(idhoraextra: number) {
    return this.http.delete(this.resourcePath + '/' + idhoraextra);
  }

  getUsuariosValues() {
    return this.http.get<Record<string, number>>(this.resourcePath + '/usuariosValues')
        .pipe(map(transformRecordToMap));
  }

}
