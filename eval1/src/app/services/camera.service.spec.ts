import {TestBed, fakeAsync, tick, flush} from '@angular/core/testing';
import { CameraService } from './camera.service';
import { Camera, Photo } from '@capacitor/camera';
import {defineCustomElements} from "@ionic/pwa-elements/loader";

describe('CameraService', () => {
  let service: CameraService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [CameraService]
    }).compileComponents();
    await defineCustomElements(window);
    service = TestBed.inject(CameraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check camera permissions', async () => {
    spyOn(Camera, 'checkPermissions').and.returnValue(Promise.resolve({ photos: 'granted', camera: 'granted' }));
    spyOn(Camera, 'requestPermissions').and.returnValue(Promise.resolve({ photos: 'granted', camera: 'granted' }));

    const result = await service.checkCameraPermissions();
    expect(result).toBeTrue();
  });

});
