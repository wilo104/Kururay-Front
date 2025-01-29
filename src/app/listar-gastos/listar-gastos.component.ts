import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GastosService } from '../gastos.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-listar-gastos',
    imports: [CommonModule], // Asegúrate de que CommonModule esté importado
    templateUrl: './listar-gastos.component.html',
    styleUrls: ['./listar-gastos.component.css'],
    providers: [GastosService] // Asegúrate de que el servicio esté en los providers
})
export class ListarGastosComponent implements OnInit {
  gastos: any[] = []; // Lista de gastos a mostrar

  constructor(private gastosService: GastosService, private router: Router) {}

  ngOnInit(): void {
    this.obtenerGastos(); // Llama al método para cargar los gastos al inicializar el componente
  }

  obtenerGastos(): void {
    this.gastosService.listarGastos().subscribe({
      next: (data) => {
        this.gastos = data; // Asigna los datos a la lista de gastos
      },
      error: (err) => {
        console.error('Error al obtener los gastos:', err);
        Swal.fire('Error', 'No se pudo cargar la lista de gastos.', 'error');
      },
    });
  }

  registrarGasto(): void {
    this.router.navigate(['/contabilidad-financiera/gastos/registrar']); // Navega a la pantalla de registro
  }

  editarGasto(gastoId: number): void {
    this.router.navigate([`/contabilidad-financiera/gastos/${gastoId}/editar`]); // Navega a la pantalla de edición con el ID del gasto
  }
}
