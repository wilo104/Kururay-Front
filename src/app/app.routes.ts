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
import { RegistroVoluntarioComponent } from './registro-voluntario/registro-voluntario.component';
import { EditarVoluntarioComponent } from './editar-voluntario/editar-voluntario.component';
import { VerDetalleVoluntariadoComponent } from './ver-detalle-voluntariado/ver-detalle-voluntariado.component';
import { ListaBenefactoresComponent } from './lista-benefactores/lista-benefactores.component';
import { RegistroBenefactoresComponent } from './registro-benefactores/registro-benefactores.component';
import { ListaBeneficiariosComponent } from './lista-beneficiarios/lista-beneficiarios.component';
import { RegistroBeneficiariosComponent } from './registro-beneficiarios/registro-beneficiarios.component';
import { EditarBeneficiariosComponent } from './editar-beneficiarios/editar-beneficiarios.component';
import { EditarBenefactorComponent } from './editar-benefactor/editar-benefactor.component';
import { EditarFeedbackComponent } from './editar-feedback/editar-feedback.component';
import { RegistrarFeedbackComponent } from './registrar-feedback/registrar-feedback.component';
import { RegistrarEvidenciaComponent } from './registrar-evidencia/registrar-evidencia.component';
import { RegistrarAsistenciaComponent } from './registrar-asistencia/registrar-asistencia.component';
import { EditarAsistenciaComponent } from './editar-asistencia/editar-asistencia.component';
import { ListarIngresosComponent } from './listar-ingresos/listar-ingresos.component';
import { RegistrarIngresoComponent } from './registrar-ingreso/registrar-ingreso.component';
import { ContabilidadFinancieraComponent } from './contabilidad-financiera/contabilidad-financiera.component';
import { EditarIngresoComponent } from './editar-ingreso/editar-ingreso.component';
import { ListarProductosComponent } from './listar-productos/listar-productos.component';
import { RegistrarProductoComponent } from './registrar-producto/registrar-producto.component';
import { EditarProductoComponent } from './editar-producto/editar-producto.component';
import { ListarGastosComponent } from './listar-gastos/listar-gastos.component';
import { RegistrarGastoComponent } from './registrar-gasto/registrar-gasto.component';
import { EditarGastoComponent } from './editar-gasto/editar-gasto.component';
import { MiInformacionVoluntarioComponent } from './mi-informacion-voluntario/mi-informacion-voluntario.component';

export const routes: Routes = [
    {
        path: '', redirectTo: 'login', pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'usuarios/:id/actualizar-clave',
        component: ActualizarClaveComponent,
        canActivate: [AuthGuard], // Proteger la ruta
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
                path: 'registro-voluntario',
                component: RegistroVoluntarioComponent
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
            { path: 'voluntarios/:id/editar',
             component: EditarVoluntarioComponent
             },

            {
                path:'mis-voluntariados',
                component: MisVoluntariadosComponent
            },
            {
               path: 'mi-informacion-voluntario/:id',
                component: MiInformacionVoluntarioComponent },


            {
                path: 'voluntariados',
                component: VoluntariadosComponent   
            },
            {
                path: 'voluntariados/nuevo',
                component: NuevoVoluntariadoComponent 
            },
            { path: 'voluntariados/:id/detalle',
              component: VerDetalleVoluntariadoComponent
            },   
            { path: 'voluntariados/:voluntariadoId/voluntarios/:voluntarioId/feedback',
             component: FeedbackComponent 
            },
            { 
                path: 'voluntariados/:id/editar',
                 component: EditarVoluntariadoComponent
                
            },

            { path: 'benefactores', 
                component: ListaBenefactoresComponent 
            },
            {
                path: 'benefactores/registro',
                component: RegistroBenefactoresComponent
            },
            { path: 'beneficiarios', component: ListaBeneficiariosComponent },
            // { path: 'beneficiarios/registro', component: RegistroBeneficiariosComponent },
            {
                path: 'beneficiarios/nuevo',
                component: RegistroBeneficiariosComponent,
              },
              {
                path: 'beneficiarios/:id/editar',
                component: EditarBeneficiariosComponent,
              },
              {
                path: 'benefactores/:id/editar',
                component: EditarBenefactorComponent,
              },
            
              {
                path: 'voluntariados/:voluntariadoId/voluntarios/:voluntarioId/feedback/registrar',
                component: RegistrarFeedbackComponent,
            },
            
          
                {
                  path: 'voluntariados/:voluntariadoId/voluntarios/:voluntarioId/feedback/:feedbackId/editar',
                  component: EditarFeedbackComponent,
                },
                {
                  path: 'voluntariados/:voluntariadoId/voluntarios/:voluntarioId/feedback',
                  component: FeedbackComponent,
                },
                {
                    path: 'voluntariados/:id/evidencias/registrar',
                    component: RegistrarEvidenciaComponent, 
                  },
                  {
                    path: 'registrar-asistencia/:id',
                    component: RegistrarAsistenciaComponent,
                  },
                  { path: 'editar-asistencia/:id', component: EditarAsistenciaComponent }, // Nueva ruta
                  {
                    path: 'contabilidad-financiera',
                    children: [
                      {
                        path: '', // Página principal de contabilidad financiera
                        component: ContabilidadFinancieraComponent,
                      },
                      {
                        path: 'ingresos', // Ruta para listar ingresos dentro de contabilidad-financiera
                        component: ListarIngresosComponent,
                      },
                      {
                        path: 'ingresos/registrar', // Ruta para registrar un ingreso
                        component: RegistrarIngresoComponent,
                      },
                      {
                        path: 'ingresos/:id/editar',
                        component: EditarIngresoComponent,
                      },
                      {
                        path: 'ingresos/:id/productos',
                        component: ListarProductosComponent,
                      },
                      {
                        path: 'ingresos/:id/productos/registrar', // Ruta para registrar un producto
                        component: RegistrarProductoComponent,
                      },
                      {
                        path: 'ingresos/:id/productos/:productoId/editar',
                        component: EditarProductoComponent,
                      },
                      {
                        path: 'gastos', // Ruta para listar los gastos
                        component: ListarGastosComponent,
                      },
                      {
                        path: 'gastos/registrar', // Ruta para registrar un gasto
                        component: RegistrarGastoComponent,
                      },
                      {
                        path: 'gastos/:id/editar', // Ruta para editar un gasto específico
                        component: EditarGastoComponent,
                      },
                      
                      



                    ],
                  },
                  
             
                 
              
        ]
    },
    // Esta es la línea crucial: la ruta comodín
    { path: '**', redirectTo: '/dashboard', pathMatch: 'full' } // Redirige a /dashboard por defecto
];