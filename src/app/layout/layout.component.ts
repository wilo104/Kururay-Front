import { Component, OnInit } from '@angular/core';
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
  styleUrls: ['./layout.component.css'], // Asegúrate de que sea 'styleUrls' en plural
  imports: [RouterOutlet, CommonModule, HttpClientModule, UsuariosComponent, RouterModule]
})
export class LayoutComponent implements OnInit {
  sidebarActive: boolean = true;

  toggleSidebar() {
    this.sidebarActive = !this.sidebarActive;
  }

  tipo_usuario: string | null = "";
  token: string | null = "";

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.tipo_usuario = this.authService.gettipo_usuario();
    this.token = this.authService.gettoken();
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}