import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class VoluntariadosService {
  private baseUrl = 'http://localhost:3000/voluntariados';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Método para crear un voluntariado
  crearVoluntariado(data: any): Observable<any> {
    const token = this.authService.gettoken();

    if (!token) {
      return throwError('Token no disponible');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Incluye el token automáticamente
    });

    return this.http.post(this.baseUrl, data, { headers }).pipe(
      catchError((error) => {
        console.error('Error al crear voluntariado:', error);
        return throwError('Error al crear voluntariado');
      })
    );
  }

  getVoluntariado(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(`${this.baseUrl}/${id}`, { headers }).pipe(
      catchError((error) => {
        console.error('Error al obtener voluntariado:', error);
        return throwError(error);
      })
    );
  }

  updateVoluntariado(id: number, data: any): Observable<any> {
    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado en localStorage
    if (!token) {
      return throwError('Token no disponible');
    }
  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  
    return this.http.put(`${this.baseUrl}/${id}`, data, { headers }).pipe(
      catchError((error) => {
        console.error('Error al actualizar voluntariado:', error);
        return throwError('Error al actualizar voluntariado');
      })
    );
  }
  
  cambiarEstadoAlta(id: number, estadoAlta: boolean): Observable<any> {
    const body = { estado_alta: estadoAlta };
    return this.http.patch(`${this.baseUrl}/${id}/estado-alta`, body);
}

aprobarVoluntariado(id: number): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
  });

  return this.http.post(`${this.baseUrl}/${id}/aprobar`, {}, { headers });
}

  


}
