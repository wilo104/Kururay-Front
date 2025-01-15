import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './usuarios/usuarios.component'; // Asegúrate de importar tu UsuariosComponent
import { AuthGuard } from './auth.guard';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { ActualizarUsuarioComponent } from './actualizar-usuario/actualizar-usuario.component';
import { ActualizarClaveComponent } from './actualizar-clave/actualizar-clave.component';
import { VariableSistemaComponent } from './variable-sistema/variable-sistema.component';
import { VariableRegistroComponent } from './variable-registro/variable-registro.component';
import { ActualizarVariableComponent } from './actualizar-variable/actualizar-variable.component';
import { VoluntariosComponent } from './voluntarios/voluntarios.component';
import { MisVoluntariadosComponent } from './mis-voluntariados/mis-voluntariados.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { VoluntariadosComponent } from './voluntariados/voluntariados.component';
import { NuevoVoluntariadoComponent } from './nuevo-voluntariado/nuevo-voluntariado.component';
import { EditarVoluntariadoComponent } from './editar-voluntariado/editar-voluntariado.component';

export const routes: Routes = [
    {
        path: '', redirectTo: 'login', pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'usuarios',
                component: UsuariosComponent
            },
            {
                path: 'registro',
                component: RegistroUsuarioComponent
            },
            {
                path: 'usuarios/:id/editar',
                component: ActualizarUsuarioComponent
            },
            {
                path: 'usuarios/:id/actualizar-clave',
                component: ActualizarClaveComponent
            },
            {
                path: 'variables-sistema',
                component: VariableSistemaComponent
            },
            {
                path: 'variable-registro',
                component: VariableRegistroComponent
            },
            {
                path: 'variable-sistema/:id/editar',
                component: ActualizarVariableComponent
            },
            {
                path: 'voluntarios',
                component: VoluntariosComponent
            },
            {
                path:'mis-voluntariados',
                component: MisVoluntariadosComponent
            },
            {
                path: 'feedback/:voluntariadoId',
                component: FeedbackComponent   
            },
            {
                path: 'voluntariados',
                component: VoluntariadosComponent   
            },
            {
                path: 'voluntariados/nuevo',
                component: NuevoVoluntariadoComponent 
            },
            { 
                path: 'voluntariados/:id/editar',
                 component: EditarVoluntariadoComponent
                
            },



        ]
    },
    // Esta es la línea crucial: la ruta comodín
    { path: '**', redirectTo: '/dashboard', pathMatch: 'full' } // Redirige a /dashboard por defecto
];