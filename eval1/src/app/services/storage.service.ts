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

  async remove(key: string){
    if(this._storage){
      await this._storage.remove(key);
    }
  }

  async isEmpty(){
    if(this._storage){
      const keys = await this._storage.keys();
      return keys.length === 0;
    }
    return true;
  }

  async checkIfUserExists(email:string){
    if(this._storage){
      const users: UserModel[] = await this._storage.get('users') || [];
      return users.some(u => u.email === email);
    }
    return false;
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
  async savePerritos(perritos: TodoItem[]): Promise<void> {
    if (this._storage) {
      await this._storage.set('perritos', perritos);
    }
  }
}
