import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, combineLatest, Subscription } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
} from 'rxjs/operators';
import { Restaurant } from '../models/Restaurant.model';
import { RestaurantService } from './restaurant.service';

export type RestaurantData = {
  id: string;
  name: string;
  type: RestaurantType;
  image: any;
  latitude: string;
  longitude: string;
};

export enum RestaurantType {
  FAST_FOOD = 'FAST_FOOD',
  VEGETARIAN = 'VEGETARIAN',
}

export const restaurantTypes = [
  { key: RestaurantType.FAST_FOOD, value: 'Fast Food' },
  { key: RestaurantType.VEGETARIAN, value: 'Vegetarian' },
];

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss'],
})
export class RestaurantComponent implements OnInit, OnDestroy {
  restaurantForm: FormGroup;
  selectedFile = null;

  restaurantTypes = restaurantTypes;

  dataSource: MatTableDataSource<Restaurant>;
  restaurants: Restaurant[] = [];

  restaurantsSub: Subscription;

  searchTerm$ = new BehaviorSubject<string>('');
  filterByType$ = new BehaviorSubject<RestaurantType>(RestaurantType.FAST_FOOD);

  constructor(private restaurantService: RestaurantService) {
    this.dataSource = new MatTableDataSource<Restaurant>();
  }

  ngOnInit(): void {
    this.restaurantForm = new FormGroup({
      name: new FormControl(null),
      type: new FormControl(RestaurantType.FAST_FOOD),
      coordinate: new FormControl(null),
    });

    this.restaurantsSub = combineLatest([this.searchTerm$, this.filterByType$])
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(([term, type]) =>
          this.restaurantService.getRestaurants(term, type)
        ),
        map((data: RestaurantData[]) => {
          return data.map((data) => ({
            id: data.id,
            name: data.name,
            type: restaurantTypes.find(type => type.key === data.type).value,
            image: data.image,
            coordinate: `${data.latitude},${data.longitude}`,
          }));
        })
      )
      .subscribe((restaurantsData) => {
        this.restaurants = restaurantsData;
        this.dataSource.data = restaurantsData;
      });
  }

  addRestaurant() {
    const coordinate = this.restaurantForm.value.coordinate.split(',');

    const postData = {
      id: this.restaurantForm.value.name,
      name: this.restaurantForm.value.name,
      type: this.restaurantForm.value.type,
      image: this.selectedFile,
      latitude: coordinate[0],
      longitude: coordinate[1],
    };

    this.restaurantService
      .postRestaurant(postData)
      .subscribe((responseData: RestaurantData) => {
        this.restaurants.push({
          id: responseData.name,
          name: responseData.name,
          image: responseData.image,
          type: restaurantTypes.find(type => type.key === responseData.type).value,
          coordinate: `${responseData.latitude},${responseData.longitude}`,
        });

        this.dataSource.data = this.restaurants;
        this.restaurantForm.reset();
        this.selectedFile = null;
      });
  }

  filterByName(event: KeyboardEvent) {
    this.searchTerm$.next(event.target['value']);
  }

  filterByType(type: RestaurantType) {
    this.filterByType$.next(type);
  }

  deleteRestaurant(restaurantId: string) {
    this.restaurantService.deleteRestaurant(restaurantId).subscribe(() => {
      this.restaurants = this.restaurants.filter(
        (data) => data.id !== restaurantId
      );
      this.dataSource.data = this.restaurants;
    });
  }

  onFileChanged(event) {
    const file = event.target.files[0];

    if (file && file.type.match('image.*')) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.selectedFile = reader.result;
      };
    }
  }

  ngOnDestroy() {
    this.restaurantsSub.unsubscribe();
  }
}
