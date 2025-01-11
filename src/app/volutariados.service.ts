import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VoluntariadosService {
  private baseUrl = 'http://localhost:3000/voluntariados';
  
  constructor(private http: HttpClient, private authService: AuthService) {}

  getVoluntariados(): Observable<any> {
    const token = this.authService.gettoken();  // Asegúrate de que el token se obtiene correctamente
    console.log('Token:', token);
    
    if (!token) {
      return throwError('Token no disponible');  // Maneja el error si no hay token
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,  // Usa el token correctamente
    });

    return this.http.get(this.baseUrl, { headers }).pipe(
      catchError(error => {
        console.error('Error en la solicitud de voluntariados', error);
        return throwError('Error al obtener los voluntariados');
      })
    );
  }
}
