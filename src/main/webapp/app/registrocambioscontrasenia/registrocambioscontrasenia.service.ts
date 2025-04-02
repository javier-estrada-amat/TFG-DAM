import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { RegistrocambioscontraseniaDTO } from 'app/registrocambioscontrasenia/registrocambioscontrasenia.model';
import { map } from 'rxjs';
import { transformRecordToMap } from 'app/common/utils';


@Injectable({
  providedIn: 'root',
})
export class RegistrocambioscontraseniaService {

  http = inject(HttpClient);
  resourcePath = environment.apiPath + '/api/registrocambioscontrasenias';

  getAllRegistrocambioscontrasenias() {
    return this.http.get<RegistrocambioscontraseniaDTO[]>(this.resourcePath);
  }

  getRegistrocambioscontrasenia(idregistro: number) {
    return this.http.get<RegistrocambioscontraseniaDTO>(this.resourcePath + '/' + idregistro);
  }

  createRegistrocambioscontrasenia(registrocambioscontraseniaDTO: RegistrocambioscontraseniaDTO) {
    return this.http.post<number>(this.resourcePath, registrocambioscontraseniaDTO);
  }

  updateRegistrocambioscontrasenia(idregistro: number, registrocambioscontraseniaDTO: RegistrocambioscontraseniaDTO) {
    return this.http.put<number>(this.resourcePath + '/' + idregistro, registrocambioscontraseniaDTO);
  }

  deleteRegistrocambioscontrasenia(idregistro: number) {
    return this.http.delete(this.resourcePath + '/' + idregistro);
  }

  getUsuariosValues() {
    return this.http.get<Record<string, number>>(this.resourcePath + '/usuariosValues')
        .pipe(map(transformRecordToMap));
  }

}
