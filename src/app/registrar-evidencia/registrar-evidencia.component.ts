import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VoluntariadosService } from '../voluntariados.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
@Component({
    selector: 'app-registrar-evidencia',
    imports: [CommonModule, FormsModule],
    templateUrl: './registrar-evidencia.component.html',
    styleUrls: ['./registrar-evidencia.component.css'],
    providers: [VoluntariadosService, HttpClient]
})
export class RegistrarEvidenciaComponent implements OnInit {
  idVoluntariado!: number;
  porcentajeParticipacion: number = 0;
  asistenciaVoluntarios: number = 0;
  // Objeto para almacenar los datos del formulario
  evidencia = {
    fecha_evidencia: '',
    descripcion: '',
    incidentes: '',
    asistencia_mentores: 0,
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private voluntariadosService: VoluntariadosService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // Captura el ID del voluntariado desde la URL
    this.idVoluntariado = +this.route.snapshot.paramMap.get('id')!;
    if (!this.idVoluntariado) {
      Swal.fire('Error', 'No se encontró el voluntariado.', 'error');
      this.router.navigate(['/voluntariados']);
    }else{
      this.obtenerCalculos();
    }
  }

  obtenerCalculos(): void {
    this.voluntariadosService.obtenerCalculosEvidencia(this.idVoluntariado).subscribe({
      next: (response: any) => {
        this.porcentajeParticipacion = response.porcentajeParticipacion;
        this.asistenciaVoluntarios = response.asistenciaVoluntarios;
      },
      error: (err) => {
        console.error('Error al obtener cálculos:', err);
        Swal.fire('Error', 'No se pudieron cargar los cálculos.', 'error');
      },
    });
  }
  
  guardar(): void {
    if (!this.evidencia.fecha_evidencia.trim()) {
      Swal.fire('Error', 'La fecha de la evidencia es obligatoria.', 'error');
      return;
    }
    if (!this.evidencia.descripcion.trim()) {
      Swal.fire('Error', 'La descripción es obligatoria.', 'error');
      return;
    }
    if (!this.evidencia.incidentes.trim()) {
      Swal.fire('Error', 'Debe proporcionar información sobre incidentes.', 'error');
      return;
    }
    if (this.evidencia.asistencia_mentores <= 0) {
      Swal.fire('Error', 'Debe ingresar la asistencia de mentores.', 'error');
      return;
    }
  
    const payload = {
      ...this.evidencia,
      porcentaje_participacion: this.porcentajeParticipacion,
      asistencia_voluntarios: this.asistenciaVoluntarios,
    };
  
    console.log(payload); // Verifica qué estás enviando
  
    this.voluntariadosService
      .registrarEvidencia(this.idVoluntariado, payload)
      .subscribe({
        next: () => {
          Swal.fire('Éxito', 'Evidencia registrada correctamente.', 'success');
          this.router.navigate([`/voluntariados/${this.idVoluntariado}/detalle`]);
        },
        error: (err) => {
          console.error('Error al registrar evidencia:', err);
          Swal.fire('Error', 'No se pudo registrar la evidencia.', 'error');
        },
      });
  }
  

  cancelar(): void {
    this.router.navigate([`/voluntariados/${this.idVoluntariado}/detalle`]);
  }
  
  
}
