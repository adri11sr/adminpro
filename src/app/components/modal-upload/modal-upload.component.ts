import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from '../../services/service.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;
  imagenTemp: string;

  constructor(
    public subirArchivo: SubirArchivoService,
    public modalUploadService: ModalUploadService
  ) {
    console.log('Modal listo');
   }

  ngOnInit() {
  }

  seleccionImagen(archivo: File) {

    if (!archivo) {
      return;
    }

    // console.log(archivo);
    if (archivo.type.indexOf('image') < 0) {
      this.imagenSubir = null;
      swal ('Sólo imagenes', 'El archivo seleccionado no es una imagen', 'error');
      return;
    }

    this.imagenSubir = archivo;

    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemp = reader.result.toString();

  }

  subirImagen() {

    console.log(this.imagenSubir);
    console.log(this.modalUploadService.tipo);
    console.log(this.modalUploadService.id);

    this.subirArchivo.subirArchivo(this.imagenSubir, this.modalUploadService.tipo, this.modalUploadService.id)
        .then( resp => {

          console.log(resp);

          this.modalUploadService.notificacion.emit(resp);
          this.cerrarModal();

        })
        .catch(resp => {

          console.log('Error en la carga');

        });

  }

  cerrarModal() {

    this.imagenTemp = null;
    this.imagenSubir = null;
    this.modalUploadService.ocultarModal();

  }

}
