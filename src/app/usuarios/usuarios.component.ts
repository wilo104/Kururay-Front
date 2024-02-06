import { Component} from '@angular/core';
import { UsuarioService } from '../usuario-service.service'; // Importa el servicio de usuario aquí

import { CommonModule } from '@angular/common';
import { LayoutComponent } from "../layout/layout.component";
import { NgxPaginationModule } from 'ngx-pagination';
@Component({
    selector: 'app-usuarios',
    standalone: true,
    providers: [UsuarioService],
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.css'],
    imports: [CommonModule, LayoutComponent,NgxPaginationModule]
})
export class UsuariosComponent {
cambiarEstado(_t23: any) {
throw new Error('Method not implemented.');
}
editarUsuario(_t23: any) {
throw new Error('Method not implemented.');
}
  p: number = 1;
  usuarios: any[] = [];
  isLoading = false;

  constructor(private usuarioService: UsuarioService) {}

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
