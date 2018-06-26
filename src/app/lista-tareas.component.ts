import { Component, Input, OnInit } from '@angular/core';
import { TareaService } from './tarea.service';
import { Tarea } from './tarea';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'lista-tareas',
  templateUrl: './lista-tareas.component.html'
})

export class ListaTareasComponent implements OnInit {
  tareas: Tarea[];
  nuevaTarea: Tarea = new Tarea();
  editing = false;
  editingTodo: Tarea = new Tarea();

  constructor(
    private tareaService: TareaService,
  ) {}

  ngOnInit(): void {
    this.getTareas();
  }

  getTareas(): void {
    this.tareaService.getTareas()
      .then(tareas => this.tareas = tareas);
  }

  crearTarea(todoForm: NgForm): void {
    this.tareaService.crearTarea(this.nuevaTarea)
      .then(crearTarea => {
        todoForm.reset();
        this.nuevaTarea = new Tarea();
        this.tareas.unshift(crearTarea);
      });
  }

  borrarTarea(id: string): void {
    this.tareaService.borrarTarea(id)
    .then(() => {
      this.tareas = this.tareas.filter(tarea => tarea.id !== id);
    });
  }

  actualizarTarea(datosTarea: Tarea): void {
    console.log(datosTarea);
    this.tareaService.actualizarTarea(datosTarea)
    .then(updatedTodo => {
      let existingTodo = this.tareas.find(tarea => tarea.id === updatedTodo.id);
      Object.assign(existingTodo, updatedTodo);
      this.limpiarEdicion();
    });
  }

  marcarRealizada(datosTarea: Tarea): void {
    datosTarea.realizada = !datosTarea.realizada;
    this.tareaService.actualizarTarea(datosTarea)
    .then(updatedTodo => {
      let existingTodo = this.tareas.find(tarea => tarea.id === updatedTodo.id);
      Object.assign(existingTodo, updatedTodo);
    });
  }

  editarTarea(datosTarea: Tarea): void {
    this.editing = true;
    Object.assign(this.editingTodo, datosTarea);
  }

  limpiarEdicion(): void {
    this.editingTodo = new Tarea();
    this.editing = false;
  }
}