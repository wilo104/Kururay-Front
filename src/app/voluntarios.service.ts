import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VoluntariosService {
  private apiUrl = 'http://localhost:3000/voluntarios'; // URL del backend
  private apiurl2= 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient) {}

  // Obtener la lista de voluntarios
  getVoluntarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Registrar un voluntario
  registrarVoluntario(voluntario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro`, voluntario);
  }

  // Cambiar el estado de un voluntario
  cambiarEstadoVoluntario(id: number, estado: string): Observable<any> {
    const url = `${this.apiUrl}/${id}/estado`;
    return this.http.put(url, { nuevoEstado: estado });
  }

  // Obtener un voluntario por su ID
  obtenerVoluntarioPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Actualizar la información de un voluntario
  actualizarVoluntario(id: number, voluntario: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, voluntario);
  }

  cambiarEstadoUsuario(id: number, estado: string): Observable<any> {
    const url = `${this.apiurl2}/${id}/estado`; // Construye la URL correctamente
    return this.http.put(url, { nuevoEstado: estado }); // Utiliza PUT en lugar de PATCH si el backend lo espera así
  }

  getHistorialVoluntario(id: number,tokens: string | null): Observable<any> {
    const token = tokens // Obtén el token desde localStorage (ajústalo si usas otro método)
    //console.log(token);
    const url = `${this.apiUrl}/${id}/historial`; // Construye la URL para obtener el historial
    
    // Configurar los encabezados con el token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    // Realizar la solicitud GET con el token en los encabezados
    return this.http.get(url, { headers });
  }
  getFeedback(voluntariadoId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${voluntariadoId}/feedback`);
  }
  

}
