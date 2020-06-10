import { Component, OnInit, ViewChild } from '@angular/core';

import { AppService } from 'src/app/services/app.service';
import { ActivatedRoute } from '@angular/router';
import { BookingFormComponent } from 'src/app/components/booking/booking-form/booking-form.component';
import { Restaurant } from 'src/app/shared/models/restaurant-model';


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
// Decorador: Función que permitirá la manipulación o retorno de datos. 
// Identificamos un decorador en angular por su sintaxis: @nombreDecorador
// @ViewChild(selector) nombreDePropiedad: TipoDePropiedad
  
  @ViewChild(BookingFormComponent) bookingForm: BookingFormComponent
  private idRestaurant: number
  public restaurant = new Restaurant()
  constructor(
    private service: AppService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.idRestaurant = Number(this.route.snapshot.paramMap.get('id'))
    this.getRestaurant()
  }
  getRestaurant() {
    this.service.getRestaurant(this.idRestaurant).subscribe((result:any)=> {
      this.bookingForm.restaurant = result.data
      this.restaurant = result.data
    })
  }



}
