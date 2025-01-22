import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { VoluntariosService } from '../voluntarios.service';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-registrar-feedback',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registrar-feedback.component.html',
  styleUrls: ['./registrar-feedback.component.css'],
  providers: [AuthService, VoluntariosService],
})
export class RegistrarFeedbackComponent implements OnInit {
  voluntariadoId!: number;

  feedback = {
    id_voluntario: 0,
    fecha: '',
    tipo: '', // Asegúrate de que este campo esté definido
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
    this.feedback.id_voluntario = +this.route.snapshot.paramMap.get('voluntarioId')!;
    this.feedback.mentor = this.authService.getNombreUsuario() || 'Unknown';
 

  }

  guardarFeedback(): void {
    if (!this.feedback.fecha || !this.feedback.tipo || !this.feedback.descripcion) {
      alert('Todos los campos son obligatorios.');
      return;
    }
  
    this.voluntariosService.registrarFeedback(this.feedback).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Feedback registrado correctamente',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          // Redirigir usando `id_voluntariado`
          this.router.navigate([`/voluntariados/${this.voluntariadoId}/voluntarios/${this.feedback.id_voluntario}/feedback`]);
        });
      },
      error: (err: any) => {
        console.error('Error al registrar feedback:', err);
        Swal.fire({
          icon: 'error',
          title: 'No fue posible registrar el feedback.',
          text: 'Intenta nuevamente.',
        });
      },
    });
  }
  
  cancelar(): void {
    this.router.navigate([`/voluntariados/${this.voluntariadoId}/voluntarios/${this.feedback.id_voluntario}/feedback`]);
}
}
