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
    const token = this.authService.gettoken(); // Asegúrate de que el token se obtiene correctamente
    console.log('Token:', token);
    
    if (!token) {
      return throwError('Token no disponible'); // Maneja el error si no hay token
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Usa el token correctamente
    });

    return this.http.get(this.baseUrl, { headers }).pipe(
      catchError(error => {
        console.error('Error en la solicitud de voluntariados', error);
        return throwError('Error al obtener los voluntariados');
      })
    );
  }

  crearVoluntariado(data: any): Observable<any> {
    const token = this.authService.gettoken(); // Obtén el token del servicio de autenticación
    console.log('Token:', token);
  
    if (!token) {
      return throwError('Token no disponible'); // Maneja el error si el token no existe
    }
  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Configura el encabezado
    });
  
    return this.http.post(`${this.baseUrl}`, data, { headers }).pipe(
      catchError(error => {
        console.error('Error en la creación de voluntariado:', error);
        return throwError('Error al crear el voluntariado');
      })
    );
  }
  

  getVoluntariado(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      return throwError('No se encontró el token.');
    }
  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  
    return this.http.get(`${this.baseUrl}/${id}`, { headers }).pipe(
      catchError((error) => {
        console.error('Error al obtener voluntariado:', error);
        return throwError('Error al cargar los datos.');
      })
    );
  }
  
  
  updateVoluntariado(id: number, data: any): Observable<any> {
    const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local
  
    if (!token) {
      console.error('Token no encontrado.');
      return throwError('No se encontró el token de autenticación.');
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
  
    return this.http.put(`${this.baseUrl}/${id}`, data, { headers }).pipe(
      catchError((error) => {
        console.error('Error al realizar la solicitud:', error);
        return throwError(error);
      })
    );
  }
  


}
