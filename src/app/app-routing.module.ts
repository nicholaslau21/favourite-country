import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantDetailsComponent } from './restaurant/restaurant-list/restaurant-details/restaurant-details.component';
import { RestaurantComponent } from './restaurant/restaurant.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'restaurant',
    pathMatch: 'full'
  },
  {
    path: 'restaurant',
    component: RestaurantComponent,
  },
  {
    path: 'restaurant/:id',
    component: RestaurantDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
