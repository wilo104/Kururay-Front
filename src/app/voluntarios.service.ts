import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VoluntariosService {
  private apiUrl = 'https://kururayback-app-a1f8360c6979.herokuapp.com/voluntarios';

  constructor(private http: HttpClient) {}
  // Método para obtener el token desde localStorage
  private obtenerToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('token'); // Recupera el token almacenado si localStorage está disponible
    }
    return null; // Si localStorage no está disponible, retorna null
  }
  // Obtener la lista de voluntarios
  // Obtener la lista de voluntarios con paginación
  obtenerVoluntarios(): Observable<any[]> {
    const token = localStorage.getItem('token'); // O donde almacenes tu token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Asegúrate de usar el prefijo correcto
    });

    return this.http.get<any[]>(this.apiUrl, { headers });
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
// Obtener feedback de un voluntariado específico
obtenerFeedback(voluntarioId: number, voluntariadoId: number): Observable<any> {
  const token = this.obtenerToken();
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`, // Agrega el token al encabezado
  });
  const url = `${this.apiUrl}/feedback/${voluntarioId}/${voluntariadoId}`; // Ajusta la URL para incluir ambos IDs
  return this.http.get(url, { headers });
}

  obtenerFeedback_vlogueado_voluntariado(voluntarioId: number, voluntariadoId: number): Observable<any> {
    const token = this.obtenerToken();
   const headers = new HttpHeaders({
     Authorization: `Bearer ${token}`, // Agrega el token al encabezado
   });
   const url = `${this.apiUrl}/feedback/${voluntarioId}/${voluntariadoId}`;
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
      const url = `https://kururayback-app-a1f8360c6979.herokuapp.com/variables-sistema/valores?nombre=${nombre}`;
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
  

// Registrar asistencia
registrarAsistencia(asistencia: any): Observable<any> {
  const token = this.obtenerToken();
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
  });
  // Ajustamos la URL eliminando el prefijo "voluntarios" que no corresponde
  return this.http.post(`https://kururayback-app-a1f8360c6979.herokuapp.com/voluntariados/${asistencia.voluntariado_id}/asistencias`, asistencia, { headers });
}

// Obtener voluntarios asignados a un voluntariado
obtenerVoluntariosPorVoluntariado(idVoluntariado: number): Observable<any[]> {
  const token = this.obtenerToken();
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
  });
  // Ajustamos la URL eliminando el prefijo "voluntarios" que no corresponde
  return this.http.get<any[]>(`https://kururayback-app-a1f8360c6979.herokuapp.com/voluntariados/${idVoluntariado}/voluntarios`, { headers });
}

//para USUARIO UNICO LOGUEADO
obtenerInformacionVoluntario(id: number): Observable<any> {
  const token = localStorage.getItem('token'); // Obtiene el token almacenado
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
  });

  return this.http.get(`${this.apiUrl}/unico/${id}`, { headers });
}


actualizarInformacionVoluntario(id: number, datos: any): Observable<any> {
  const headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  });
  return this.http.put(`${this.apiUrl}/unico/${id}`, datos, { headers });
}   


}

