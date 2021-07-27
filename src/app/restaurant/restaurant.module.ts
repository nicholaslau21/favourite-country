import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { RestaurantService } from './restaurant.service';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { RestaurantComponent } from './restaurant.component';
import { MatSelectModule } from '@angular/material/select';
import { RestaurantDetailsComponent } from './restaurant-list/restaurant-details/restaurant-details.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [RestaurantComponent, RestaurantListComponent, RestaurantDetailsComponent],
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatSelectModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [RestaurantComponent],
  providers: [RestaurantService],
})
export class RestaurantModule {}
