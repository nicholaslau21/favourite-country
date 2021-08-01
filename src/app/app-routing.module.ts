import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryDetailsComponent } from './country/country-details/country-details.component';
import { CountryComponent } from './country/country.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'country',
    pathMatch: 'full'
  },
  {
    path: 'country',
    component: CountryComponent,
  },
  {
    path: 'country/:id',
    component: CountryDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
