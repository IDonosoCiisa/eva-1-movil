import {Component, OnInit} from '@angular/core';
import {IonButton, IonContent, IonHeader, IonImg, IonInput, IonTitle, IonToolbar} from '@ionic/angular/standalone';
import {TodoService} from '../services/todo.service';
import {TodoItem} from '../models/todo-item.model';
import {FormsModule} from "@angular/forms";
import {AsyncPipe, NgForOf} from "@angular/common";
import {Observable} from "rxjs";
import {CameraService} from "../services/camera.service";
import {GeoService} from "../services/geo.service";
import {Position} from "@capacitor/geolocation";

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
  newTodoPosition: Position | undefined;
  newTodoDirection: string | undefined;

  constructor(private todoService: TodoService, private cameraService: CameraService, private geoService: GeoService) {}

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
        this.newTodoPosition = await this.geoService.getLocalization();
        this.newTodoDirection =  await this.geoService.getDirection(this.newTodoPosition.coords.longitude.toString(), this.newTodoPosition.coords.latitude.toString());
        console.log(this.newTodoDirection);
        this.todoService.add(this.newTodoTitle, this.newTodoDescription, this.newTodoPhoto, this.newTodoDirection).subscribe(() => {
          this.loadTodos();
          this.newTodoTitle = '';
          this.newTodoDescription = '';
        });
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
