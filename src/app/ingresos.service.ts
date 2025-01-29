import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IngresosService {
  private apiUrl = 'https://kururayback-app-a1f8360c6979.herokuapp.com/ingresos';
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

  listarIngresos(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  registrarIngreso(data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.apiUrl}`, data, { headers });
  }

  editarIngreso(id: number, data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${this.apiUrl}/${id}`, data, { headers });
  }

  obtenerIngreso(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers });
  }

  obtenerBenefactores(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>('https://kururayback-app-a1f8360c6979.herokuapp.com/benefactores', { headers });
  }

  listarVoluntariados(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(this.voluntariadoUrl, { headers });
  }

  asignarVoluntariado(data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.apiUrl}/asignar-voluntariado`, data, { headers });
  }

  obtenerProductosPorIngreso(ingresoId: number): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/${ingresoId}/productos`, { headers });
  }

  registrarProducto(ingresoId: number, data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.apiUrl}/${ingresoId}/productos`, data, { headers });
  }

  editarProducto(ingresoId: number, productoId: number, data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${this.apiUrl}/${ingresoId}/productos/${productoId}`, data, { headers });
  }

  obtenerProducto(ingresoId: number, productoId: number): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}/${ingresoId}/productos/${productoId}`;
    return this.http.get<any>(url, { headers });
  }
}
