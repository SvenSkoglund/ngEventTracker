import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReadEvent } from './models/read-event';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReadEventService {

  constructor(private http: HttpClient) { }

  private url = 'http://localhost:8080/api/read';
  private events = [];

  index() {
    // http://localhost:8080/api/users/1/todos
    return this.http.get<ReadEvent[]>(this.url).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('KABOOM');
      })
    );
  }
  create(event: ReadEvent) {
    return this.http.post<ReadEvent[]>(this.url, event)
    .pipe(
      catchError((err: any) => {
       console.log(err);
       return throwError('KABOOM');
     })
 );
  }
  updateReadEvent(event) {
    return this.http.put<ReadEvent[]>(this.url + '/' + event.id, event)
    .pipe(
      catchError((err: any) => {
       console.log(err);
       return throwError('KABOOM');
     })
 );
  }

  destroy(id: number) {
    return this.http.delete<ReadEvent[]>(this.url + '/' + id)
    .pipe(
      catchError((err: any) => {
       console.log(err);
       return throwError('KABOOM');
     })
 );
  }
}
