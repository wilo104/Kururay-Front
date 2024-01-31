import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario-service.service'; // Asume que has creado un servicio
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-lista-usuarios',
  standalone: true,
  imports: [RouterOutlet,CommonModule,HttpClientModule,NgxPaginationModule],
  providers: [UsuarioService, HttpClient],
  templateUrl: './lista-usuarios-component.component.html',
  styleUrls: ['./lista-usuarios-component.component.css']
})
export class ListaUsuariosComponent implements OnInit {
  usuarios: any[] = []; // Este array contendrá los usuarios obtenidos del servicio
  error: string | null = null;
  p:number =1;
  itemsPerPage: number = 10;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuarioService.obtenerUsuarios().subscribe(
      (data) => {
        this.usuarios = data;
        console.log(data);
      },
      (error) => {
        this.error = error.message;
        console.error('Ocurrió un error al obtener los usuarios:', error);
      }
    );
  }

  editarUsuario(usuario: any): void {
    // Aquí iría la lógica para editar un usuario
    // Por ejemplo, abrir un modal de edición o redirigir a una ruta de edición con el ID del usuario
  }

  cambiarEstadoUsuario(usuario: any): void {
    // Aquí iría la lógica para cambiar el estado de un usuario
    // Podría implicar llamar a una función del servicio y actualizar el estado en el backend
    const nuevoEstado = usuario.estado === 'activo' ? 'inactivo' : 'activo';
    this.usuarioService.cambiarEstadoUsuario(usuario.id, nuevoEstado).subscribe(
      () => {
        usuario.estado = nuevoEstado; // Actualizar el estado en la interfaz de usuario
      },
      (error) => {
        console.error('Ocurrió un error al cambiar el estado del usuario:', error);
      }
    );
  }
}