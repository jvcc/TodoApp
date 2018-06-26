import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TareaService } from './tarea.service';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ListaTareasComponent } from './lista-tareas.component';


@NgModule({
  declarations: [
    AppComponent,
    ListaTareasComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],

  providers: [TareaService],
  bootstrap: [AppComponent]
})

export class AppModule { }
