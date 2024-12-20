import {Injectable} from '@angular/core';
import {Storage} from "@ionic/storage-angular";
import {UserModel} from '../models/user.model';
import * as bcrypt from 'bcryptjs';
import {TodoItem} from "../models/todo-item.model";
@Injectable({
  providedIn: 'root'
})
export class StorageService {
   private _storage: Storage | null = null;

  constructor(private storage : Storage) {
    this.init();
  }
  async init(){
    this._storage = await this.storage.create();
  }

  async set(key: string, value: any){
    if(this._storage){
      await this._storage.set(key, value);
    }
  }

  async get(key: string){
    if(this._storage){
      return await this._storage.get(key);
    }
  }

  public async registerUser(email: string, password: string, firstName: string, lastName: string): Promise<boolean> {
    if (this._storage) {
      const users: UserModel[] = await this._storage.get('users') || [];
      const userExists = users.some(u => u.email === email);

      if (userExists) {
        return false;
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user: UserModel = { email, password: hashedPassword, firstName, lastName };
      users.push(user);
      await this._storage.set('users', users);
      return true;
    }
    return false;
  }
  async isLoggedIn(): Promise<boolean> {
    const user = await this.get('currentUser');
    return !!user;
  }

  async logout() {
    await this.set('currentUser', null);
  }
}
