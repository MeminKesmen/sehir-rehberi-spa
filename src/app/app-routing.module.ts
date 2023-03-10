import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityAddComponent } from './city/city-add/city-add.component';
import { CityDetailComponent } from './city/city-detail/city-detail.component';
import { CityComponent } from './city/city.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path:"city",component:CityComponent},
  {path:"cityDetail/:cityId",component:CityDetailComponent},
  {path:"cityAdd",component:CityAddComponent},
  {path:"register",component:RegisterComponent},
  {path:"**",redirectTo:"city",pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
