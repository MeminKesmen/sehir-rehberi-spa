import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { City } from 'src/app/models/city';
import { CityService } from 'src/app/services/city.service';

import { Photo } from 'src/app/models/photo';
@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.component.html',
  styleUrls: ['./city-detail.component.css'],
  providers: [CityService],
})
export class CityDetailComponent implements OnInit {
  constructor(
    private cityService: CityService,
    private activatedRoute: ActivatedRoute
  ) {}
  city!: City;

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) =>
      this.getCityById(params['cityId'])
    );
  }
  getCityById(cityId: number) {
    this.cityService.getCityById(cityId).subscribe((data) => {
      this.city = data;
      console.log("city:::: ",this.city);
      
    });
  }
  getPhotosByCity(cityId: number) {
    this.cityService.getPhotosByCity(cityId).subscribe((data) => {
      this.city.photos = data;
    });
  }
}
