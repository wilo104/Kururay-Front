import { Component, OnInit } from '@angular/core';
import { VoluntariadosService } from '../voluntariados.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-voluntariados',
  standalone: true,
  imports: [
    CommonModule,
    NgxPaginationModule,
  ],
  providers: [VoluntariadosService],
  templateUrl: './voluntariados.component.html',
  styleUrls: ['./voluntariados.component.css'],
})
export class VoluntariadosComponent implements OnInit {
  voluntariados: any[] = [];
  isAdmin = false;
  isRecursosHumanos = false;
  isMentor = false;
  p: number = 1; // Página actual

  // Variables para controlar los modales
  modalAbierto = false;
  modalDesasignarAbierto: boolean = false; // Inicializa en false
  modalDetalleAbierto: boolean = false;
  idVoluntariadoSeleccionado!: number;

  constructor(
    private voluntariadosService: VoluntariadosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.verificarRol();
    this.obtenerListaVoluntariados();
  }

  verificarRol(): void {
    const rolUsuario = localStorage.getItem('usertipo_usuario');
    if (rolUsuario) {
      this.isAdmin = rolUsuario === 'ADMINISTRADOR';
      this.isRecursosHumanos = rolUsuario === 'RRHH';
      this.isMentor = rolUsuario === 'MENTOR';
    }
  }

  obtenerListaVoluntariados(): void {
    this.voluntariadosService.getVoluntariados().subscribe(
      (data) => {
        this.voluntariados = data;
        this.p = 1; 
      },
      (error) => {
        console.error('Error al obtener la lista de voluntariados:', error);
      }
    );
  }

  editarVoluntariado(voluntariado: any): void {
    if (!voluntariado?.id) {
      console.error('El ID del voluntariado no está disponible.');
      return;
    }
    this.router.navigate([`/voluntariados/${voluntariado.id}/editar`]);
  }

  cambiarEstado(voluntariado: any): void {
    const nuevoEstado = voluntariado.estado === 'activo' ? 'inactivo' : 'activo';

    this.voluntariadosService.cambiarEstadoVoluntariado(voluntariado.id, nuevoEstado).subscribe({
      next: (response) => {
        alert('Estado cambiado con éxito');
        this.obtenerListaVoluntariados(); // Actualizar la lista
      },
      error: (error) => {
        console.error('Error al cambiar el estado:', error);
        alert('Error al cambiar el estado del voluntariado');
      },
    });
  }

  registrarVoluntariado(): void {
    this.router.navigate(['/voluntariados/nuevo']);
  }


 
  


  verDetalle(id: number): void {
    this.router.navigate([`/voluntariados/${id}/detalle`]);
  }
 
  toggleEstado(voluntariado: any): void {
    const nuevoEstado = !voluntariado.estado_alta;

    this.voluntariadosService.cambiarEstadoAlta(voluntariado.id, nuevoEstado).subscribe({
        next: () => {
            voluntariado.estado_alta = nuevoEstado; // Actualiza el estado localmente
            Swal.fire('Éxito', `Estado cambiado a ${nuevoEstado ? 'De Alta' : 'De Baja'}`, 'success');
        },
        error: () => Swal.fire('Error', 'No se pudo cambiar el estado.', 'error'),
    });
}

  
 

 }