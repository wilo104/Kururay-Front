import { Component, OnInit, HostListener } from '@angular/core';
import { RouterModule, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { AuthGuard } from '../auth.guard';
import { UsuariosComponent } from "../usuarios/usuarios.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  providers: [AuthService, AuthGuard],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  imports: [RouterOutlet, CommonModule, HttpClientModule, RouterModule]
})
export class LayoutComponent implements OnInit {
  sidebarActive: boolean = true;
  sidebarCollapsed: boolean = false; // Propiedad para controlar el estado comprimido
  tipo_usuario: string | null | undefined;
  token: string | null | undefined;
  id: string | null | undefined;

  nombreUsuario: string | null = null; // Declarar la propiedad
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.tipo_usuario = this.authService.gettipo_usuario();
    this.token = this.authService.gettoken();
    this.id = this.authService.getid_usuario();
    this.checkScreenWidth(); // Comprueba el tamaño de la pantalla al iniciar
    this.nombreUsuario = this.authService.getNombreUsuario();
  }

  // Escucha los cambios de tamaño de la ventana y ajusta el estado sidebarCollapsed
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenWidth();
  }

  // Comprueba el ancho de la pantalla para ajustar el estado del sidebar
  checkScreenWidth() {
    if (window.innerWidth <= 768) {
      this.sidebarCollapsed = true;
    } else {
      this.sidebarCollapsed = false;
    }
  }

  toggleSidebar() {
    // Alternar el estado del sidebar
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

}
