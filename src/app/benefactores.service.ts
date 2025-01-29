import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service'; // Asegúrate de tener un servicio AuthService

@Injectable({
  providedIn: 'root',
})
export class BenefactoresService {
  private apiUrl = 'https://kururayback-app-a1f8360c6979.herokuapp.com/benefactores'; // Base URL para benefactores

  constructor(private http: HttpClient, private authService: AuthService) {}

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
   * Obtener la lista de benefactores
   * @returns Observable con la lista de benefactores
   */
  obtenerBenefactores(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}`, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          console.error('Error al obtener benefactores:', error);
          return throwError('Error al obtener benefactores');
        })
      );
  }

  /**
   * Obtener un benefactor por su ID
   * @param id ID del benefactor
   * @returns Observable con el benefactor
   */
  obtenerBenefactorPorId(id: number): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          console.error('Error al obtener benefactor:', error);
          return throwError('Error al obtener benefactor');
        })
      );
  }

  /**
   * Registrar un nuevo benefactor
   * @param benefactor Datos del benefactor
   * @returns Observable con la respuesta del servidor
   */
  registrarBenefactor(benefactor: any): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}`, benefactor, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          console.error('Error al registrar benefactor:', error);
          return throwError('Error al registrar benefactor');
        })
      );
  }

  /**
   * Actualizar un benefactor existente
   * @param id ID del benefactor
   * @param benefactor Datos actualizados del benefactor
   * @returns Observable con la respuesta del servidor
   */
  actualizarBenefactor(id: number, benefactor: any): Observable<any> {
    return this.http
      .put<any>(`${this.apiUrl}/${id}`, benefactor, {
        headers: this.getHeaders(),
      })
      .pipe(
        catchError((error) => {
          console.error('Error al actualizar benefactor:', error);
          return throwError('Error al actualizar benefactor');
        })
      );
  }

  /**
   * Eliminar un benefactor por su ID
   * @param id ID del benefactor
   * @returns Observable con la respuesta del servidor
   */
  eliminarBenefactor(id: number): Observable<any> {
    return this.http
      .delete<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          console.error('Error al eliminar benefactor:', error);
          return throwError('Error al eliminar benefactor');
        })
      );
  }
}
