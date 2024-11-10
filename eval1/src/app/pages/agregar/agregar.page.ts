import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonButton } from '@ionic/angular/standalone';
import {Router} from '@angular/router';
import {ListarProductosPage} from '../listar/listar.page';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonInput, IonButton]
})
export class AgregarPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  //Funcion para cambiar de pagina
  goToListar(){
    this.router.navigate(['/listar'])
  }
  anadirProducto(){
    ListarProductosPage nombre=new ListarProductosPage()

  }

}
