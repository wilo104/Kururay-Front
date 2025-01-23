import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BenefactoresService } from '../benefactores.service';
import { RouterModule, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination'; // Para paginación

@Component({
  selector: 'app-lista-benefactores',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NgxPaginationModule],
  templateUrl: './lista-benefactores.component.html',
  styleUrls: ['./lista-benefactores.component.css'],
  providers: [BenefactoresService],
})
export class ListaBenefactoresComponent implements OnInit {
  currentPage: number = 1; // Página inicial
  benefactores: any[] = [];
  

  constructor(
    private benefactoresService: BenefactoresService,
    private router: Router // Inyección del Router para redirigir
  ) {}

  ngOnInit(): void {
    this.cargarBenefactores();
  }

  cargarBenefactores(): void {
    this.benefactoresService.obtenerBenefactores().subscribe({
      next: (data) => {
        this.benefactores = data;
        this.currentPage=1;
      },
      error: (error) => {
        console.error('Error al cargar benefactores:', error);
        Swal.fire('Error', 'No se pudieron cargar los benefactores', 'error');
      },
    });
  }

  // Redirige a la pantalla de registro de benefactores
  nuevoBenefactor(): void {
    console.log('Redirigiendo al formulario de registro');
    this.router.navigate(['/benefactores/registro']);
}

editarBenefactor(benefactor: any): void {
  this.router.navigate([`/benefactores/${benefactor.id}/editar`]);
}
onPageChange(page: number): void {
  console.log('Cambiando a la página:', page);
  this.currentPage = page;
}
}
