import { Component, OnInit, HostListener } from '@angular/core';
import { RouterModule, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { AuthGuard } from '../auth.guard';

@Component({
  selector: 'app-layout',
  standalone: true,
  providers: [AuthService, AuthGuard],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  imports: [RouterOutlet, CommonModule, RouterModule], // Elimina HttpClientModule de aquí
})
export class LayoutComponent implements OnInit {
  sidebarActive: boolean = true;
  sidebarCollapsed: boolean = false; // Estado comprimido del sidebar
  tipo_usuario: string | null | undefined;
  token: string | null | undefined;
  id: string | null | undefined;
  nombreUsuario: string | null = null; // Propiedad para el nombre del usuario

  // Propiedad para manejar el estado del dropdown del submenú "Contabilidad Financiero"
  financieroSubmenuOpen: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.tipo_usuario = this.authService.gettipo_usuario();
    this.token = this.authService.gettoken();
    this.id = this.authService.getid_usuario();
    this.checkScreenWidth(); // Comprueba el tamaño de la pantalla al iniciar
    this.nombreUsuario = this.authService.getNombreUsuario();
  }

  // Escucha los cambios de tamaño de la ventana y ajusta el estado del sidebar
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

  // Alternar el estado del sidebar
  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  // Alternar el estado del dropdown del submenú "Contabilidad Financiero"
  toggleFinancieroSubmenu() {
    this.financieroSubmenuOpen = !this.financieroSubmenuOpen;
  }

  // Manejar el dropdown del menú superior (usuario)
  dropdownOpen: boolean = false;

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  // Cerrar sesión
  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
