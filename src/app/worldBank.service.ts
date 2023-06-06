import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WorldBankAPIService {

  constructor(private http:HttpClient) { }

  //one method that will trigger the API call when a country is selected and set a local variable that will receive the information about the country for display in the right column of the HTML page
  getCountryData(id: string): Observable<JSON>{
    var dataset = null; 
    var endpoint = "https://api.worldbank.org/v2/country/";
    var format = "?format=json"
    var apiUrl = endpoint + id + format;
    dataset = this.http.get<JSON>(apiUrl);
    return dataset;
  }
}
