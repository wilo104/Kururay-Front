import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeneficiariosService } from '../beneficiarios.service';
import { Router } from '@angular/router'; 
import { NgxPaginationModule } from 'ngx-pagination';
@Component({
  selector: 'app-lista-beneficiarios',
  standalone: true,
  imports: [CommonModule,NgxPaginationModule],
  templateUrl: './lista-beneficiarios.component.html',
  styleUrls: ['./lista-beneficiarios.component.css'],
  providers:[BeneficiariosService]
})
export class ListaBeneficiariosComponent implements OnInit {
  beneficiarios: any[] = [];
  p: number = 1;
  constructor(
    private beneficiariosService: BeneficiariosService,
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.cargarBeneficiarios();
  }

  cargarBeneficiarios(): void {
    this.beneficiariosService.obtenerBeneficiarios().subscribe((data) => {
      this.beneficiarios = data;
    });
  }
    // Redirige al formulario de nuevo beneficiario
    nuevoBeneficiario(): void {
      this.router.navigate(['/beneficiarios/nuevo']);
    }
  
    // Redirige al formulario de edición de beneficiario con el ID correspondiente
    editarBeneficiario(id: number): void {
      this.router.navigate([`/beneficiarios/${id}/editar`]);
    }

    onPageChange(page: number): void {
      console.log('Cambiando a la página:', page); // Depuración
      this.p = page;
    }
    
}
