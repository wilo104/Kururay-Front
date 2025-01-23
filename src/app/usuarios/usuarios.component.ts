import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario-service.service';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Necesario para directivas comunes como *ngIf
import { NgxPaginationModule } from 'ngx-pagination'; // Asumiendo que usas este módulo para la paginación

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers: [UsuarioService], // Define el servicio si es específico de este componente
  imports: [CommonModule, NgxPaginationModule], // Importa los módulos necesarios aquí
  standalone: true,
})
export class UsuariosComponent implements OnInit {
restauraracceso(_t54: any) {
throw new Error('Method not implemented.');
}
  p: number = 1;
  usuarios: any[] = [];
  isLoading: boolean = false;
  ordenActual: string = 'id'; // Establece el orden inicial por 'id'
  direccionOrden: string = 'ASC'; // Establece la dirección de orden inicial como ascendente

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit(): void {
    // Obtener la lista de usuarios con el orden predeterminado al iniciar
    this.obtenerListaUsuarios(this.ordenActual, this.direccionOrden);
  }

  obtenerListaUsuarios(ordenPor: string, direccion: string): void {
    this.isLoading = true;
    this.usuarioService.obtenerUsuarios(ordenPor, direccion).subscribe(
      (usuarios: any[]) => {
        this.usuarios = usuarios;
        this.isLoading = false;
        console.log(usuarios);
      },
      (error: any) => {
        console.error('Error al obtener la lista de usuarios:', error);
        this.isLoading = false;
      }
    );
  }

  ordenarPor(propiedad: string): void {
    console.log(`Ordenando por ${propiedad} en dirección ${this.direccionOrden}`);

    // Cambiar la dirección del orden si se hace clic en la misma cabecera, de lo contrario, reiniciar a 'ASC'
    if (this.ordenActual === propiedad) {
      this.direccionOrden = this.direccionOrden === 'ASC' ? 'DESC' : 'ASC';
    } else {
      this.direccionOrden = 'ASC';
    }
    this.ordenActual = propiedad;
    // Hacer una llamada al backend con el nuevo orden
    this.obtenerListaUsuarios(this.ordenActual, this.direccionOrden);
  }

  nuevoUsuario() {
    this.router.navigate(['/registro']);
  }
  verCV(usuario:any){
    this.usuarioService.obtenerCVUsuario(usuario.id).subscribe(
      (cv: Blob) => {
        // Aquí puedes manejar el Blob del CV, como descargarlo o mostrarlo en un visor
        const url = window.URL.createObjectURL(cv);
        window.open(url); // Por ejemplo, abre el CV en una nueva pestaña
      },
      (      error: any) => {
        console.error('Error al obtener el CV:', error);
        // Aquí puedes manejar el error, como mostrar un mensaje al usuario
      }
    );
  }

  cambiarEstadoUsuario(id: number, nuevoEstado: boolean): void {
    this.usuarioService.cambiarEstado(id, nuevoEstado).subscribe({
      next: (response) => {
        console.log('Estado cambiado con éxito:', response);
        this.obtenerListaUsuarios(this.ordenActual, this.direccionOrden);
      },
      error: (error) => {
        console.error('Error al cambiar el estado del usuario:', error);
        alert(`Error al cambiar el estado del usuario: ${error.error.message}`);
      },
    });
  }
  
  

  editarUsuario(usuario: any) {
    this.router.navigate([`/usuarios/${usuario.id}/editar`]);
  }
}
