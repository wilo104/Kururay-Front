import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VoluntariosService } from '../voluntarios.service';
import { NgxPaginationModule } from 'ngx-pagination';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-voluntarios',
  standalone: true,
  providers: [VoluntariosService],
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './voluntarios.component.html',
  styleUrls: ['./voluntarios.component.css'],
})
export class VoluntariosComponent {
restauraracceso(_t46: any) {
throw new Error('Method not implemented.');
}
  voluntarios: any[] = [];
  isLoading = false;
  p: number = 1;
  direccionOrden: any;
  ordenActual: string | undefined;
  UsuarioService: any;
  usuarios: any;
  mostrarModal: boolean = false;
  voluntariosNoAsignados: any[] = [];
  idVoluntariado: number | null = null; // ID dinámico del voluntariado

  constructor(private voluntariosService: VoluntariosService ,private router: Router) {}

  ngOnInit(): void {
    this.obtenerListaVoluntarios();
  }

  obtenerListaVoluntarios(): void {
    this.isLoading = true;
    this.voluntariosService.obtenerVoluntarios().subscribe(
      (data: any[]) => {
        this.voluntarios = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al obtener la lista de voluntarios:', error);
        this.isLoading = false;
      }
    );
  }

  abrirModal(): void {
    this.mostrarModal = true;
    this.voluntariosService.obtenerVoluntariosNoAsignados().subscribe(
      (data: any[]) => {
        this.voluntariosNoAsignados = data;
      },
      (error) => {
        console.error('Error al obtener voluntarios no asignados:', error);
      }
    );
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.obtenerListaVoluntarios(); // Actualiza la tabla principal después de cerrar el modal
  }

 


  // Método para cambiar el estado del voluntario
  cambiarEstadoVoluntario(voluntario: any): void {
    const nuevoEstado = voluntario.estado_voluntario ? 'Inactivo' : 'Activo';
    this.voluntariosService.cambiarEstadoVoluntario(voluntario.id, nuevoEstado).subscribe(
      (response) => {
        this.obtenerListaVoluntarios(); // Recarga la lista desde el backend
        Swal.fire('Éxito', `El estado del voluntario se cambió a ${nuevoEstado}.`, 'success');
      },
      (error) => {
        console.error('Error al cambiar el estado del voluntario:', error);
        Swal.fire('Error', 'No se pudo cambiar el estado del voluntario.', 'error');
      }
    );
  }
  
  

  ordenarPor(propiedad: string): void {
    console.log(`Ordenando por ${propiedad} en dirección ${this.direccionOrden}`);

    // Cambiar la dirección del orden si se hace clic en la misma cabecera, de lo contrario, reiniciar a 'ASC'
    if (this.ordenActual === propiedad) {
      this.direccionOrden = this.direccionOrden === 'ASC' ? 'DESC' : 'ASC';
    } else {
      this.direccionOrden = 'ASC';
    }
    this.ordenActual = propiedad;
    // Hacer una llamada al backend con el nuevo orden
    this.obtenerListaVoluntarios();
  }

  nuevoUsuario() {
    this.router.navigate(['/registro-voluntario']);
  }
  verCV(voluntario: any): void {
    this.voluntariosService.obtenerCVVoluntario(voluntario.id).subscribe(
      (cv: Blob) => {
        const url = window.URL.createObjectURL(cv);
        window.open(url); // Abre el CV en una nueva pestaña
      },
      (error) => {
        console.error('Error al obtener el CV:', error);
        Swal.fire('Error', 'No se pudo obtener el CV del voluntario.', 'error');
      }
    );
  }
  
  editarVoluntario(voluntario: any): void {
    this.router.navigate([`/voluntarios/${voluntario.id}/editar`]);
  }




  editarUsuario(usuario: any) {
    this.router.navigate([`/usuarios/${usuario.id}/editar`]);
  }

}