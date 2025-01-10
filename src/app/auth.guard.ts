import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    // Verificar primero si estamos en el lado del cliente
    if (typeof window !== 'undefined') {
      // Verificar si el usuario está autenticado (por ejemplo, verificar si hay un token en localStorage)
      const token = localStorage.getItem('token');

      if (token) {
        // El usuario está autenticado, permitir el acceso a la ruta
        return true;
      } else {
        // El usuario no está autenticado, redirigir al componente de inicio de sesión
        this.router.navigate(['/login']);
        console.log("esta entrando aquí pe")
        return false;
      
      }
    } else {
     // console.log("esta entrando aquí pe causa")
      // Estamos en el servidor, no podemos acceder a localStorage aquí
      // Aquí puedes decidir qué hacer en este caso, pero por defecto, podrías negar el acceso o manejarlo de otra manera
      // Por ejemplo, podrías permitir el acceso y dejar que el lado del cliente maneje la redirección si es necesario
      return true; // O false, dependiendo de tu lógica de aplicación específica
    }
  }
}