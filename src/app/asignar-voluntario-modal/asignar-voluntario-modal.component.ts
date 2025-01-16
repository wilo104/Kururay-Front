import { Component, Input, Output, EventEmitter } from '@angular/core';
import { VoluntariadosService } from '../voluntariados.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-asignar-voluntario-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './asignar-voluntario-modal.component.html',
  styleUrls: ['./asignar-voluntario-modal.component.css'],
  providers:[VoluntariadosService]
})
export class AsignarVoluntarioModalComponent {
  
  @Input() idVoluntariado!: number; // Recibe el ID del voluntariado
  @Output() cerrarModal = new EventEmitter<void>();

  voluntarios: any[] = [];
  cargando = false;

  constructor(private voluntariadosService: VoluntariadosService) {}

  ngOnInit(): void {
    this.obtenerVoluntariosNoAsignados();
  }

  // Obtener la lista de voluntarios no asignados
  obtenerVoluntariosNoAsignados(): void {
    this.cargando = true;
    this.voluntariadosService.getVoluntariosNoAsignados().subscribe(
      (data) => {
        this.voluntarios = data;
        this.cargando = false;
      },
      (error) => {
        console.error('Error al obtener voluntarios sin asignación:', error);
        this.cargando = false;
      }
    );
  }

  // Asignar un voluntario
  asignarVoluntario(idVoluntario: number): void {
    this.voluntariadosService.asignarVoluntario(this.idVoluntariado, idVoluntario).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Voluntario asignado con éxito.',
          confirmButtonText: 'OK',
          confirmButtonColor: '#4caf50', // Color verde del botón
        });
        this.voluntarios = this.voluntarios.filter((v) => v.id !== idVoluntario);
      },
      (error) => {
        console.error('Error al asignar voluntario:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un problema al asignar el voluntario. Por favor, intenta nuevamente.',
          confirmButtonText: 'OK',
          confirmButtonColor: '#f44336', // Color rojo del botón
        });
      }
    );
  }

  // Cerrar el modal
  cerrar(): void {
    this.cerrarModal.emit();
  }
}
