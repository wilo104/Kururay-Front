import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class VoluntariadosService {
  private baseUrl = 'http://localhost:3000/voluntariados';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.gettoken();
    if (!token) {
      throw new Error('Token no disponible');
    }
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getVoluntariados(): Observable<any> {
    return this.http.get(this.baseUrl, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        console.error('Error en la solicitud de voluntariados:', error);
        return throwError('Error al obtener los voluntariados');
      })
    );
  }

  crearVoluntariado(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, data, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        console.error('Error en la creación de voluntariado:', error);
        return throwError('Error al crear el voluntariado');
      })
    );
  }

  getVoluntariado(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        console.error('Error al obtener voluntariado:', error);
        return throwError('Error al cargar los datos.');
      })
    );
  }

  updateVoluntariado(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        console.error('Error al realizar la solicitud:', error);
        return throwError('Error al actualizar el voluntariado');
      })
    );
  }
  getVoluntariosNoAsignados(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/voluntarios/no-asignados`, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        console.error('Error al obtener voluntarios no asignados:', error);
        return throwError('Error al cargar voluntarios no asignados.');
      })
    );
  }
  
  asignarVoluntario(idVoluntariado: number, idVoluntario: number): Observable<any> {
    const token = localStorage.getItem('token'); // Obtén el token del almacenamiento
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // Agrega el token al encabezado
    });
  
    return this.http.post(`${this.baseUrl}/voluntarios/asignar`, {
      id_voluntariado: idVoluntariado,
      id_voluntario: idVoluntario
    }, { headers });
  }
 
      // Obtener voluntarios asignados
  getVoluntariosAsignados(idVoluntariado: number): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.baseUrl}/${idVoluntariado}/voluntarios`, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          console.error('Error al obtener voluntarios asignados:', error);
          return throwError('Error al cargar voluntarios asignados.');
        })
      );
  }

  // Desasignar un voluntario
  desasignarVoluntario(idVoluntariado: number, idVoluntario: number): Observable<any> {
    return this.http
      .delete(`${this.baseUrl}/${idVoluntariado}/voluntarios/${idVoluntario}`, {
        headers: this.getHeaders(),
      })
      .pipe(
        catchError((error) => {
          console.error('Error al desasignar voluntario:', error);
          return throwError('Error al intentar desasignar al voluntario.');
        })
      );
  }



  cambiarEstadoVoluntariado(id: number, estado: string): Observable<any> {
    const url = `${this.baseUrl}/${id}/estado`;
  
    // Obtener el token desde tu sistema de almacenamiento (localStorage, por ejemplo)
    const token = localStorage.getItem('token'); // O ajusta según dónde guardes el token
    const estadoBooleano = estado === 'activo';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  
    return this.http.put(url, { estado_voluntariado: estadoBooleano }, { headers });
  }

  getDetalleVoluntario(idVoluntario: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/voluntarios/${idVoluntario}`).pipe(
      catchError((error) => {
        console.error('Error al obtener detalle del voluntario:', error);
        return throwError('Error al cargar el detalle del voluntario.');
      })
    );
  }

  obtenerVoluntariadoPorId(id: number): Observable<any> {
    const token = localStorage.getItem('token'); // Obtén el token almacenado
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(`${this.baseUrl}/${id}`, { headers });
  }
  

  obtenerEvidencias(voluntariadoId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${voluntariadoId}/evidencias`, { headers: this.getHeaders() }).pipe(
      tap((data) => console.log('Evidencias recibidas:', data)),
      catchError((error) => {
        console.error('Error al obtener evidencias:', error);
        return throwError('Error al cargar evidencias.');
      })
    );
  }

  obtenerAsistencias(voluntariadoId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${voluntariadoId}/asistencias`, { headers: this.getHeaders() }).pipe(
      tap((data) => console.log('Asistencias recibidas:', data)),
      catchError((error) => {
        console.error('Error al obtener asistencias:', error);
        return throwError('Error al cargar asistencias.');
      })
    );
  }



}
