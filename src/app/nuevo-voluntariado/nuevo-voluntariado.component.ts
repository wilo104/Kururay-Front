import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VoluntariadosService } from '../voluntariados.service';
import { VariablesService } from '../variables.service';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-nuevo-voluntariado',
  templateUrl: './nuevo-voluntariado.component.html',
  styleUrls: ['./nuevo-voluntariado.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  providers: [VoluntariadosService, VariablesService, AuthService],
})
export class NuevoVoluntariadoComponent implements OnInit {
  tipos: string[] = [];
  nuevoVoluntariadoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private voluntariadosService: VoluntariadosService,
    private variablesService: VariablesService,
    private router: Router,
    private authService: AuthService
  ) {
    this.nuevoVoluntariadoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      tipo: ['', Validators.required],
      fecha_inicio: ['', Validators.required],
      fecha_fin: ['', Validators.required],
      objetivoGeneral: ['', Validators.required],
      objetivoEspecifico1: [''],
      objetivoEspecifico2: [''],
      objetivoEspecifico3: [''],
      objetivoEspecifico4: [''],
      objetivoEspecifico5: [''],
      publicoObjetivo: ['', Validators.required],
      beneficiariosDirectos: [''],
      beneficiariosIndirectos: [''],
      presupuestoInicial: [null],
      aliados: [''],
    });
  }

  ngOnInit(): void {
    this.cargarValores('TIPO_VOLUNTARIADO');
  }

  cargarValores(nombreVariable: string): void {
    this.variablesService.obtenerValoresPorNombre(nombreVariable).subscribe({
      next: (valores: string[]) => {
        this.tipos = valores;
      },
      error: (error: unknown) =>
        console.error(`Error al cargar ${nombreVariable}:`, error),
    });
  }

  guardarVoluntariado(): void {
    if (this.nuevoVoluntariadoForm.valid) {
      const data = this.nuevoVoluntariadoForm.value;

      this.voluntariadosService.crearVoluntariado(data).subscribe({
        next: () => {
          alert('Voluntariado registrado correctamente');
          this.router.navigate(['/voluntariados']);
        },
        error: (error) => {
          console.error('Error al crear voluntariado:', error);
          if (error.status === 401) {
            console.error('No autorizado. Redirigiendo al inicio de sesión.');
            this.router.navigate(['/login']);
          } else {
            alert('Ocurrió un error al registrar el voluntariado.');
          }
        },
      });
    } else {
      alert('Por favor, complete todos los campos obligatorios.');
    }
  }

  onCancel(): void {
    this.router.navigate(['/voluntariados']);
  }
}
