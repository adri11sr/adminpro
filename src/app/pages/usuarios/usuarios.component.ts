import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public usuarioService: UsuarioService,
    public modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {

    this.cargarUsuarios();

    this.modalUploadService.notificacion
        .subscribe( resp => this.cargarUsuarios());

  }

  mostralModal(id: string) {

    this.modalUploadService.mostrarModal('usuarios', id);

  }

  cargarUsuarios() {

    this.cargando = true;

    this.usuarioService.cargarUsuarios(this.desde)
                        .subscribe ((resp: any) => {
                          console.log(resp);
                          this.totalRegistros = resp.total;
                          this.usuarios = resp.usuarios;
                          this.cargando = false;
                        });

  }

  cambiarDesde( valor: number ) {

    const desde = this.desde + valor;
    console.log(desde);

    if (desde >= this.totalRegistros) {
      return;
    }

    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();

  }

  buscarUsuario(termino: string) {

    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;

    console.log(termino);

    this.usuarioService.buscarUsuarios(termino)
        .subscribe((usuarios: Usuario[]) => {

          console.log(usuarios);
          this.usuarios = usuarios;
          this.cargando = false;

        });

  }

  borrarUsuario(usuario: Usuario) {

    console.log(usuario);
    if (usuario._id === this.usuarioService.usuario._id) {
      swal('No se puede borrar el usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }

    swal({
      title: '¿Estas seguro?',
      text: 'Esta a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then( borrar => {

      console.log(borrar);

      if (borrar) {

        this.usuarioService.borrarUsuario(usuario._id)
            .subscribe( (borrado: Boolean) => {

              console.log(borrado);
              this.desde = 0;
              this.cargarUsuarios();

            });

      }

    });

  }

  guardarUsuario(usuario: Usuario) {

    this.usuarioService.actualizarUsuario(usuario)
        .subscribe();

  }

}
