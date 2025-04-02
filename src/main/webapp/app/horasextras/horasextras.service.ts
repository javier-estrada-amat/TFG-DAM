import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { HorasextrasDTO } from 'app/horasextras/horasextras.model';
import { map } from 'rxjs';
import { transformRecordToMap } from 'app/common/utils';


@Injectable({
  providedIn: 'root',
})
export class HorasextrasService {

  http = inject(HttpClient);
  resourcePath = environment.apiPath + '/api/horasextrass';

  getAllHorasextrases() {
    return this.http.get<HorasextrasDTO[]>(this.resourcePath);
  }

  getHorasextras(idhoraextra: number) {
    return this.http.get<HorasextrasDTO>(this.resourcePath + '/' + idhoraextra);
  }

  createHorasextras(horasextrasDTO: HorasextrasDTO) {
    return this.http.post<number>(this.resourcePath, horasextrasDTO);
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
