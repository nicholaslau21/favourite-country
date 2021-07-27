import { RestaurantType } from "../restaurant/restaurant.component";

export class Restaurant {
  constructor(public id: string, public name: string, public type: string, public image: any, public coordinate: string) {}
}
