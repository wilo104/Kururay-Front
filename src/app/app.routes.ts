import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    {
        path:'',redirectTo:'login', pathMatch:'full'
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'',
        component:LayoutComponent,
        canActivate: [AuthGuard], // Aplicar el guardia de autenticación a esta ruta
        children:[
            {
                path:'dashboard',
                component:DashboardComponent
            }
        ]
    },

    
    
];
