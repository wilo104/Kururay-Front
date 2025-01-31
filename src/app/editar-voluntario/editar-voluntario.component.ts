import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VoluntariosService } from '../voluntarios.service';
import Swal from 'sweetalert2';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-editar-voluntario',
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './editar-voluntario.component.html',
    styleUrls: ['./editar-voluntario.component.css'],
    providers: [VoluntariosService]
})
export class EditarVoluntarioComponent implements OnInit {
  editarForm!: FormGroup;
  voluntarioId!: number;
  areas: string[] = [];
  situaciones: string[] = [];
  carreras: string[] = [];
  categorias: string[] = [];
  file: File | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private voluntariosService: VoluntariosService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.voluntarioId = +this.route.snapshot.paramMap.get('id')!; // Obtén el ID del URL
    this.initializeForm();
    this.cargarDatosVoluntario();
    this.cargarValores('AREA');
    this.cargarValores('SITUACION');
    this.cargarValores('CARRERA');
    this.cargarValores('CATEGORIA');
  }

  initializeForm(): void {
    this.editarForm = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido_paterno: ['', [Validators.required]],
      apellido_materno: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      celular: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      fecha_nacimiento: ['', [Validators.required]],
      area: ['', [Validators.required]],
      situacion: ['', [Validators.required]], // Se mapea a grado_instruccion
      categoria: ['', [Validators.required]],
      carrera: ['', [Validators.required]],
    });
  }

  cargarValores(nombreVariable: string): void {
    this.voluntariosService.obtenerValoresPorNombre(nombreVariable).subscribe({
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
      error: (error) => {
        console.error(`Error al cargar ${nombreVariable}:`, error);
      },
    });
  }

  cargarDatosVoluntario(): void {
    const id = this.route.snapshot.params['id'];
    this.voluntariosService.obtenerVoluntarioPorId(id).subscribe({
      next: (voluntario) => {
        // Mapear datos
        if (voluntario.grado_instruccion) {
          voluntario.situacion = voluntario.grado_instruccion; // Mapeo de la BD al formulario
        }

        if (voluntario.celular) {
          voluntario.celular = voluntario.celular; // Mapear celular a telefono
        }

        if (voluntario.fecha_nacimiento) {
          const fecha = new Date(voluntario.fecha_nacimiento);
          voluntario.fecha_nacimiento = fecha.toISOString().split('T')[0]; // Formato yyyy-MM-dd
        }

        this.editarForm.patchValue(voluntario); // Llena el formulario con los datos recibidos
        console.log('Datos cargados en el formulario:', this.editarForm.value);
      },
      error: (error) => {
        console.error('Error al cargar datos del voluntario:', error);
        Swal.fire('Error', 'No se pudieron cargar los datos del voluntario.', 'error');
      },
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.file = file;
    } else {
      this.file = null;
      Swal.fire('Error', 'Por favor, selecciona un archivo PDF válido.', 'error');
    }
  }

  onSubmit(): void {
    if (this.editarForm.valid) {
      const formData = new FormData();
      const voluntarioData = { ...this.editarForm.value };

      // Mapear situacion a grado_instruccion antes de enviar
      voluntarioData.grado_instruccion = voluntarioData.situacion;
      delete voluntarioData.situacion;
     console.log(voluntarioData.fecha_nacimiento)
   

      Object.keys(voluntarioData).forEach((key) => {
        formData.append(key, voluntarioData[key]);
      });

      if (this.file) {
        formData.append('cv', this.file, this.file.name);
      }

      this.voluntariosService.editarVoluntario(this.voluntarioId, formData).subscribe(
        () => {
          Swal.fire('Éxito', 'Voluntario actualizado correctamente.', 'success');
          this.router.navigate(['/voluntarios']);
        },
        (error) => {
          console.error('Error al actualizar voluntario:', error);
          Swal.fire('Error', 'No se pudo actualizar el voluntario.', 'error');
        }
      );
    } else {
      console.log('Errores en el formulario:', this.editarForm.controls);
      Swal.fire('Error', 'Completa correctamente todos los campos.', 'error');
    }
  }
}
