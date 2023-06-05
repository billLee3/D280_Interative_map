import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WorldBankAPIService {

  constructor(private http:HttpClient) { }

  getCountryData(id: string): Observable<JSON>{
    var endpoint = "https://api.worldbank.org/v2/country/";
    var format = "?format=json"
    var apiUrl = endpoint + id + format;
    return this.http.get<JSON>(apiUrl);
  }
}
