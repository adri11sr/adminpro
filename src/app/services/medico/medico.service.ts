import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from '../../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(
    public http: HttpClient,
    public usuarioServicio: UsuarioService
  ) { }

  cargarMedicos() {

    const url = URL_SERVICIOS + '/medico';

    return this.http.get(url);

  }

  buscarUsuarios(termino: string) {

    const url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;

    return this.http.get(url)
                .pipe( map( (resp: any) => resp.medicos));

  }

  borrarMedico (id: string) {

    let url = URL_SERVICIOS + '/medico/' + id;
    url += '?token=' + this.usuarioServicio.token;

    return this.http.delete(url)
                .pipe (map ( resp => {
                  swal('Usuario borrado', 'El usuario a sido elimidado correctamente', 'success');
                  return true;
                }));

  }

  guardarMedico(medico: Medico) {

    let url = URL_SERVICIOS + '/medico';

    if (medico._id) {
      // Actualizando
      url += '/' + medico._id;
      url += '?token=' + this.usuarioServicio.token;

      return this.http.put(url, medico)
                  .pipe(map((resp: any) => {

                    swal('Medico actualizado', medico.nombre, 'success');
                    return resp.medico;

                  }));

    } else {
      // Creando
      url += '?token=' + this.usuarioServicio.token;

      return this.http.post(url, medico)
        .pipe(map( (resp: any) => {

          swal('Medico creado', medico.nombre, 'success');
          return resp.medico;

        }));
    }

  }

  cargarMedico(id: string) {

    const url = URL_SERVICIOS + '/medico/' + id;

    return this.http.get(url)
                .pipe(map( (resp: any) => resp.medico));

  }


}
