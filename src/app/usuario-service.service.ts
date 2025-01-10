import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:3000/usuarios'; // URL del api

  constructor(private http: HttpClient) {}

  // obtenerUsuarios(): Observable<any[]> {
  //   return this.http.get<any[]>(this.apiUrl);
  // }
  obtenerUsuarios(ordenPor: string = 'id', direccion: string = 'ASC'): Observable<any[]> {
    // Agregar parámetros de consulta para el ordenamiento
    let params = new HttpParams();
    params = params.append('ordenPor', ordenPor);
    params = params.append('direccion', direccion);

    return this.http.get<any[]>(this.apiUrl, { params });
  }

  cambiarEstadoUsuario(id: number, estado: string): Observable<any> {
    const url = `${this.apiUrl}/${id}/estado`; // Construye la URL correctamente
    return this.http.put(url, { nuevoEstado: estado }); // Utiliza PUT en lugar de PATCH si el backend lo espera así
  }
  obtenerUsuarioPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  actualizarUsuario(id: number, usuario: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, usuario);
  }

  actualizarContrasena(id: number, contrasenaActual: string, nuevaContrasena: string): Observable<any> {
    const url = `${this.apiUrl}/${id}/cambiar-contrasena`;
    return this.http.put(url, { contrasenaActual, nuevaContrasena });
  }
  registrarUsuario(usuario: any, cvFile?: File): Observable<any> {
    const formData = new FormData();
    // Agregar los datos del usuario al formData
    Object.keys(usuario).forEach(key => {
      formData.append(key, usuario[key]);
    });
    // Agregar el archivo CV al formData si está presente
    if (cvFile) {
      const blob = new Blob([cvFile], { type: cvFile.type });
    formData.append('cv', blob, cvFile.name);
      if (formData.has('cv')) {
        console.log('Archivo CV agregado correctamente al FormData');
      } else {
        console.error('No se agregó el archivo CV al FormData');
      }
    }

    return this.http.post(`${this.apiUrl}/registro`, formData);
  }

  obtenerCVUsuario(id: number): Observable<Blob> {
    const url = `${this.apiUrl}/${id}/cv`; // Construye la URL para obtener el CV
    return this.http.get(url, { responseType: 'blob' });
  }

  // Otros métodos relacionados con los usuarios...
}
