import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VoluntariadosService } from '../voluntariados.service';
import { CommonModule } from '@angular/common';
import { AsignarVoluntarioModalComponent } from '../asignar-voluntario-modal/asignar-voluntario-modal.component';
import Swal from 'sweetalert2';
import { FeedbackComponent } from '../feedback/feedback.component';
@Component({
  selector: 'app-ver-detalle-voluntariado',
  standalone: true,
  imports: [CommonModule, AsignarVoluntarioModalComponent,FeedbackComponent],
  templateUrl: './ver-detalle-voluntariado.component.html',
  styleUrls: ['./ver-detalle-voluntariado.component.css'],
  providers: [VoluntariadosService],
})
export class VerDetalleVoluntariadoComponent implements OnInit {
  voluntariado: any = {};
  voluntarios: any[] = [];
  evidencias: any[] = [];
  asistencias: any[] = [];
  isMentor: boolean = false;
  modalAbierto = false;
  modalDesasignarAbierto: boolean = false;
  idVoluntariadoSeleccionado!: number;
  modalFeedbackAbierto = false; // Controla la apertura del modal de Feedback
idVoluntario!: number; // ID del voluntario seleccionado para feedback
voluntarioSeleccionado: any = null; // Para almacenar la información del voluntario seleccionado
modalDetalleVoluntarioAbierto = false; // Controla la apertura del modal
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private voluntariadosService: VoluntariadosService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.idVoluntariadoSeleccionado=id;
    this.cargarVoluntariado(id);
    this.cargarVoluntarios(id);
    this.cargarEvidencias(id);
    this.cargarAsistencias(id);
  }

  cargarVoluntariado(id: number): void {
    this.voluntariadosService.obtenerVoluntariadoPorId(id).subscribe({
      next: (voluntariado) => {
        console.log('Voluntariado cargado:', voluntariado);
        this.voluntariado = voluntariado;
      },
      error: (error) => {
        console.error('Error al cargar el voluntariado:', error);
        alert('No se pudo cargar el detalle del voluntariado.');
      },
    });
  }

  cargarVoluntarios(id: number): void {
    this.voluntariadosService.getVoluntariosAsignados(id).subscribe({
      next: (voluntarios) => {
        console.log('Voluntarios asignados:', voluntarios);
        this.voluntarios = voluntarios;
      },
      error: (error) => {
        console.error('Error al cargar los voluntarios:', error);
      },
    });
  }

  cargarEvidencias(id: number): void {
    this.voluntariadosService.obtenerEvidencias(id).subscribe({
      next: (evidencias) => {
        console.log('Evidencias cargadas:', evidencias);
        this.evidencias = evidencias;
      },
      error: (error) => {
        console.error('Error al cargar evidencias:', error);
      },
    });
  }

  cargarAsistencias(id: number): void {
    this.voluntariadosService.obtenerAsistencias(id).subscribe({
      next: (asistencias) => {
        console.log('Asistencias cargadas:', asistencias);
        this.asistencias = asistencias;
      },
      error: (error) => {
        console.error('Error al cargar asistencias:', error);
      },
    });
  }

  retroceder(): void {
    this.router.navigate(['/voluntariados']);
  }

  aprobarVoluntariado(): void {
    alert('Funcionalidad de aprobación aún no implementada.');
  }

  cerrarVoluntariado(): void {
    alert('Funcionalidad de cierre aún no implementada.');
  }

  abrirModal(idVoluntariado: number): void {
    this.modalAbierto = true;
    this.idVoluntariadoSeleccionado = idVoluntariado;
  }

  cerrarModal(): void {
    this.modalAbierto = false;
  }

// Manejar evento de actualización
actualizarListaVoluntarios(): void {
  this.cargarVoluntarios(this.idVoluntariadoSeleccionado);
}



  desasignarVoluntario(voluntarioId: number): void {
    this.idVoluntario=voluntarioId;
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esto eliminará al voluntario del voluntariado.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, desasignar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#f44336',
      }).then((result) => {
        if (result.isConfirmed) {
          console.log('Desasignando voluntario con ID:', voluntarioId); // Verifica el valor
          this.voluntariadosService.desasignarVoluntario(this.idVoluntariadoSeleccionado, voluntarioId).subscribe(
            () => {
              this.voluntarios = this.voluntarios.filter(
                (v) => v.id !== voluntarioId
              );
              Swal.fire('Éxito', 'Voluntario desasignado con éxito.', 'success');
            },
            (error) => {
              console.error('Error al desasignar voluntario:', error);
              Swal.fire('Error', 'Ocurrió un problema al desasignar el voluntario.', 'error');
            }
          );
        }
      });
    }
 
    abrirFeedbackModal(voluntarioId: number): void {
      console.log('Abriendo modal de feedback para el voluntario:', voluntarioId);
      this.idVoluntario = voluntarioId; // Asigna el ID del voluntario
      this.modalFeedbackAbierto = true; // Cambia el estado a true
      console.log('Estado del modalFeedbackAbierto:', this.modalFeedbackAbierto);
    }
    
    cerrarFeedbackModal(): void {
      this.modalFeedbackAbierto = false; // Cierra el modal
    }

    abrirDetalleVoluntario(voluntario: any): void {
      console.log('Voluntario recibido:', voluntario);
      this.voluntarioSeleccionado = voluntario; // Asigna el voluntario seleccionado
      this.modalDetalleVoluntarioAbierto = true; // Abre el modal
    }
    
    cerrarDetalleVoluntario(): void {
      this.modalDetalleVoluntarioAbierto = false; // Cierra el modal
      this.voluntarioSeleccionado = null; // Limpia el voluntario seleccionado
    }

}
