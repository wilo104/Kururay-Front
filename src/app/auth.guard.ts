import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    // Verificar si el usuario está autenticado (por ejemplo, verificar si hay un token en localStorage)
    const token = localStorage.getItem('token');

    if (token) {
      // El usuario está autenticado, permitir el acceso a la ruta del dashboard
      return true;
    } else {
      // El usuario no está autenticado, redirigir al componente de inicio de sesión
      this.router.navigate(['/login']);
      return false;
    }
  }
}