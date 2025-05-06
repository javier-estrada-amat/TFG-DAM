import { Routes } from '@angular/router';

// --- COMPONENTES GENERALES ---
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './auth/login/login.component';
import { CambiarPasswordComponent } from './auth/login/cambiarpassword.component';

// --- USUARIOS ---
import { UsuariosListComponent } from './usuarios/usuarios-list.component';
import { UsuariosAddComponent } from './usuarios/usuarios-add.component';
import { UsuariosEditComponent } from './usuarios/usuarios-edit.component';

// --- ROLES ---
import { RolesListComponent } from './roles/roles-list.component';
import { RolesEditComponent } from './roles/roles-edit.component';

// --- EMPRESAS ---
import { EmpresasListComponent } from './empresas/empresas-list.component';
import { EmpresasAddComponent } from './empresas/empresas-add.component';
import { EmpresasEditComponent } from './empresas/empresas-edit.component';

// --- FICHAJES ---
import { FichajesListComponent } from './fichajes/fichajes-list.component';
import { FichajesAddComponent } from './fichajes/fichajes-add.component';
import { FichajesEditComponent } from './fichajes/fichajes-edit.component';
import { FichajesControlComponent } from './fichajes/fichajes-control.component';

// --- HORAS EXTRAS ---
import { HorasextrasListComponent } from './horasextras/horasextras-list.component';
import { HorasextrasAddComponent } from './horasextras/horasextras-add.component';
import { HorasextrasEditComponent } from './horasextras/horasextras-edit.component';
import { HorasextrasApproveComponent } from './horasextras/horasextras-approve.component';

// --- CAMBIO CONTRASEÑAS ---
import { RegistrocambioscontraseniaListComponent } from './registrocambioscontrasenia/registrocambioscontrasenia-list.component';
import { RegistrocambioscontraseniaAddComponent } from './registrocambioscontrasenia/registrocambioscontrasenia-add.component';
import { RegistrocambioscontraseniaEditComponent } from './registrocambioscontrasenia/registrocambioscontrasenia-edit.component';

// --- CONFIGURACIÓN AUTENTICACIÓN ---
import { ConfiguracionautenticacionListComponent } from './configuracionautenticacion/configuracionautenticacion-list.component';
import { ConfiguracionautenticacionAddComponent } from './configuracionautenticacion/configuracionautenticacion-add.component';
import { ConfiguracionautenticacionEditComponent } from './configuracionautenticacion/configuracionautenticacion-edit.component';

// --- HISTORIAL ACTIVIDAD ---
import { HistorialactividadListComponent } from './historialactividad/historialactividad-list.component';
import { HistorialactividadAddComponent } from './historialactividad/historialactividad-add.component';
import { HistorialactividadEditComponent } from './historialactividad/historialactividad-edit.component';

export const routes: Routes = [
  // --- REDIRECCIÓN INICIAL ---
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // --- LOGIN ---
  { path: 'login', component: LoginComponent },
  { path: 'cambiar-password', component: CambiarPasswordComponent },

  // --- HOME ---
  { path: 'home', component: HomeComponent, title: $localize`:@@home.headline:Inicio` },

  // --- USUARIOS ---
  { path: 'usuarios', component: UsuariosListComponent, title: $localize`:@@usuarios.list.headline:Usuarios` },
  { path: 'usuarios/add', component: UsuariosAddComponent, title: $localize`:@@usuarios.add.headline:Add Usuarios` },
  { path: 'usuarios/edit/:idusuario', component: UsuariosEditComponent, title: $localize`:@@usuarios.edit.headline:Edit Usuarios` },

  // --- ROLES ---
  { path: 'roles', component: RolesListComponent, title: $localize`:@@roles.list.headline:Roleses` },
  { path: 'roles/edit/:idrol', component: RolesEditComponent, title: $localize`:@@roles.edit.headline:Edit Roles` },

  // --- EMPRESAS ---
  { path: 'empresas', component: EmpresasListComponent, title: $localize`:@@empresas.list.headline:Empresas` },
  { path: 'empresas/add', component: EmpresasAddComponent, title: $localize`:@@empresas.add.headline:Add Empresas` },
  { path: 'empresas/edit/:idempresa', component: EmpresasEditComponent, title: $localize`:@@empresas.edit.headline:Edit Empresas` },

  // --- FICHAJES ---
  { path: 'fichajes', component: FichajesListComponent, title: $localize`:@@fichajes.list.headline:Fichajes` },
  { path: 'fichajes/add', component: FichajesAddComponent, title: $localize`:@@fichajes.add.headline:Add Fichajes` },
  { path: 'fichajes/edit/:idfichaje', component: FichajesEditComponent, title: $localize`:@@fichajes.edit.headline:Edit Fichajes` },
  { path: 'fichajes/control', loadComponent: () => import('./fichajes/fichajes-control.component').then(m => m.FichajesControlComponent) },

  // --- HORAS EXTRAS ---
  { path: 'horasextras', component: HorasextrasListComponent, title: $localize`:@@horasextras.list.headline:Horasextras` },
  { path: 'horasextras/historial', component: HorasextrasListComponent },
  { path: 'horasextras/add', component: HorasextrasAddComponent, title: $localize`:@@horasextras.add.headline:Add Horasextras` },
  { path: 'horasextras/edit/:idhoraextra', component: HorasextrasEditComponent, title: $localize`:@@horasextras.edit.headline:Edit Horasextras` },
  { path: 'horasextras/aprobar', component: HorasextrasApproveComponent },

  // --- CAMBIO CONTRASEÑAS ---
  { path: 'registrocambioscontrasenia', component: RegistrocambioscontraseniaListComponent, title: $localize`:@@registrocambioscontrasenia.list.headline:Registrocambioscontrasenias` },
  { path: 'registrocambioscontrasenia/add', component: RegistrocambioscontraseniaAddComponent, title: $localize`:@@registrocambioscontrasenia.add.headline:Add Registrocambioscontrasenia` },
  { path: 'registrocambioscontrasenia/edit/:idregistro', component: RegistrocambioscontraseniaEditComponent, title: $localize`:@@registrocambioscontrasenia.edit.headline:Edit Registrocambioscontrasenia` },

  // --- CONFIGURACIÓN AUTENTICACIÓN ---
  { path: 'configuracionautenticacion', component: ConfiguracionautenticacionListComponent, title: $localize`:@@configuracionautenticacion.list.headline:Configuracionautenticacions` },
  { path: 'configuracionautenticacion/add', component: ConfiguracionautenticacionAddComponent, title: $localize`:@@configuracionautenticacion.add.headline:Add Configuracionautenticacion` },
  { path: 'configuracionautenticacion/edit/:idautenticacion', component: ConfiguracionautenticacionEditComponent, title: $localize`:@@configuracionautenticacion.edit.headline:Edit Configuracionautenticacion` },

  // --- HISTORIAL ACTIVIDAD ---
  { path: 'historialactividad', component: HistorialactividadListComponent, title: $localize`:@@historialactividad.list.headline:Historialactividads` },
  { path: 'historialactividad/add', component: HistorialactividadAddComponent, title: $localize`:@@historialactividad.add.headline:Add Historialactividad` },
  { path: 'historialactividad/edit/:idhistorial', component: HistorialactividadEditComponent, title: $localize`:@@historialactividad.edit.headline:Edit Historialactividad` },

  // --- ERROR Y RUTA NO ENCONTRADA ---
  { path: 'error', component: ErrorComponent, title: $localize`:@@error.headline:Error` },
  { path: '**', component: ErrorComponent, title: $localize`:@@notFound.headline:Página no encontrada` }
];
