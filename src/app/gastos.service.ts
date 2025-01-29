import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GastosService {
  private apiUrl = 'https://kururayback-app-a1f8360c6979.herokuapp.com'; // Cambia según tu API
  private voluntariadoUrl = 'https://kururayback-app-a1f8360c6979.herokuapp.com/voluntariados';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    let token = null;

    if (typeof window !== 'undefined' && window.localStorage) {
      token = localStorage.getItem('token');
    }

    if (!token) {
      throw new Error('Token no disponible');
    }

    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  listarGastos(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/gastos`, { headers });
  }

  registrarGasto(data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.apiUrl}/gastos`, data, { headers });
  }

  listarVoluntariados(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(this.voluntariadoUrl, { headers });
  }

  editarGasto(id: number, data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${this.apiUrl}/gastos/${id}`, data, { headers });
  }

  obtenerGasto(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}/gastos/${id}`, { headers });
  }

  obtenerGastoPorId(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}/gastos/${id}`, { headers });
  }

  actualizarGasto(id: number, data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.apiUrl}/gastos/${id}`, data, { headers });
  }
}
