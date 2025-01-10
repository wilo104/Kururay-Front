import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VariablesService {
  private apiUrl = 'http://localhost:3000/variables-sistema'; // URL del api
  constructor(private http: HttpClient) { }

  obtenerVariables(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  registrarVariable(variable: any): Observable<any> {
    console.log(`${this.apiUrl}/registro`, variable)
    return this.http.post(`${this.apiUrl}/registro`, variable);
    
  }
  cambiarEstadoVariable(id: number, estado: string): Observable<any> {
    const url = `${this.apiUrl}/${id}/estado`; // Construye la URL correctamente
    return this.http.put(url, { nuevoEstado: estado }); // Utiliza PUT en lugar de PATCH si el backend lo espera así
  }
  obtenerVariablePorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  actualizarVariable(id: number, variable: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, variable);
  }
  
  obtenerValoresPorNombre(nombre: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/valores`, { params: { nombre } });
  }



}
