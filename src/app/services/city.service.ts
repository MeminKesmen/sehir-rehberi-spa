import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { City } from '../models/city';
import { Photo } from '../models/photo';
import { AlertifyService } from './alertify.service';

@Injectable()
export class CityService {
  path = 'https://localhost:7067/api/cities/';
  constructor(private httpClient: HttpClient,private alertifyService:AlertifyService,private router:Router) {}
  getCities(): Observable<City[]> {
    return this.httpClient.get<City[]>(this.path + 'GetCities');
  }
  getCityById(cityId: number): Observable<City> {
    return this.httpClient.get<City>(this.path + 'GetCity/' + cityId);
  }
  getPhotosByCity(cityId: number): Observable<Photo[]> {
    return this.httpClient.get<Photo[]>(this.path + 'GetPhotosByCity/' + cityId);
  }
  add(city:any)
  {
    this.httpClient.post<City>(this.path+"add",city).subscribe(data=>{
      this.alertifyService.success("Şehir eklendi");
      this.router.navigateByUrl("/cityDetail/"+data.cityId);
    });
  }
}
