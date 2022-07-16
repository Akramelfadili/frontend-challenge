import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { JsonData } from 'src/app/interfaces/templates';
import { data_path } from 'src/assets/utils/utils';

@Injectable({
  providedIn: 'root'
})

//app service
export class AppService {
  constructor(
    private http_client : HttpClient
  ) { }
  
  // get the volumes
  getDataVolumes (volume_name: string): Observable<JsonData[]> {
    return this.http_client.get<JsonData[]>(`${data_path}/${volume_name}`)
      .pipe(
         map(res => res)
      );
  }
}
