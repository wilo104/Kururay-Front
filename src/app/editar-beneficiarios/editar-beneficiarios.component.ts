import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { BeneficiariosService } from '../beneficiarios.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-editar-beneficiarios',
    templateUrl: './editar-beneficiarios.component.html',
    styleUrls: ['./editar-beneficiarios.component.css'],
    imports: [FormsModule, CommonModule],
    providers: [BeneficiariosService]
})
export class EditarBeneficiariosComponent implements OnInit {
  beneficiario: any = {
    tipo: '',
    nombre: '',
    direccion: '',
    telefono: '',
    email: '',
    genero: '',
    edad: null,
    representante: '',
    ruc: '',
    dni: '',
    comentarios: '',
  };

  esPersona: boolean = false;
  esComunidad: boolean = false;
  esOrganizacion: boolean = false;

  constructor(
    private beneficiariosService: BeneficiariosService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cargarBeneficiario(id);
    }
  }

  cargarBeneficiario(id: string): void {
    this.beneficiariosService.obtenerBeneficiarioPorId(+id).subscribe({
      next: (data) => {
        this.beneficiario = data;
        this.onTipoChange(); // Actualiza las variables para mostrar los campos relevantes
      },
      error: (error) => {
        console.error('Error al cargar beneficiario:', error);
        Swal.fire('Error', 'No se pudo cargar el beneficiario', 'error');
        this.router.navigate(['/beneficiarios']);
      },
    });
  }

  onTipoChange(): void {
    this.esPersona = this.beneficiario.tipo === 'Persona';
    this.esComunidad = this.beneficiario.tipo === 'comunidad';
    this.esOrganizacion = this.beneficiario.tipo === 'organizacion';
  }

  actualizarBeneficiario(): void {
    this.beneficiariosService.actualizarBeneficiario(this.beneficiario.id, this.beneficiario).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Beneficiario actualizado correctamente', 'success');
        this.router.navigate(['/beneficiarios']);
      },
      error: (error) => {
        console.error('Error al actualizar beneficiario:', error);
        Swal.fire('Error', 'No se pudo actualizar el beneficiario', 'error');
      },
    });
  }

  cancelar(): void {
    this.router.navigate(['/beneficiarios']);
  }
}
