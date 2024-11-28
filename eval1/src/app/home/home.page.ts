import { Component, OnInit } from '@angular/core';
import {IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput, IonImg} from '@ionic/angular/standalone';
import { TodoService } from '../services/todo.service';
import { TodoItem } from '../models/todo-item.model';
import {FormsModule} from "@angular/forms";
import {AsyncPipe, NgForOf} from "@angular/common";
import {Observable} from "rxjs";
import {CameraService} from "../services/camera.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],

  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput, FormsModule, NgForOf, AsyncPipe, IonImg],
})
export class HomePage implements OnInit {
  // @ts-ignore
  todos: Observable<TodoItem[]> = [];
  newTodoTitle: string = '';
  newTodoDescription: string = '';
  newTodoPhoto: string | undefined = '';

  constructor(private todoService: TodoService, private cameraService: CameraService) {}

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.todos = this.todoService.getAll();
  }

  async addTodo() {
    let permissions = await this.cameraService.checkCameraPermissions();
    if (this.newTodoTitle && this.newTodoDescription) {
      if (permissions) {
        this.newTodoPhoto = await this.takePhoto();
        this.todoService.add(this.newTodoTitle, this.newTodoDescription, this.newTodoPhoto).subscribe(() => {
          this.loadTodos();
        });
        this.newTodoTitle = '';
        this.newTodoDescription = '';
      }
    }
  }

  async takePhoto() {
    const image = await this.cameraService.takePhoto();
    return image.dataUrl;
  }

  removeTodo(id: number) {
    this.todoService.remove(id).subscribe(() => {
      this.loadTodos();
    });
  }
}
