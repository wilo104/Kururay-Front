import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem('token');
      const claveDni = localStorage.getItem('clave_dni') === 'true';
      const userId = localStorage.getItem('id');
      const routeId = route.params['id'];
  
      if (token) {
        // Permitir acceso a "actualizar-clave" solo para el usuario correcto
        if (route.url.some(segment => segment.path === 'actualizar-clave')) {
          if (userId === routeId) {
            return true; // Permitir acceso
          } else {
            this.router.navigate(['/dashboard']);
            return false;
          }
        }
  
        // Bloquear acceso a otras rutas si clave_dni es true
        if (claveDni) {
          this.router.navigateByUrl(`/usuarios/${userId}/actualizar-clave`);
          return false;
        }
  
        return true; // Permitir acceso
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    } else {
      // Si no se puede acceder a localStorage, redirigir a la página de login
      this.router.navigate(['/login']);
      return false;
    }
  }
}
