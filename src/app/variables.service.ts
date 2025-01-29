import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VariablesService {
  private apiUrl = 'https://kururayback-app-a1f8360c6979.herokuapp.com/variables-sistema'; // URL del api
  
  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    let token = null;
    if (typeof window !== 'undefined' && window.localStorage) {
      token = localStorage.getItem('token'); // Recupera el token si es posible
    }

    if (!token) {
      throw new Error('Token no disponible');
    }

    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  obtenerVariables(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  registrarVariable(variable: any): Observable<any> {
    console.log(`${this.apiUrl}/registro`, variable);
    return this.http.post(`${this.apiUrl}/registro`, variable, { headers: this.getHeaders() });
  }

  cambiarEstadoVariable(id: number, estado: string): Observable<any> {
    const url = `${this.apiUrl}/${id}/estado`;
    return this.http.put(url, { nuevoEstado: estado }, { headers: this.getHeaders() });
  }

  obtenerVariablePorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  actualizarVariable(id: number, variable: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, variable, { headers: this.getHeaders() });
  }

  obtenerValoresPorNombre(nombre: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/valores`, { params: { nombre }, headers: this.getHeaders() });
  }
}
