import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { VoluntariosService } from '../voluntarios.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registrar-asistencia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registrar-asistencia.component.html',
  styleUrls: ['./registrar-asistencia.component.css'],
  providers:[VoluntariosService]
})
export class RegistrarAsistenciaComponent implements OnInit {
  asistenciaForm!: FormGroup;
  voluntarios: any[] = [];
  idVoluntariado!: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private voluntariosService: VoluntariosService
  ) {}

  ngOnInit(): void {
    this.idVoluntariado = +this.route.snapshot.paramMap.get('id')!;
    this.initializeForm();
    this.cargarVoluntarios();
  }

  initializeForm(): void {
    this.asistenciaForm = this.fb.group({
      fecha: ['', [Validators.required]],
      nombreSesion: ['', [Validators.required, Validators.maxLength(255)]],
      estados: this.fb.array([]), // Inicializamos el FormArray vacío
    });
  }

  cargarVoluntarios(): void {
    this.voluntariosService.obtenerVoluntariosPorVoluntariado(this.idVoluntariado).subscribe({
      next: (voluntarios) => {
        this.voluntarios = voluntarios;
        const estadosArray = this.asistenciaForm.get('estados') as FormArray;
        this.voluntarios.forEach((voluntario) => {
          estadosArray.push(
            this.fb.group({
              voluntario_id: [voluntario.id, Validators.required],
              estado: ['', Validators.required], // Estado inicial vacío
            })
          );
        });
      },
      error: (err) => console.error(err),
    });
  }

  get estados(): FormArray {
    return this.asistenciaForm.get('estados') as FormArray;
  }

  onSubmit(): void {
    if (this.asistenciaForm.valid) {
      const formValue = this.asistenciaForm.value;
      const asistencia = {
        fecha_asistencia: formValue.fecha,
        nombre_sesion: formValue.nombreSesion,
        estados: formValue.estados,
        voluntariado_id: this.idVoluntariado,
      };

      this.voluntariosService.registrarAsistencia(asistencia).subscribe({
        next: () => {
          alert('Asistencia registrada exitosamente');
          this.router.navigate([`/voluntariados/${this.idVoluntariado}/detalle`]);
        },
        error: (err) => console.error('Error al registrar asistencia:', err),
      });
    } else {
      alert('Formulario inválido. Por favor, revisa los campos.');
    }
  }

  cancelar(): void {
    this.router.navigate([`/voluntariados/${this.idVoluntariado}/detalle`]);
  }
}
