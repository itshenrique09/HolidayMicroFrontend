import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Holiday } from '../model/holiday';
import { HolidayPeriod } from '../model/holidayPeriod';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {

  holidayQUrl = "https://localhost:5011/api/Holiday";
  holidayCUrl = "https://localhost:5091/api/Holiday";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getHolidays(): Observable<Holiday[]> {
    return this.http.get<Holiday[]>(this.holidayQUrl)
      .pipe(
        catchError(this.handleError<Holiday[]>('getHolidays', []))
      );
  }

  getHolidaysInPeriod(id: number, startDate: string, endDate: string): Observable<HolidayPeriod[]> {
    const url = `${this.holidayQUrl}/periods/${id}?startDate=${startDate}&endDate=${endDate}`;
    return this.http.get<HolidayPeriod[]>(url)
      .pipe(
        catchError(this.handleError<HolidayPeriod[]>('getHolidayPeriodsInPeriod', []))
      );
  }

  getColaboratorsXDays(xDays: number){
    const url = `${this.holidayQUrl}/${xDays}/colabsComFeriasSuperioresAXDias`;
    return this.http.get<number[]>(url)
      .pipe(
        catchError(this.handleError<number[]>('getHolidayPeriodsInPeriod', []))
      );
  }

  addHoliday(holi: Holiday): Observable<Holiday> {
    return this.http.post<Holiday>(this.holidayCUrl, holi, this.httpOptions).pipe(
      catchError(this.handleError<Holiday>('addHoliday'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
