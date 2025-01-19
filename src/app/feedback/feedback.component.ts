import { Component, OnInit } from '@angular/core';
import { VoluntariosService } from '../voluntarios.service';
import { ActivatedRoute } from '@angular/router'; // Importa ActivatedRoute
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
  feedbacks: any[] = [];
  isLoading: boolean = true; 
  errorMessage: string = '';

  // Inyecta ActivatedRoute en el constructor
  constructor(
    private voluntariadoService: VoluntariosService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Obtener el ID del voluntariado desde la URL
    const voluntariadoId = Number(this.route.snapshot.paramMap.get('voluntariadoId'));
    if (isNaN(voluntariadoId)) {
      console.error('El ID del voluntariado no es válido.');
      this.isLoading = false;
      return;
    }
    console.log(voluntariadoId);
    // Llamar al servicio para obtener el feedback
    this.voluntariadoService.obtenerFeedback(voluntariadoId).subscribe(
      (data) => {
        this.feedbacks = data;
        this.isLoading = false; 
      },
      (error) => {
        this.errorMessage = 'Error al obtener el feedback';
        console.error(error);
        this.isLoading = false;
      }
    );
  }
}
