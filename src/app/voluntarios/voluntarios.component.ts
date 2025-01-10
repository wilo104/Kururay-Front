import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VoluntariosService } from '../voluntarios.service';
import { UsuarioService } from '../usuario-service.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-voluntarios',
  standalone: true,
  providers: [VoluntariosService],
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './voluntarios.component.html',
  styleUrls: ['./voluntarios.component.css'],
})
export class VoluntariosComponent {
restauraracceso(_t46: any) {
throw new Error('Method not implemented.');
}
  voluntarios: any[] = [];
  isLoading = false;
  p: number = 1;
  direccionOrden: any;
  ordenActual: string | undefined;
  UsuarioService: any;
  usuarios: any;

  constructor(private voluntariosService: VoluntariosService ,private router: Router) {}

  ngOnInit(): void {
    this.obtenerListaVoluntarios();
  }

  obtenerListaVoluntarios(): void {
    this.isLoading = true;
    this.voluntariosService.getVoluntarios().subscribe(
      (data: any[]) => {
        this.voluntarios = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al obtener la lista de voluntarios:', error);
        this.isLoading = false;
      }
    );
  }

  // Método para cambiar el estado del voluntario
  cambiarEstadoVoluntario(voluntario: any): void {
    const nuevoEstado = voluntario.estado_voluntario ? 'Inactivo' : 'Activo';
    this.voluntariosService.cambiarEstadoVoluntario(voluntario.id, nuevoEstado).subscribe(
      (response) => {
        // Actualiza el estado del voluntario en la lista local
        voluntario.estado_voluntario = !voluntario.estado_voluntario;
      },
      (error) => {
        console.error('Error al cambiar el estado del voluntario:', error);
      }
    );
  }

  obtenerListaUsuarios(ordenPor: string, direccion: string): void {
    this.isLoading = true;
    this.UsuarioService.obtenerUsuarios(ordenPor, direccion).subscribe(
      (usuarios: any) => {
        this.usuarios = usuarios;
        this.isLoading = false;
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
    this.UsuarioService.obtenerCVUsuario(usuario.id).subscribe(
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

  cambiarEstado(usuario: any) {
    const nuevoEstado = usuario.estado_usuario ? 'baja' : 'alta';
    this.voluntariosService.cambiarEstadoUsuario(usuario.id, nuevoEstado).subscribe(
      (response: any) => {
        console.log('Estado del usuario cambiado exitosamente:', response);
        usuario.estado_usuario = !usuario.estado_usuario; // Actualizar el estado del usuario en el arreglo local
      },
      (error: any) => {
        console.error('Error al cambiar el estado del usuario:', error);
      }
    );
  }

  editarUsuario(usuario: any) {
    this.router.navigate([`/usuarios/${usuario.id}/editar`]);
  }

}
