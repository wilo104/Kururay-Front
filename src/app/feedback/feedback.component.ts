import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VoluntariosService } from '../voluntarios.service';
import { CommonModule } from '@angular/common'; 
import { HttpClientModule } from '@angular/common/http'; 

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule, HttpClientModule], 
  providers: [VoluntariosService], 
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  @Input() voluntariadoId!: number;
  @Input() voluntarioId!: number;
  @Output() cerrarModal = new EventEmitter<void>(); // Evento para cerrar el modal

  feedbacks: any[] = [];
  isLoading: boolean = true; 
  errorMessage: string = '';

  constructor(private voluntariadoService: VoluntariosService) {}

  ngOnInit(): void {

    console.log('FeedbackComponent inicializado con:', {
      voluntariadoId: this.voluntariadoId,
      voluntarioId: this.voluntarioId,
    });

    if (!this.voluntariadoId || !this.voluntarioId) {
      console.error('Faltan IDs de voluntariado o voluntario.');
      this.isLoading = false;
      return;
    }
    this.obtenerFeedback();
  }

  obtenerFeedback(): void {
    this.voluntariadoService.obtenerFeedback(this.voluntariadoId, this.voluntarioId).subscribe(
      (data) => {
        console.log('Feedback recibido:', data); // Asegúrate de que llegan los datos
        this.feedbacks = data;
        this.isLoading = false; 
      },
      (error) => {
        console.error('Error al obtener el feedback:', error);
        this.isLoading = false;
      }
    );
  }
  
  cerrar(): void {
    this.cerrarModal.emit(); // Emite el evento para cerrar el modal
  }

}
