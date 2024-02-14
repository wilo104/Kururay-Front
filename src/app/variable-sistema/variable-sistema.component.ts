import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { VariablesService } from '../variables.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-variable-sistema',
  standalone: true,
  providers:[VariablesService],
  imports: [CommonModule,NgxPaginationModule],
  templateUrl: './variable-sistema.component.html',
  styleUrl: './variable-sistema.component.css'
})
export class VariableSistemaComponent {
nuevaVariable() {
  this.router.navigate(['/variable-registro']); // Asegúrate de que la ruta '/registro' esté configurada en tu módulo de rutas

}
cambiarEstado(_t24: any) {
throw new Error('Method not implemented.');
}
editarUsuario(arg0: any) {
throw new Error('Method not implemented.');
}
  // nuevaVariable() {
  //   this.router.navigate(['/registro']); // Asegúrate de que la ruta '/registro' esté configurada en tu módulo de rutas
  
  // }
  // cambiarEstado(usuario: any) {
  //   const nuevoEstado = usuario.estado_usuario ? 'baja' : 'alta';
  //   this.usuarioService.cambiarEstadoUsuario(usuario.id, nuevoEstado).subscribe(
  //     (response) => {
  //       console.log('Estado del usuario cambiado exitosamente:', response);
  //       usuario.estado_usuario = !usuario.estado_usuario; // Actualizar el estado del usuario en el arreglo local
  //     },
  //     (error) => {
  //       console.error('Error al cambiar el estado del usuario:', error);
  //       // Manejar el error adecuadamente, por ejemplo, mostrar un mensaje de error al usuario
  //     }
  //   );
  // }
  
  // editarUsuario(usuario: any) {
  //   this.router.navigate([`/usuarios/${usuario.id}/editar`])
  // }
    p: number = 1;
    variables: any[] = [];
    isLoading = false;
  
    constructor(private variableService: VariablesService,private router: Router) {}
  
    ngOnInit(): void {
      this.obtenerListaUsuarios();
    }
  
    obtenerListaUsuarios() {
      this.isLoading = true;
      this.variableService.obtenerVariables().subscribe(
        (data: any[]) => {
          this.variables = data;
          this.isLoading = false;
        },
        (error: any) => {
          console.error('Error al obtener la lista de usuarios:', error);
          this.isLoading = false;
        }
      );
    }
  
}
