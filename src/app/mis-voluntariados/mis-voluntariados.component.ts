import { Component, OnInit } from '@angular/core';
import { VoluntariosService } from '../voluntarios.service';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-mis-voluntariados',
    imports: [CommonModule, NgxPaginationModule],
    providers: [VoluntariosService],
    templateUrl: './mis-voluntariados.component.html',
    styleUrls: ['./mis-voluntariados.component.css']
})
export class MisVoluntariadosComponent implements OnInit {
  voluntariados: any[] = [];
  feedbacks: any[] = [];
  isLoading: boolean = true;
  p: number = 1; // Paginación
  mostrandoFeedback: boolean = false;

  constructor(
    private voluntariosService: VoluntariosService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarHistorialVoluntariados();
  }

  cargarHistorialVoluntariados(): void {
    const id = parseInt(localStorage.getItem('id') || '', 10);
    if (isNaN(id)) {
      console.error('El ID del voluntario no es válido.');
      this.isLoading = false;
      return;
    }

    const token = this.authService.gettoken();
    if (!token) {
      console.error('El token no es válido.');
      this.isLoading = false;
      return;
    }

    this.voluntariosService.obtenerHistorialVoluntario(id, token).subscribe({
      next: (data) => {
        console.log(data)
        this.voluntariados = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar los voluntariados:', error);
        this.isLoading = false;
      },
    });
  }

  verFeedback(voluntariadoId: number): void {
    const voluntarioId = parseInt(localStorage.getItem('id') || '', 10);
  
    if (!voluntarioId || !voluntariadoId) {
      console.error('Los IDs no son válidos.');
      Swal.fire('Error', 'No se pudieron identificar los datos del voluntario o voluntariado.', 'error');
      return;
    }
  
    this.voluntariosService.obtenerFeedback_vlogueado_voluntariado(voluntarioId, voluntariadoId).subscribe({
      next: (response) => {
        this.feedbacks = response.feedbacks; // Asigna el feedback obtenido
        this.mostrandoFeedback = true; // Cambia a true para mostrar el feedback
  
        if (this.feedbacks.length === 0) {
          Swal.fire('Sin feedback', 'Este voluntariado no tiene feedbacks registrados.', 'info');
        }
      },
      error: (error) => {
        console.error('Error al obtener los feedbacks:', error);
        Swal.fire('Error', 'Ocurrió un problema al obtener el feedback. Intenta nuevamente.', 'error');
      },
    });
  }
  
  
  

  regresar(): void {
    this.mostrandoFeedback = false;
    this.feedbacks = [];
  }
}
