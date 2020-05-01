import { Injectable } from '@angular/core';
import { LightRestaurant } from 'src/app/shared/models/restaurant-light-model';
import { of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Booking } from 'src/app/shared/models/booking-models';

const API = 'https://booking-restaurant.herokuapp.com/burger/v1/'
@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private http: HttpClient
  ) { }

  getAllRestaurants() {
    return this.http.get( API + 'restaurants')
  }
  getRestaurant(id: number) {
    return this.http.get(API + 'restaurant'+ '/'+ id)
  }
  createReservation(booking: Booking) {
    return this.http.post(API + 'reservation', booking)
  }
  cancelReservation(reservationCode: string) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.delete(API + 'deleteReservation?locator='+ reservationCode, options)
  }

  getAllRestaurantsMock() {
    const restaurants: LightRestaurant[] = []
    let restaurant = new LightRestaurant()
    restaurant.address = 'Gran Via 123';
    restaurant.id =  1
    restaurant.image = "https://cdn.pixabay.com/photo/2015/03/26/10/07/restaurant-690975_960_720.jpg"
    restaurant.name = "Restaurante de David"

    const restaurant2: LightRestaurant = {
      address: "Gran Rambla 145",
      id: 2,
      image: "https://cdn.pixabay.com/photo/2018/09/23/21/13/restaurant-3698548_960_720.jpg",
      name: "Restaurante de Juan"
    }
    restaurants.push(restaurant)
    restaurants.push(restaurant2)

    return of(restaurants)
  }
}
