import { Tarea } from './tarea';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

@Injectable()
export class TareaService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: Http) { }

  getTareas():  Promise<Tarea[]> {
    return this.http.get(this.baseUrl + '/api/tareas/')
      .toPromise()
      .then(response => response.json() as Tarea[])
      .catch(this.handleError);
  }

  crearTarea(datosTarea: Tarea): Promise<Tarea> {
    return this.http.post(this.baseUrl + '/api/tareas/', datosTarea)
      .toPromise().then(response => response.json() as Tarea)
      .catch(this.handleError);
  }

  actualizarTarea(datosTarea: Tarea): Promise<Tarea> {
    return this.http.put(this.baseUrl + '/api/tareas/' + datosTarea.id, datosTarea)
      .toPromise()
      .then(response => response.json() as Tarea)
      .catch(this.handleError);
  }

  borrarTarea(id: string): Promise<any> {
    return this.http.delete(this.baseUrl + '/api/tareas/' + id)
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }
}