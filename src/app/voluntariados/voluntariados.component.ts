import { Component, OnInit } from '@angular/core';
import { VoluntariadosService } from '../voluntariados.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { AsignarVoluntarioModalComponent } from '../asignar-voluntario-modal/asignar-voluntario-modal.component';
import { DesasignarVoluntarioModalComponent } from '../desasignar-voluntario-modal/desasignar-voluntario-modal.component';
@Component({
  selector: 'app-voluntariados',
  standalone: true,
  imports: [
    CommonModule,
    NgxPaginationModule,
    HttpClientModule,
    AsignarVoluntarioModalComponent,
    DesasignarVoluntarioModalComponent,
  
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

  // Abrir y cerrar modales
  abrirModal(idVoluntariado: number): void {
    this.modalAbierto = true;
    this.idVoluntariadoSeleccionado = idVoluntariado;
  }

  cerrarModal(): void {
    this.modalAbierto = false;
  }

  abrirModalDesasignar(idVoluntariado: number): void {
    console.log('Abrir modal de desasignar para voluntariado:', idVoluntariado); // Debugging
    this.modalDesasignarAbierto = true;
    this.idVoluntariadoSeleccionado = idVoluntariado;
  }
  
  cerrarModalDesasignar(): void {
    this.modalDesasignarAbierto = false;
  }

  // obtenerListaVoluntariados(): void {
  //   this.voluntariadosService.getVoluntariados().subscribe(
  //     (data) => {
  //       this.voluntariados = data;
  //     },
  //     (error) => {
  //       console.error('Error al obtener la lista de voluntariados:', error);
  //     }
  //   );
  // }

 

 }