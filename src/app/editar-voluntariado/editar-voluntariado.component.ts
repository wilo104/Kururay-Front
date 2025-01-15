import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VoluntariadosService } from '../voluntariados.service';
import Swal from 'sweetalert2';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, formatDate } from '@angular/common';
import { VariablesService } from '../variables.service';

@Component({
  selector: 'app-editar-voluntariado',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './editar-voluntariado.component.html',
  styleUrls: ['./editar-voluntariado.component.css'],
  providers: [VoluntariadosService, VariablesService],
})
export class EditarVoluntariadoComponent implements OnInit {
  voluntariadoForm!: FormGroup;
  voluntariadoId!: number;
  tiposVoluntariado: string[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private variablesService: VariablesService,
    private router: Router,
    private voluntariadosService: VoluntariadosService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      Swal.fire('Error', 'ID de voluntariado no proporcionado.', 'error');
      this.router.navigate(['/voluntariados']);
      return;
    }

    this.voluntariadoId = +id; // Convierte el ID a número
    this.crearFormulario();
    this.cargarTiposVoluntariado();
  }

  crearFormulario(): void {
    this.voluntariadoForm = this.fb.group({
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
      presupuestoInicial: [''],
      aliados: [''],
    });
  }

  cargarTiposVoluntariado(): void {
    this.variablesService.obtenerValoresPorNombre('TIPO_VOLUNTARIADO').subscribe({
      next: (tipos) => {
        this.tiposVoluntariado = tipos;
        this.cargarVoluntariado(); // Cargar los datos del voluntariado después de cargar los tipos
      },
      error: () => {
        Swal.fire('Error', 'No se pudieron cargar los tipos de voluntariado.', 'error');
        this.router.navigate(['/voluntariados']);
      },
    });
  }

  cargarVoluntariado(): void {
    this.voluntariadosService.getVoluntariado(this.voluntariadoId).subscribe({
      next: (voluntariado) => {
        console.log('Datos recibidos del voluntariado:', voluntariado); // Depuración
        console.log('Tipos disponibles:', this.tiposVoluntariado);
  
        if (voluntariado) {
          // Convertir fechas al formato 'yyyy-MM-dd' requerido por el campo date
          const fechaInicio = voluntariado.fecha_inicio
            ? formatDate(voluntariado.fecha_inicio, 'yyyy-MM-dd', 'en')
            : '';
          const fechaFin = voluntariado.fecha_cierre_proyectada
            ? formatDate(voluntariado.fecha_cierre_proyectada, 'yyyy-MM-dd', 'en')
            : '';
  
          // Asegurarse de que el tipo coincida independientemente de mayúsculas/minúsculas
          const tipoSeleccionado = this.tiposVoluntariado.find(
            (tipo) => tipo.toUpperCase() === voluntariado.tipo.toUpperCase()
          ) || '';
  
          // Asegurar que todos los campos tengan valores por defecto si están vacíos
          this.voluntariadoForm.patchValue({
            nombre: voluntariado.nombre || '',
            tipo: tipoSeleccionado,
            fecha_inicio: fechaInicio,
            fecha_fin: fechaFin,
            objetivoGeneral: voluntariado.objetivo_general || '',
            objetivoEspecifico1: voluntariado.objetivo_especifico1 || '',
            objetivoEspecifico2: voluntariado.objetivo_especifico2 || '',
            objetivoEspecifico3: voluntariado.objetivo_especifico3 || '',
            objetivoEspecifico4: voluntariado.objetivo_especifico4 || '',
            objetivoEspecifico5: voluntariado.objetivo_especifico5 || '',
            publicoObjetivo: voluntariado.publico_objetivo || '',
            beneficiariosDirectos: voluntariado.beneficiarios_directos || '',
            beneficiariosIndirectos: voluntariado.beneficiarios_indirectos || '',
            presupuestoInicial: voluntariado.presupuesto_inicial || '',
            aliados: voluntariado.aliados || '',
          });
        } else {
          Swal.fire('Error', 'Voluntariado no encontrado.', 'error');
          this.router.navigate(['/voluntariados']);
        }
      },
      error: () => {
        Swal.fire('Error', 'No se pudo cargar el voluntariado.', 'error');
        this.router.navigate(['/voluntariados']);
      },
    });
  }
  
  

  guardar(): void {
    if (this.voluntariadoForm.invalid) {
      Swal.fire('Error', 'Completa todos los campos obligatorios.', 'error');
      return;
    }

    console.log('Datos enviados al servidor:', this.voluntariadoForm.value);

    this.voluntariadosService.updateVoluntariado(this.voluntariadoId, this.voluntariadoForm.value).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Voluntariado actualizado correctamente.', 'success');
        this.router.navigate(['/voluntariados']);
        this.cargarVoluntariado();
      },
      error: (error) => {
        console.error('Error al realizar la solicitud:', error);
        Swal.fire('Error', error.error?.message || 'No se pudo actualizar el voluntariado.', 'error');
      },
    });
  }

  cancelar(): void {
    this.router.navigate(['/voluntariados']);
  }
}
