import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { Hospital } from '../../models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalesService {

  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public subirArchivoService: SubirArchivoService
  ) {
    this.token = localStorage.getItem('token');
  }

  cargarHospitales() {

    const url = URL_SERVICIOS + '/hospital';

    return this.http.get(url);

  }

  borrarHospital(id: string) {

    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this.token;

    return this.http.delete(url)
               .pipe(map( resp => swal('Hosptipal borrado correctamente', '', 'success')));

  }

  actualizarHospital(hospital: Hospital) {

    const url = URL_SERVICIOS + '/hospital/' + hospital._id + '?token=' + this.token;

    return this.http.put(url, hospital);

  }

  buscarPorTermino(termino: string) {

    const url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;

    return this.http.get(url)
               .pipe( map( (resp: any) => resp.hospitales));

  }

  crarHospital(nombre: string) {

    const url = URL_SERVICIOS + '/hospital?token=' + this.token;

    return this.http.post(url, {nombre});

  }

  obtenerHospitalById( id: string ) {

    const url = URL_SERVICIOS + '/hospital/' + id;

    return this.http.get(url)
               .pipe( map( (resp: any) => resp.hospital));

  }

}
