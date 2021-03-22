import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Place } from './place.model';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private _places = new BehaviorSubject<Place[]>([
    new Place(
      'p1',
      'Im Taufik Alam',
      'patna bihar',
      'https://images.unsplash.com/photo-1616190866710-09c4b5e7c38f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
      150.5,
      new Date('2021-01-01'),
      new Date('2021-12-31'),
      'abc'
    ),
    new Place(
      'p2',
      'Im john',
      'from patna bihar',
      'https://images.unsplash.com/photo-1616199654192-b2ef145b7dea?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=658&q=80',
      15,
      new Date('2021-01-01'),
      new Date('2021-12-31'),
      'abc'
    ),
    new Place(
      'p3',
      'I m joker',
      'from India noida',
      'https://images.unsplash.com/photo-1615921851992-5f8707777ed8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80',
      155.44,
      new Date('2021-01-01'),
      new Date('2021-12-31'),
      'abc'
    ),
  ]);

  get places() {
    return this._places.asObservable();
  }

  constructor(private authService: AuthService) {}

  getPlace(id: string) {
    return this.places.pipe(
      take(1),
      map((places) => {
        return { ...places.find((p) => p.id === id) };
      })
    );
  }
  addPlace(
    title: string,
    description: string,
    price: number,
    dateFrom: Date,
    dateTo: Date
  ) {
    const newPlace = new Place(
      Math.random().toString(),
      title,
      description,
      'https://images.unsplash.com/photo-1616190866710-09c4b5e7c38f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
      price,
      dateFrom,
      dateTo,
      this.authService.userId()
    );
    return this.places.pipe(
      take(1),
      delay(1000),
      tap((places) => {
        this._places.next(places.concat(newPlace));
      })
    );
  }
  updatePlace(placeId: string, title: string, description: string){
    return this.places.pipe(take(1),
      delay(1000),
      tap(places => {
      const updatedPlaceIndex = places.findIndex(pl => pl.id === placeId);
      const updatedPlaces = [...places];
      const oldPlace = updatedPlaces[updatedPlaceIndex];
      updatedPlaces[updatedPlaceIndex] = new Place(
        oldPlace.id,
        title,
        description,
        oldPlace.imageUrl,
        oldPlace.price,
        oldPlace.availableFrom,
        oldPlace.availableTo,
        oldPlace.userId
      );
      this,this._places.next(updatedPlaces);
    }))
  }
}
