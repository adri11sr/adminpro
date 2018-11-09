import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: string;

  constructor(
    public usuarioService: UsuarioService
  ) {
    this.usuario = this.usuarioService.usuario;
   }

  ngOnInit() {
  }

  guardar(usuario: Usuario) {

    console.log(usuario);
    this.usuario.nombre = usuario.nombre;

    if (!this.usuario.google) {
      this.usuario.email = usuario.email;
    }

    this.usuarioService.actualizarUsuario(this.usuario)
        .subscribe( resp => {
          // console.log(resp);
        });

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

  cambiarImagen() {
    this.usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id);
  }

}
