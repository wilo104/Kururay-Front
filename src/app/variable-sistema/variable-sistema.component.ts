import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { VariablesService } from '../variables.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
    selector: 'app-variable-sistema',
    providers: [VariablesService],
    imports: [CommonModule, NgxPaginationModule],
    templateUrl: './variable-sistema.component.html',
    styleUrl: './variable-sistema.component.css'
})
export class VariableSistemaComponent {
nuevaVariable() {
  this.router.navigate(['/variable-registro']); // Asegúrate de que la ruta '/registro' esté configurada en tu módulo de rutas

}

editarVariable(variable: { id: any; }) {
  this.router.navigate([`/variable-sistema/${variable.id}/editar`])
}
  
    p: number = 1;
    variables: any[] = [];
    isLoading = false;
  
    constructor(private variableService: VariablesService,private router: Router) {}
  
    ngOnInit(): void {
      this.obtenerListaVariables();
    }
  
    obtenerListaVariables() {
      this.isLoading = true;
      this.variableService.obtenerVariables().subscribe(
        (data: any[]) => {
          this.variables = data;
          this.isLoading = false;
        },
        (error: any) => {
          console.error('Error al obtener la lista de Variables:', error);
          this.isLoading = false;
        }
      );
    }
    cambiarEstado(variable: any) {
      const nuevoEstado = variable.estado ? 'baja' : 'alta';
      this.variableService.cambiarEstadoVariable(variable.id, nuevoEstado).subscribe(
        (response) => {
          console.log('Estado del variable cambiado exitosamente:', response);
          variable.estado = !variable.estado; // Actualizar el estado del variable en el arreglo local
        },
        (error) => {
          console.error('Error al cambiar el estado del variable:', error);
          // Manejar el error adecuadamente, por ejemplo, mostrar un mensaje de error al variable
        }
      );
    }
    
  
}
