import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VoluntariosService } from '../voluntarios.service';
import { NotificationService } from '../notificaciones.service';
import { VariablesService } from '../variables.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-registro-voluntario',
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './registro-voluntario.component.html',
    styleUrls: ['./registro-voluntario.component.css'],
    providers: [VoluntariosService, NotificationService, VariablesService]
})
export class RegistroVoluntarioComponent implements OnInit {
  registroForm!: FormGroup;
  areas: string[] = [];
  situaciones: string[] = [];
  carreras: string[] = [];
  categorias: string[] = [];
  file: File | null = null;

  constructor(
    private fb: FormBuilder,
    private voluntariosService: VoluntariosService,
    private notificationService: NotificationService,
    public router: Router,
    private variablesService: VariablesService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.cargarValores('AREA');
    this.cargarValores('SITUACION');
    this.cargarValores('CARRERA');
    this.cargarValores('CATEGORIA');
  }

  initializeForm(): void {
    this.registroForm = this.fb.group({
      dni: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      nombre: ['', [Validators.required]],
      apellido_paterno: ['', [Validators.required]],
      apellido_materno: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]], // Campo mapeado
      fecha_nacimiento: ['', [Validators.required]],
      area: ['', [Validators.required]],
      situacion: ['', [Validators.required]],
      carrera: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      cv: [null],
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.file = file;
    } else {
      this.file = null;
      if (file) {
        alert('Por favor, sube un archivo PDF válido.');
      }
    }
  }

  onSubmit(): void {
    if (this.registroForm.valid) {
      const formData = new FormData();
      const formValue = { ...this.registroForm.value };

      // Mapear 'telefono' a 'celular' antes de enviar
      formValue.celular = formValue.telefono;
      delete formValue.telefono; // Eliminar el campo 'telefono'

      // Agregar los campos al FormData
      Object.keys(formValue).forEach((key) => {
        formData.append(key, formValue[key]);
      });

      // Agregar el archivo CV solo si existe
      if (this.file) {
        formData.append('cv', this.file, this.file.name);
      }

      // Llamar al servicio
      this.voluntariosService.registrarVoluntario(formData).subscribe(
        () => {
          this.notificationService.showSuccess('Registro exitoso', 'El voluntario ha sido registrado.');
          this.router.navigate(['/voluntarios']);
        },
        (error) => {
          console.error('Error en el registro:', error);
          this.notificationService.showError(
            'Error en el registro',
            error.error?.message || 'Error al registrar el voluntario.'
          );
        }
      );
    } else {
      this.notificationService.showError('Formulario inválido', 'Complete todos los campos requeridos correctamente.');
    }
  }

  cargarValores(nombreVariable: string): void {
    this.variablesService.obtenerValoresPorNombre(nombreVariable).subscribe({
      next: (valores) => {
        if (nombreVariable === 'AREA') {
          this.areas = valores;
        } else if (nombreVariable === 'SITUACION') {
          this.situaciones = valores;
        } else if (nombreVariable === 'CARRERA') {
          this.carreras = valores;
        } else if (nombreVariable === 'CATEGORIA') {
          this.categorias = valores;
        }
      },
      error: (error) => console.error(`Error al cargar ${nombreVariable}:`, error),
    });
  }
}
