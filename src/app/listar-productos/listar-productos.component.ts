import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { IngresosService } from '../ingresos.service';

@Component({
  selector: 'app-listar-productos',
  standalone: true,
  imports: [CommonModule], // Agrega CommonModule a los imports
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css'],
  providers:[IngresosService]
})
export class ListarProductosComponent implements OnInit {
  productos: any[] = [];
  ingresoId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ingresosService: IngresosService
  ) {}

  ngOnInit(): void {
    this.ingresoId = +this.route.snapshot.paramMap.get('id')!;
    console.log('Ingreso ID:', this.ingresoId); // Verifica el valor capturado
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.ingresosService.obtenerProductosPorIngreso(this.ingresoId).subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
      },
    });
  }

  regresar(): void {
    this.router.navigate(['contabilidad-financiera/ingresos']);
  }

  registrarProducto(): void {
   
      this.router.navigate([`/contabilidad-financiera/ingresos/${this.ingresoId}/productos/registrar`]);
    }
  
    editarProducto(productoId: number): void {
      this.router.navigate([
        `/contabilidad-financiera/ingresos/${this.ingresoId}/productos/${productoId}/editar`,
      ]);
    }
    
  
  
  
}
