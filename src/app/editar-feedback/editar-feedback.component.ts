import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { VoluntariosService } from '../voluntarios.service';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-editar-feedback',
    imports: [FormsModule],
    templateUrl: './editar-feedback.component.html',
    styleUrls: ['./editar-feedback.component.css'],
    providers: [AuthService, VoluntariosService]
})
export class EditarFeedbackComponent implements OnInit {
  voluntariadoId!: number;
  feedbackId!: number;

  feedback = {
    id_voluntario: 0,
    fecha: '',
    tipo: '',
    descripcion: '',
    adicional: '',
    mentor: '',
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private voluntariosService: VoluntariosService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.voluntariadoId = +this.route.snapshot.paramMap.get('voluntariadoId')!;
    this.feedbackId = +this.route.snapshot.paramMap.get('feedbackId')!;
  
    if (!this.voluntariadoId || !this.feedbackId) {
      Swal.fire({
        icon: 'error',
        title: 'Faltan parámetros para cargar el feedback.',
      });
      this.router.navigate(['/voluntariados']);
      return;
    }
  
    this.cargarFeedback();
  }
  
  cargarFeedback(): void {
    this.voluntariosService.obtenerFeedbackPorId(this.feedbackId).subscribe({
      next: (data) => {
        if (data) {
          // Convertir la fecha al formato YYYY-MM-DD
          data.fecha = data.fecha ? new Date(data.fecha).toISOString().split('T')[0] : '';
          this.feedback = data;
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Feedback no encontrado.',
          });
          this.router.navigate([`/voluntariados/${this.voluntariadoId}/voluntarios`]);
        }
      },
      error: (err) => {
        console.error('Error al cargar feedback:', err);
        Swal.fire({
          icon: 'error',
          title: 'No se pudo cargar el feedback.',
        });
      },
    });
  }
  
  guardarFeedback(): void {
    if (!this.feedback.fecha || !this.feedback.tipo || !this.feedback.descripcion) {
      Swal.fire({
        icon: 'warning',
        title: 'Todos los campos son obligatorios.',
      });
      return;
    }

    this.voluntariosService.editarFeedback(this.feedbackId, this.feedback).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Feedback actualizado correctamente',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          this.router.navigate([`/voluntariados/${this.voluntariadoId}/voluntarios/${this.feedback.id_voluntario}/feedback`]);
        });
      },
      error: (err) => {
        console.error('Error al actualizar feedback:', err);
        Swal.fire({
          icon: 'error',
          title: 'No fue posible actualizar el feedback.',
        });
      },
    });
  }

  cancelar(): void {
    this.router.navigate([`/voluntariados/${this.voluntariadoId}/voluntarios/${this.feedback.id_voluntario}/feedback`]);
  }
}
