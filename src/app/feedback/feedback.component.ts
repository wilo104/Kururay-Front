import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VoluntariosService } from '../voluntarios.service';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common'; 
@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule], // Asegúrate de que esté incluido aquí
  providers: [VoluntariosService, AuthService],
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
})
export class FeedbackComponent implements OnInit {
  voluntarioId!: number;
  voluntariadoId!: number;
  feedbacks: any[] = [];
  isLoading: boolean = true;
  role: string = ''; // Tipo de usuario
  modalAbierto: boolean = false;
  feedbackAEliminar: number | null = null;

  constructor(
    private voluntariadoService: VoluntariosService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.voluntariadoId = +this.route.snapshot.paramMap.get('voluntariadoId')!;
    this.voluntarioId = +this.route.snapshot.paramMap.get('voluntarioId')!;
    this.role = this.authService.gettipo_usuario() || 'guest';

    if (!this.voluntarioId || !this.voluntariadoId) {
      console.error('Faltan IDs del voluntario o voluntariado.');
      this.isLoading = false;
      return;
    }

    this.obtenerFeedback();
  }


  obtenerFeedback(): void {
    this.voluntariadoService.obtenerFeedback(this.voluntarioId, this.voluntariadoId).subscribe(
      (data) => {
        console.log('Feedback recibido:', data); // Depuración
        this.feedbacks = Array.isArray(data.feedbacks) ? data.feedbacks : []; // Accede a la propiedad feedbacks
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al obtener el feedback:', error);
        this.feedbacks = []; // Limpia los datos en caso de error
        this.isLoading = false;
      }
    );
  }
  
  
  
  

  registrarFeedback(): void {
    if (this.role === 'MENTOR') {
      this.router.navigate([`/voluntariados/${this.voluntariadoId}/voluntarios/${this.voluntarioId}/feedback/registrar`]);
    } else {
      Swal.fire('No tienes permiso para registrar feedback.');
    }
  }

  editarFeedback(feedbackId: number): void {
    if (!this.voluntariadoId || !this.voluntarioId || !feedbackId) {
      console.error('Faltan parámetros para la navegación:');
      console.error('voluntariadoId:', this.voluntariadoId);
      console.error('voluntarioId:', this.voluntarioId);
      console.error('feedbackId:', feedbackId);
      return; // Evita que el código intente navegar con parámetros indefinidos
    }
  
    this.router.navigate([
      '/voluntariados',
      this.voluntariadoId,
      'voluntarios',
      this.voluntarioId,
      'feedback',
      feedbackId,
      'editar',
    ]);
  }
  
  abrirModalEliminar(feedbackId: number): void {
    this.modalAbierto = true;
    this.feedbackAEliminar = feedbackId;
  }

  cerrarModalEliminar(): void {
    this.modalAbierto = false;
    this.feedbackAEliminar = null;
  }

  eliminarFeedbackConfirmado(): void {
    if (this.feedbackAEliminar === null) return;

    this.voluntariadoService.eliminarFeedback(this.feedbackAEliminar).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Feedback eliminado correctamente.',
          showConfirmButton: false,
          timer: 1500,
        });

        this.feedbacks = this.feedbacks.filter((fb) => fb.id !== this.feedbackAEliminar);
        this.cerrarModalEliminar();
      },
      error: (err) => {
        console.error('Error al eliminar feedback:', err);
        Swal.fire('No fue posible eliminar el feedback.');
      },
    });
  }

  regresar(): void {
    this.router.navigate([`/voluntariados/${this.voluntariadoId}/detalle`]);
  }
}
