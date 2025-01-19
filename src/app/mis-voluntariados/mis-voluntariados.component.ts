import { Component, OnInit } from '@angular/core';
import { VoluntariosService } from '../voluntarios.service';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mis-voluntariados',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  providers: [VoluntariosService],
  templateUrl: './mis-voluntariados.component.html',
  styleUrls: ['./mis-voluntariados.component.css'],
})
export class MisVoluntariadosComponent implements OnInit {
  voluntariados: any[] = [];
  isLoading: boolean = true;
  p: number = 1; // Para la paginación

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
    this.router.navigate(['/feedback', voluntariadoId]);
  }
}
