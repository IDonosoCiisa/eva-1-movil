import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { UserModel } from '../models/user.model';
import {IonButton, IonContent, IonHeader, IonInput, IonTitle, IonToolbar} from '@ionic/angular/standalone';
import {FormsModule} from "@angular/forms";
import * as bcrypt from "bcryptjs";



@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonToolbar, IonTitle, IonInput, IonButton, FormsModule]
})
export class AuthComponent  {
  loginEmail: string = '';
  loginPassword: string = '';


  constructor(private storageService: StorageService, private router: Router) {}

  async login() {
    const users: UserModel[] = await this.storageService.get('users') || [];
    const user = users.find(u => u.email === this.loginEmail);
    if (user && await bcrypt.compare(this.loginPassword, user.password)) {
      await this.storageService.set('currentUser', user);
      await this.router.navigate(['/home']);
    } else {
      alert('Invalid credentials');
      this.loginEmail = '';
      this.loginPassword = '';
    }
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
