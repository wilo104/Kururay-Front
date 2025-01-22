import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VoluntariosService {
  private apiUrl = 'http://localhost:3000/voluntarios';

  constructor(private http: HttpClient) {}
  // Método para obtener el token desde localStorage
  private obtenerToken(): string | null {
    return localStorage.getItem('token'); // Recupera el token almacenado
  }
  // Obtener la lista de voluntarios
  obtenerVoluntarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Obtener voluntarios no asignados
  obtenerVoluntariosNoAsignados(): Observable<any[]> {
    const url = `${this.apiUrl}/voluntariados/voluntarios/no-asignados`;
    return this.http.get<any[]>(url);
  }

  // Registrar un voluntario
  registrarVoluntario(voluntario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro`, voluntario);
  }

  // Cambiar el estado de un voluntario
  cambiarEstadoVoluntario(id: number, nuevoEstado: string): Observable<any> {
    const url = `${this.apiUrl}/${id}/estado`;
    return this.http.put(url, { nuevoEstado });
  }

  // Obtener historial de un voluntario
  obtenerHistorialVoluntario(id: number, token: string): Observable<any> {
    const url = `${this.apiUrl}/${id}/historial`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(url, { headers });
  }

  // Obtener feedback de un voluntariado
  obtenerFeedback(voluntarioId: number): Observable<any> {
    const token = this.obtenerToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Agrega el token al encabezado
    });
    const url = `${this.apiUrl}/${voluntarioId}/feedback`; // Ajusta la URL
    return this.http.get(url, { headers });
  }
  
  obtenerCVVoluntario(id: number): Observable<Blob> {
    const url = `${this.apiUrl}/${id}/cv`;
    return this.http.get(url, { responseType: 'blob' });
  }
  
  // Obtener voluntario por ID
  obtenerVoluntarioPorId(id: number): Observable<any> {
    const token = this.obtenerToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Agrega el token a las cabeceras
    });
    const url = `${this.apiUrl}/${id}`;
    return this.http.get(url, { headers });
  }

  // Editar un voluntario
  editarVoluntario(id: number, voluntario: FormData): Observable<any> {
    const token = this.obtenerToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Agrega el token a las cabeceras
    });
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, voluntario, { headers });
  }
  
    obtenerValoresPorNombre(nombre: string): Observable<string[]> {
      const url = `http://localhost:3000/variables-sistema/valores?nombre=${nombre}`;
      return this.http.get<string[]>(url);
    }
    
    eliminarFeedback(feedbackId: number): Observable<any> {
      const token = this.obtenerToken();
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.http.delete(`${this.apiUrl}/feedback/${feedbackId}`, { headers });
    }
    
    
    registrarFeedback(feedback: any): Observable<any> {
      const token = this.obtenerToken();
      const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
      });
  
      return this.http.post(`${this.apiUrl}/feedback`, feedback, { headers });
  }
   
  obtenerFeedbackPorId(feedbackId: number): Observable<any> {
    const token = this.obtenerToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`${this.apiUrl}/feedback/${feedbackId}`, { headers });
  }
  
  editarFeedback(feedbackId: number, feedback: any): Observable<any> {
    const token = this.obtenerToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.put(`${this.apiUrl}/feedback/${feedbackId}`, feedback, { headers });
  }
  


    


}

