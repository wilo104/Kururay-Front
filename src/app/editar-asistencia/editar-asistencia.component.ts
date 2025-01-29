import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VoluntariadosService } from '../voluntariados.service';
import Swal from 'sweetalert2';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-editar-asistencia',
    templateUrl: './editar-asistencia.component.html',
    styleUrls: ['./editar-asistencia.component.css'],
    imports: [ReactiveFormsModule, CommonModule],
    providers: [VoluntariadosService]
})
export class EditarAsistenciaComponent implements OnInit {
  asistenciaForm!: FormGroup;
  idAsistencia!: number;
  idVoluntariado!: number;
  voluntarios: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private voluntariadosService: VoluntariadosService
  ) {}

  ngOnInit(): void {
    // Obtener parámetros de la URL
    this.idAsistencia = +this.route.snapshot.paramMap.get('id')!;
    this.idVoluntariado = +this.route.snapshot.queryParamMap.get('idVoluntariado')!;

    // Inicializar el formulario y cargar datos
    this.initializeForm();
    this.cargarAsistencia();
  }

  initializeForm(): void {
    this.asistenciaForm = this.fb.group({
      fecha: ['', Validators.required],
      nombreSesion: ['', [Validators.required, Validators.maxLength(255)]],
      estados: this.fb.array([]), // FormArray para los estados de asistencia
    });
  }

  get estados(): FormArray {
    return this.asistenciaForm.get('estados') as FormArray;
  }

  cargarAsistencia(): void {
    this.voluntariadosService.obtenerDetalleAsistencia(this.idAsistencia).subscribe({
      next: (data) => {
        const fecha = new Date(data.asistencia.fecha_asistencia).toISOString().split('T')[0];
        this.asistenciaForm.patchValue({
          fecha: fecha,
          nombreSesion: data.asistencia.nombre_sesion,
        });

        const estadosArray = this.asistenciaForm.get('estados') as FormArray;
        data.voluntarios.forEach((voluntario: any) => {
          estadosArray.push(
            this.fb.group({
              voluntario_id: [voluntario.voluntario_id, Validators.required],
              estado: [voluntario.estado, Validators.required],
            })
          );
        });
        this.voluntarios = data.voluntarios;
      },
      error: (err) => {
        console.error('Error al cargar la asistencia:', err);
      },
    });
  }

  onSubmit(): void {
    if (this.asistenciaForm.valid) {
      this.voluntariadosService.actualizarAsistencia(this.idAsistencia, this.asistenciaForm.value).subscribe({
        next: () => {
          Swal.fire('Éxito', 'Asistencia actualizada correctamente', 'success');
          this.router.navigate(['/voluntariados', this.idVoluntariado, 'detalle']); // Redirección a detalles
        },
        error: (err) => {
          console.error('Error al actualizar la asistencia:', err);
          Swal.fire('Error', 'No se pudo actualizar la asistencia.', 'error');
        },
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/voluntariados', this.idVoluntariado, 'detalle']); // Redirección al cancelar
  }
}
