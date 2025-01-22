import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service'; // Asegúrate de tener un servicio AuthService

@Injectable({
  providedIn: 'root',
})
export class BeneficiariosService {
  private baseUrl = 'http://localhost:3000/beneficiarios'; // Base URL para beneficiarios

  constructor(private http: HttpClient, private authService: AuthService) {}

  /**
   * Obtener encabezados con token de autenticación
   * @returns HttpHeaders
   */
  private getHeaders(): HttpHeaders {
    const token = this.authService.gettoken(); // Obtén el token del AuthService

    if (!token) {
      throw new Error('Token no disponible'); // Lanza un error si el token no está disponible
    }

    return new HttpHeaders({
      Authorization: `Bearer ${token}`, // Agrega el token al encabezado
    });
  }

  /**
   * Obtener la lista de beneficiarios
   * @returns Observable con la lista de beneficiarios
   */
  obtenerBeneficiarios(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.baseUrl}`, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          console.error('Error al obtener beneficiarios:', error);
          return throwError('Error al obtener beneficiarios');
        })
      );
  }

  /**
   * Obtener un beneficiario por su ID
   * @param id ID del beneficiario
   * @returns Observable con el beneficiario
   */
  obtenerBeneficiarioPorId(id: number): Observable<any> {
    return this.http
      .get<any>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          console.error('Error al obtener beneficiario:', error);
          return throwError('Error al obtener beneficiario');
        })
      );
  }

  /**
   * Registrar un nuevo beneficiario
   * @param beneficiario Datos del beneficiario
   * @returns Observable con la respuesta del servidor
   */
  registrarBeneficiario(beneficiario: any): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}`, beneficiario, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          console.error('Error al registrar beneficiario:', error);
          return throwError('Error al registrar beneficiario');
        })
      );
  }

  /**
   * Actualizar un beneficiario existente
   * @param id ID del beneficiario
   * @param beneficiario Datos actualizados del beneficiario
   * @returns Observable con la respuesta del servidor
   */
  actualizarBeneficiario(id: number, beneficiario: any): Observable<any> {
    return this.http
      .put<any>(`${this.baseUrl}/${id}`, beneficiario, {
        headers: this.getHeaders(),
      })
      .pipe(
        catchError((error) => {
          console.error('Error al actualizar beneficiario:', error);
          return throwError('Error al actualizar beneficiario');
        })
      );
  }

  /**
   * Eliminar un beneficiario por su ID
   * @param id ID del beneficiario
   * @returns Observable con la respuesta del servidor
   */
  eliminarBeneficiario(id: number): Observable<any> {
    return this.http
      .delete<any>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          console.error('Error al eliminar beneficiario:', error);
          return throwError('Error al eliminar beneficiario');
        })
      );
  }
}
