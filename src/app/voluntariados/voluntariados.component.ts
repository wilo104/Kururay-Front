import { Component, OnInit } from '@angular/core';
import { VoluntariadosService } from '../volutariados.service'; // Asegúrate de que el nombre del servicio es correcto
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-voluntariados',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  providers: [VoluntariadosService],
  templateUrl: './voluntariados.component.html',
  styleUrls: ['./voluntariados.component.css']
})
export class VoluntariadosComponent implements OnInit {
  voluntariados: any[] = [];
  isAdmin = false;
  isRecursosHumanos = false;
  isMentor = false;
  p: number = 1; // Página actual

  constructor(private voluntariadosService: VoluntariadosService, public router: Router) {}

  ngOnInit(): void {
    this.verificarRol();
    this.obtenerListaVoluntariados();
  }

  // Método para verificar el rol del usuario
  verificarRol(): void {
    const rolUsuario = localStorage.getItem('usertipo_usuario'); // Asegúrate de que el valor guardado sea correcto
    if (rolUsuario) {
      this.isAdmin = rolUsuario === 'ADMINISTRADOR';
      this.isRecursosHumanos = rolUsuario === 'RRHH';
      this.isMentor = rolUsuario === 'MENTOR';
    }
  }

  // Método para obtener la lista de voluntariados
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

  // Método para navegar a la página de edición de un voluntariado
  editarVoluntariado(voluntariado: any): void {
    this.router.navigate([`/voluntariados/${voluntariado.id}/editar`]);
  }

  // Método para cambiar el estado de un voluntariado
  cambiarEstado(voluntariado: any): void {
    console.log('Cambiar estado:', voluntariado);
    // Implementa la lógica para cambiar el estado del voluntariado
  }
}
