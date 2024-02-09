import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './usuarios/usuarios.component'; // Asegúrate de importar tu UsuariosComponent
import { AuthGuard } from './auth.guard';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';

export const routes: Routes = [
    {
        path:'',redirectTo:'login', pathMatch:'full'
    },
    {
        path:'login',
        component: LoginComponent
    },
    {
        path:'',
        component: LayoutComponent,
        canActivate: [AuthGuard], // Aplicar el guardia de autenticación a esta ruta
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'usuarios', // Agregar la ruta para usuarios
                component: UsuariosComponent
            },
            {
                path: 'registro', // Ruta para el registro de nuevos usuarios
                component: RegistroUsuarioComponent
  
            }
            // ... puedes agregar más rutas hijos aquí
        ]
    },
     //   { path: 'test-usuarios', component: UsuariosComponent },
    // ... otras rutas
];