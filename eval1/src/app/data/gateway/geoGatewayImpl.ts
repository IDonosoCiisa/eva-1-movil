import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {map, Observable} from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GeoGatewayImpl {

  private apiUrl = `${environment.geoApiUrl}`

  constructor(private http: HttpClient) {}

  getDirection(long: string, lat: string): Observable<string> {
    const url = `${this.apiUrl}?lat=${lat}&lon=${long}&format=json`;
    return this.http.get<any>(url).pipe(
      map(response => response.display_name || 'No address found')
    );
  }
}
