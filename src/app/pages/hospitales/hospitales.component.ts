import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalesService } from '../../services/hospitales/hospitales.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public hospitalesService: HospitalesService,
    public modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {

    this.cargarHospitales();
    this.modalUploadService.notificacion
        .subscribe( resp => this.cargarHospitales());

  }

  buscarHospital(termino: string) {

    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }

    this.cargando = true;

    console.log(termino);

    this.hospitalesService.buscarPorTermino(termino)
        .subscribe( (hospitales: Hospital[]) => {

            console.log((hospitales));
            this.hospitales = hospitales;
            this.cargando = false;

        });

  }

  crearHospital() {

    swal({
      title: 'Crear Hospital',
      text: 'Introduzcal en nombre del Hospital',
      content: 'input',
      icon: 'info',
      dangerMode: true,
      button: true
    })
    .then((valor: string) => {

      if (!valor || valor.length === 0) {
        return;
      }

      this.hospitalesService.crarHospital(valor)
          .subscribe( () => this.cargarHospitales());
    });

  }

  buscarHospitalId(id: string) {

  }

  mostralModal(id: string) {

    this.modalUploadService.mostrarModal('hospitales', id);

  }

  cargarHospitales() {

    this.cargando = true;

    this.hospitalesService.cargarHospitales()
        .subscribe ( (resp: any) => {

          console.log(resp);

          this.hospitales = resp.hospitales;
          this.totalRegistros = resp.total;
          this.cargando = false;

        });

  }

  actuzlizarHospital(nombre: string, hospital: Hospital) {

    console.log(nombre);
    hospital.nombre = nombre;
    console.log(hospital);

    this.hospitalesService.actualizarHospital(hospital)
        .subscribe( resp => {

          swal('Hospital actualizado', 'Se actualizó correctamente', 'success');
          console.log(resp);

        });

  }

  borrarhospital(hospital: Hospital) {

    console.log(hospital);

    swal({
      title: '¿Estas seguro?',
      text: 'Esta a punto de borrar al' + hospital.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then( borrar => {

      console.log(borrar);

      if (borrar) {

        this.hospitalesService.borrarHospital(hospital._id)
        .subscribe( (resp:  any) => this.cargarHospitales());

      }

    });

  }

}
