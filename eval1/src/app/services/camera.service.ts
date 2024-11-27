import {Injectable} from '@angular/core';
import {Camera, CameraResultType, CameraSource, Photo} from '@capacitor/camera';

@Injectable({
  providedIn: 'root',
})
export class CameraService {
  constructor() {}

  async takePhoto(): Promise<Photo> {
    return await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });
  }
}
