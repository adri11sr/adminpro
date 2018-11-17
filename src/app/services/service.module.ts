import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { SettingsService, SidebarService, SharedService, UsuarioService, SubirArchivoService, MedicoService } from './service.index';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';
import { HospitalesService } from './hospitales/hospitales.service';
import { LoginGuardGuard } from './guards/login-guard.guard';
import { AdminGuard } from './guards/admin.guard';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    SubirArchivoService,
    ModalUploadService,
    MedicoService,
    HospitalesService,
    LoginGuardGuard,
    AdminGuard
  ],
  declarations: []
})
export class ServiceModule { }
