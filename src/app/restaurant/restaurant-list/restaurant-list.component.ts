import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RestaurantType, restaurantTypes } from '../restaurant.component';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss'],
})
export class RestaurantListComponent implements OnInit {
  @Input()
  dataSource;

  @Output()
  nameFilterChanged = new EventEmitter<string>();
  @Output()
  typeFilterChanged = new EventEmitter<RestaurantType>();
  @Output()
  delete = new EventEmitter();

  displayedColumns: string[] = [
    'name',
    'type',
    'image',
    'coordinate',
    'actions',
  ];

  restaurantTypes = restaurantTypes;

  constructor() {}

  ngOnInit(): void {}
}
