import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrl = 'http://localhost:3000/usuarios'; // URL base del backend para usuarios

  constructor(private http: HttpClient) {}

  // Obtener la lista de usuarios con opciones de ordenamiento
  obtenerUsuarios(ordenPor: string = 'id', direccion: string = 'ASC'): Observable<any[]> {
    const params = new HttpParams()
      .set('ordenPor', ordenPor)
      .set('direccion', direccion);
    return this.http.get<any[]>(this.apiUrl, { params });
  }

  // Cambiar el estado de un usuario (activo/inactivo)
  cambiarEstadoUsuario(id: number, nuevoEstado: string): Observable<any> {
    const url = `${this.apiUrl}/${id}/estado`;
    return this.http.put(url, { nuevoEstado });
  }

  // Obtener detalles de un usuario por ID
  obtenerUsuarioPorId(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  // Actualizar la información de un usuario
  actualizarUsuario(id: number, usuario: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, usuario);
  }

  // Actualizar la contraseña de un usuario
  actualizarContrasena(id: number, contrasenaActual: string, nuevaContrasena: string): Observable<any> {
    const url = `${this.apiUrl}/${id}/cambiar-contrasena`;
    return this.http.put(url, { contrasenaActual, nuevaContrasena });
  }

  // Registrar un nuevo usuario con opción de cargar un archivo CV
  registrarUsuario(usuario: any, cvFile?: File): Observable<any> {
    const formData = new FormData();
    Object.keys(usuario).forEach((key) => {
      formData.append(key, usuario[key]);
    });
    if (cvFile) {
      formData.append('cv', cvFile, cvFile.name);
    }
    return this.http.post(`${this.apiUrl}/registro`, formData);
  }

  // Obtener el CV de un usuario por ID
  obtenerCVUsuario(id: number): Observable<Blob> {
    const url = `${this.apiUrl}/${id}/cv`;
    return this.http.get(url, { responseType: 'blob' });
  }
}
