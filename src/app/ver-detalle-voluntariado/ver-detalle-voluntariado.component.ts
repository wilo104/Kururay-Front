import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VoluntariadosService } from '../voluntariados.service';
import { CommonModule } from '@angular/common';
import { AsignarVoluntarioModalComponent } from '../asignar-voluntario-modal/asignar-voluntario-modal.component';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-detalle-voluntariado',
  standalone: true,
  imports: [CommonModule, AsignarVoluntarioModalComponent],
  templateUrl: './ver-detalle-voluntariado.component.html',
  styleUrls: ['./ver-detalle-voluntariado.component.css'],
  providers: [VoluntariadosService,AuthService],
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
  evidenciaSeleccionada: any = null;
  modalDetalleEvidenciaAbierto = false;
  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private voluntariadosService: VoluntariadosService,
    private authService: AuthService 
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.idVoluntariadoSeleccionado=id;
    this.isMentor = this.authService.gettipo_usuario() === 'MENTOR';
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
 
    abrirFeedback(voluntarioId: number): void {
      if (!voluntarioId || !this.idVoluntariadoSeleccionado) {
        console.error('Faltan los IDs necesarios para navegar a Feedback.');
        return;
      }
      this.router.navigate([`/voluntariados/${this.idVoluntariadoSeleccionado}/voluntarios/${voluntarioId}/feedback`]);
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


    registrarEvidencia(): void {
      console.log("si esta entrando aquí eh");
      this.router.navigate([`/voluntariados/${this.idVoluntariadoSeleccionado}/evidencias/registrar`]);
    }
    
    confirmarEliminarEvidencia(idEvidencia: number): void {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'No podrás revertir esta acción.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
      }).then((result) => {
        if (result.isConfirmed) {
          this.eliminarEvidencia(idEvidencia);
        }
      });
    }
    
    eliminarEvidencia(idEvidencia: number): void {
      this.voluntariadosService.eliminarEvidencia(idEvidencia).subscribe({
        next: () => {
          Swal.fire('Eliminado', 'La evidencia ha sido eliminada.', 'success');
          this.cargarEvidencias(this.idVoluntariadoSeleccionado);
        },
        error: (err) => {
          console.error('Error al eliminar la evidencia:', err);
          Swal.fire('Error', 'No se pudo eliminar la evidencia.', 'error');
        },
      });
    }
    
    abrirDetalleEvidencia(idEvidencia: number): void {
      this.voluntariadosService.obtenerEvidenciaPorId(idEvidencia).subscribe({
        next: (evidencia) => {
          console.log('Evidencia cargada:', evidencia);
          this.evidenciaSeleccionada = evidencia; // Cargar los detalles de la evidencia
          this.modalDetalleEvidenciaAbierto = true; // Abrir el modal
        },
        error: (error) => {
          console.error('Error al cargar la evidencia:', error);
          Swal.fire('Error', 'No se pudo cargar la evidencia.', 'error');
        },
      });
    }
    
    cerrarDetalleEvidencia(): void {
      this.modalDetalleEvidenciaAbierto = false; // Cerrar el modal
      this.evidenciaSeleccionada = null; // Limpiar los datos
    }
    


}
