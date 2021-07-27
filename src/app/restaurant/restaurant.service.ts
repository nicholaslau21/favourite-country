import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestaurantData, RestaurantType } from './restaurant.component';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  constructor(private http: HttpClient) {}

  getRestaurants(filterTerm = '', type = null) {
    let url = 'http://localhost:4200/api/restaurants?name_like=' + filterTerm;

    if (type) {
      url += '&type_like=' + type;
    }

    return this.http.get(url);
  }

  postRestaurant(postData: RestaurantData) {
    return this.http.post('http://localhost:4200/api/restaurants', postData);
  }

  deleteRestaurant(restaurantId: string) {
    return this.http.delete(
      'http://localhost:4200/api/restaurants/' + restaurantId
    );
  }
}
