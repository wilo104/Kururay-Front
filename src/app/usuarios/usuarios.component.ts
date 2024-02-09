import { Component} from '@angular/core';
import { UsuarioService } from '../usuario-service.service'; // Importa el servicio de usuario aquí

import { CommonModule } from '@angular/common';
import { LayoutComponent } from "../layout/layout.component";
import { NgxPaginationModule } from 'ngx-pagination';
import { Router, RouterOutlet } from '@angular/router';
@Component({
    selector: 'app-usuarios',
    standalone: true,
    providers: [UsuarioService],
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.css'],
    imports: [CommonModule, LayoutComponent,NgxPaginationModule,RouterOutlet]
})
export class UsuariosComponent {
nuevoUsuario() {
  this.router.navigate(['/registro']); // Asegúrate de que la ruta '/registro' esté configurada en tu módulo de rutas

}
cambiarEstado(usuario: any) {
  const nuevoEstado = usuario.estado_usuario ? 'baja' : 'alta';
  this.usuarioService.cambiarEstadoUsuario(usuario.id, nuevoEstado).subscribe(
    (response) => {
      console.log('Estado del usuario cambiado exitosamente:', response);
      usuario.estado_usuario = !usuario.estado_usuario; // Actualizar el estado del usuario en el arreglo local
    },
    (error) => {
      console.error('Error al cambiar el estado del usuario:', error);
      // Manejar el error adecuadamente, por ejemplo, mostrar un mensaje de error al usuario
    }
  );
}

editarUsuario(_t23: any) {
throw new Error('Method not implemented.');
}
  p: number = 1;
  usuarios: any[] = [];
  isLoading = false;

  constructor(private usuarioService: UsuarioService,private router: Router) {}

  ngOnInit(): void {
    this.obtenerListaUsuarios();
  }

  obtenerListaUsuarios() {
    this.isLoading = true;
    this.usuarioService.obtenerUsuarios().subscribe(
      (data: any[]) => {
        this.usuarios = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al obtener la lista de usuarios:', error);
        this.isLoading = false;
      }
    );
  }
}
