import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// RUTAS
import { APP_ROUTES } from './app.routes';

// MODULOS
import { PagesModule } from './pages/pages.module';
import { FormsModule } from '@angular/forms';

// COMPONENTS
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

// SERVICES
import { SharedService } from './services/shared.service';
import { SidebarService } from './services/sidebar.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    PagesModule,
    FormsModule,
    APP_ROUTES
  ],
  providers: [
    SharedService,
    SidebarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
