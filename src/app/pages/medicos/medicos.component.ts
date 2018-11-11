import { Component, OnInit } from '@angular/core';
import { MedicoService } from 'src/app/services/service.index';
import { Medico } from 'src/app/models/medico.model';

declare var swal: any;

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: any[] = [];
  totalRegistros: number;

  constructor(
    public medicoService: MedicoService
  ) { }

  ngOnInit() {

    this.cargarMedicos();

  }

  cargarMedicos() {

    this.medicoService.cargarMedicos()
        .subscribe((resp: any) => {

          console.log(resp);

          this.medicos = resp.medicos;
          this.totalRegistros = resp.total;
          console.log( this.totalRegistros);


        });

  }

  crearMedico() {

  }

  borrarMedico(medico: Medico) {

    swal({
      title: '¿Estas seguro?',
      text: 'Esta a punto de borrar al Medico ' + medico.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then( borrar => {

      console.log(borrar);

      if (borrar) {

        this.medicoService.borrarMedico(medico._id)
        .subscribe( (resp:  any) => this.cargarMedicos());

      }

    });

  }

  mostralModal(id: string) {

  }

  buscarMedico(termino: string) {

    if (termino.length <= 0) {
      this.cargarMedicos();
      return;
    }

    this.medicoService.buscarUsuarios(termino)
        .subscribe( medicos => this.medicos = medicos);

  }

  editarMedico(medico: Medico) {

  }

}
