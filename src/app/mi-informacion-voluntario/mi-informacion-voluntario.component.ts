import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { VoluntariosService } from '../voluntarios.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-mi-informacion-voluntario',
    imports: [FormsModule],
    templateUrl: './mi-informacion-voluntario.component.html',
    styleUrls: ['./mi-informacion-voluntario.component.css'],
    providers: [VoluntariosService]
})
export class MiInformacionVoluntarioComponent implements OnInit {
  voluntarioId!: number;
  voluntario: any = {};

  constructor(
    private voluntariosService: VoluntariosService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.voluntarioId = +this.route.snapshot.paramMap.get('id')!;
    this.obtenerInformacionVoluntario();
  }

  obtenerInformacionVoluntario(): void {
    this.voluntariosService.obtenerInformacionVoluntario(this.voluntarioId).subscribe({
      next: (data) => {
        // Convertir fechas al formato 'YYYY-MM-DD'
        this.voluntario = {
          ...data,
          fecha_ingreso: data.fecha_ingreso ? new Date(data.fecha_ingreso).toISOString().split('T')[0] : '',
          fecha_nacimiento: data.fecha_nacimiento ? new Date(data.fecha_nacimiento).toISOString().split('T')[0] : '',
        };
      },
      error: (err) => {
        console.error('Error al obtener la información:', err);
      },
    });
  }
  
  guardarCambios(): void {
    this.voluntariosService.actualizarInformacionVoluntario(this.voluntarioId, this.voluntario).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Información actualizada correctamente.', 'success').then(() => {
          this.router.navigate(['/dashboard']);
        });
      },
      error: (err) => {
        console.error('Error al actualizar la información:', err);
        Swal.fire('Error', 'No se pudo actualizar la información.', 'error');
      },
    });
  }

  cancelar(): void {
    this.router.navigate(['/dashboard']);
  }
}
