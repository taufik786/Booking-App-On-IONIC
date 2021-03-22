import { Injectable } from "@angular/core";
import { Booking } from "./booking.model";

@Injectable({ providedIn: 'root' })
export class BookingService {
  private _booking: Booking[]= [
    {
      id: 'xyz',
      placeId: 'p1',
      placeTitle: 'Taufik Developer',
      guestNumber: 2,
      userId: 'abc'
    }
  ];


  get bookings(){
    return [...this._booking];
  }
}
